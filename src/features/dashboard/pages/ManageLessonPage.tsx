import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../../shared/components/form/Button";
import QuizSection from "./QuizSection";
import Input from "../../../shared/components/form/Input";
import {
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from "../../courses/api/materialApiSlice";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { Material, MaterialType } from "../../../shared/types/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function surroundSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string = ""
) {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.slice(selectionStart, selectionEnd) || "text";
  const next =
    value.slice(0, selectionStart) +
    before +
    selected +
    after +
    value.slice(selectionEnd);
  const caret = selectionStart + before.length + selected.length + after.length;
  return { next, caret };
}

function insertAtLineStart(textarea: HTMLTextAreaElement, prefix: string) {
  const { selectionStart, selectionEnd, value } = textarea;
  const startOfLine = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const next = value.slice(0, startOfLine) + prefix + value.slice(startOfLine);
  const caret = selectionEnd + prefix.length;
  return { next, caret };
}

function insertSnippet(textarea: HTMLTextAreaElement, snippet: string) {
  const { selectionStart, selectionEnd, value } = textarea;
  const next =
    value.slice(0, selectionStart) + snippet + value.slice(selectionEnd);
  const caret = selectionStart + snippet.length;
  return { next, caret };
}

/** Enum helpers */
const MATERIAL_TYPES: MaterialType[] = ["VIDEO", "ARTICLE", "QUIZ"];

const typeLabel = (t: MaterialType) =>
  t === "VIDEO" ? "Video" : t === "ARTICLE" ? "Article" : "Quiz";

export default function ManageLessonPage() {
  const { location, navigate } = useAppHook();

  const sectionId = location?.state?.sectionId as number | string | undefined;
  const materialId = location?.state?.materialId as number | string | undefined;
  const initial: Material | undefined = location?.state?.initial;
  const orderIndexFromState: number | undefined = location?.state?.orderIndex;

  const [lessonType, setLessonType] = useState<MaterialType>("ARTICLE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [showCheatsheet, setShowCheatsheet] = useState(true);
  const mdRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title ?? "");
    if (initial.type === "VIDEO") {
      setLessonType("VIDEO");
      setContent(initial.videoUrl ?? "");
    } else if (initial.type === "ARTICLE") {
      setLessonType("ARTICLE");
      setContent(initial.article ?? "");
    } else if (initial.type === "QUIZ") {
      setLessonType("QUIZ");
      setQuizQuestions(initial.quiz?.questions ?? []);
    }
  }, [initial]);

  const [createMaterial, { isLoading: isCreating }] =
    useCreateMaterialMutation();
  const [updateMaterial, { isLoading: isUpdating }] =
    useUpdateMaterialMutation();

  const payload = useMemo(() => {
    const base: any = {
      title,
      orderIndex: Number.isFinite(orderIndexFromState)
        ? orderIndexFromState
        : 0,
      sectionId: sectionId,
      type: lessonType,
    };
    if (lessonType === "QUIZ") base.quiz = { questions: quizQuestions };
    else if (lessonType === "VIDEO") base.videoUrl = content;
    else base.article = content; // markdown
    return base;
  }, [
    title,
    lessonType,
    content,
    quizQuestions,
    orderIndexFromState,
    sectionId,
  ]);

  const handleSave = async () => {
    try {
      if (materialId) {
        await updateMaterial({
          sectionId,
          materialId,
          data: { ...payload },
        }).unwrap();
        alert("Lesson updated!");
      } else {
        console.log("Trying to CREATE Material", payload);

        await createMaterial(payload).unwrap();
        alert("Lesson created!");
      }
      navigate(-1);
    } catch (err) {
      console.error("Failed to save lesson:", err);
      alert("Error saving lesson.");
    }
  };

  const doAction = (kind: string) => {
    const ta = mdRef.current;
    if (!ta) return;
    let res: { next: string; caret: number } | null = null;

    switch (kind) {
      case "bold":
        res = surroundSelection(ta, "**", "**");
        break;
      case "italic":
        res = surroundSelection(ta, "_", "_");
        break;
      case "h1":
        res = insertAtLineStart(ta, "# ");
        break;
      case "h2":
        res = insertAtLineStart(ta, "## ");
        break;
      case "h3":
        res = insertAtLineStart(ta, "### ");
        break;
      case "link":
        res = surroundSelection(ta, "[", "](https://example.com)");
        break;
      case "image":
        res = insertSnippet(
          ta,
          "![alt](https://via.placeholder.com/800x400)\n"
        );
        break;
      case "inline-code":
        res = surroundSelection(ta, "`", "`");
        break;
      case "codeblock":
        res = insertSnippet(ta, "```ts\n// code here\n```\n");
        break;
      case "quote":
        res = insertAtLineStart(ta, "> ");
        break;
      case "ul":
        res = insertAtLineStart(ta, "- ");
        break;
      case "ol":
        res = insertAtLineStart(ta, "1. ");
        break;
      case "task":
        res = insertAtLineStart(ta, "- [ ] ");
        break;
      case "table":
        res = insertSnippet(
          ta,
          `| Feature | Support |\n|--------|:------:|\n| GFM    |   ✅   |\n| Tables |   ✅   |\n\n`
        );
        break;
      case "hr":
        res = insertSnippet(ta, `\n---\n\n`);
        break;
      default:
        break;
    }

    if (res) {
      setContent(res.next);
      requestAnimationFrame(() => {
        if (!mdRef.current) return;
        mdRef.current.selectionStart = mdRef.current.selectionEnd = res!.caret;
        mdRef.current.focus();
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {materialId ? "Edit Lesson" : "Create Lesson"}
      </h1>

      <div>
        <label className="block font-medium mb-1">Lesson Title</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lesson title"
        />
      </div>

      <div className="flex gap-2 border-b mb-4">
        {MATERIAL_TYPES.map((type: MaterialType) => (
          <button
            key={type}
            className={`px-4 py-2 font-medium rounded-t-lg ${
              lessonType === type
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-dark border-b border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => setLessonType(type)}
          >
            {typeLabel(type)}
          </button>
        ))}
      </div>

      {lessonType === "VIDEO" && (
        <div>
          <label className="block font-medium mb-1">Video URL</label>
          <Input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter video URL"
          />
          {content && (
            <video
              src={content}
              controls
              className="w-full mt-2 rounded-lg border border-gray-300 dark:border-gray-700"
            />
          )}
        </div>
      )}

      {lessonType === "ARTICLE" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 p-2 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b0f19]">
            <span className="text-xs opacity-60 self-center pr-2">
              Markdown
            </span>
            <Button type="button" onClick={() => doAction("h1")}>
              H1
            </Button>
            <Button type="button" onClick={() => doAction("h2")}>
              H2
            </Button>
            <Button type="button" onClick={() => doAction("h3")}>
              H3
            </Button>
            <Button type="button" onClick={() => doAction("bold")}>
              Bold
            </Button>
            <Button type="button" onClick={() => doAction("italic")}>
              Italic
            </Button>
            <Button type="button" onClick={() => doAction("inline-code")}>
              Code
            </Button>
            <Button type="button" onClick={() => doAction("codeblock")}>
              Code Block
            </Button>
            <Button type="button" onClick={() => doAction("link")}>
              Link
            </Button>
            <Button type="button" onClick={() => doAction("image")}>
              Image
            </Button>
            <Button type="button" onClick={() => doAction("quote")}>
              Quote
            </Button>
            <Button type="button" onClick={() => doAction("ul")}>
              List
            </Button>
            <Button type="button" onClick={() => doAction("ol")}>
              Numbered
            </Button>
            <Button type="button" onClick={() => doAction("task")}>
              Task
            </Button>
            <Button type="button" onClick={() => doAction("table")}>
              Table
            </Button>
            <Button type="button" onClick={() => doAction("hr")}>
              Rule
            </Button>
            <div className="ml-auto">
              <Button
                type="button"
                onClick={() => setShowCheatsheet((v) => !v)}
              >
                {showCheatsheet ? "Hide Cheatsheet" : "Show Cheatsheet"}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Markdown Content</label>
              <textarea
                ref={mdRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your markdown..."
                className="w-full h-64 font-mono text-sm rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b0f19] p-3 outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>GitHub Flavored Markdown (GFM)</span>
                <span>{content.length} chars</span>
              </div>

              {showCheatsheet && (
                <div className="mt-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 p-4 text-sm">
                  <div className="font-semibold mb-2 opacity-80">
                    Markdown Cheatsheet
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <li>
                      <code># H1</code>, <code>## H2</code>, <code>### H3</code>
                    </li>
                    <li>
                      <code>**bold**</code>, <code>_italic_</code>,{" "}
                      <code>~~strike~~</code>
                    </li>
                    <li>
                      <code>[text](https://example.com)</code>
                    </li>
                    <li>
                      <code>![alt](https://...)</code>
                    </li>
                    <li>
                      <code>`inline`</code> / <code>```lang\ncode\n```</code>
                    </li>
                    <li>
                      <code>- item</code> / <code>1. item</code> /{" "}
                      <code>- [ ] task</code>
                    </li>
                    <li>
                      <code>&gt; quote</code>
                    </li>
                    <li>
                      Table:
                      <br />
                      <code>| Col | Col |</code>
                      <br />
                      <code>|-----|:---:|</code>
                      <br />
                      <code>| A | B |</code>
                    </li>
                    <li>
                      <code>---</code> (horizontal rule)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <div className="text-sm font-semibold mb-2 opacity-70">
                Preview
              </div>
              <article className="prose dark:prose-invert max-w-none rounded-xl border-2 border-gray-200 dark:border-white/10 p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || "_Nothing to preview yet..._"}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      )}

      {lessonType === "QUIZ" && (
        <QuizSection
          quizQuestions={quizQuestions}
          setQuizQuestions={setQuizQuestions}
        />
      )}

      <Button
        onClick={handleSave}
        className="mt-4"
        variant="primary"
        disabled={isCreating || isUpdating}
      >
        {materialId
          ? isUpdating
            ? "Updating..."
            : "Update Lesson"
          : isCreating
          ? "Saving..."
          : "Save Lesson"}
      </Button>
    </div>
  );
}
