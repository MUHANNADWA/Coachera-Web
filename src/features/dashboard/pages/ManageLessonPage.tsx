import { useState } from "react";
import { Button } from "../../../shared/components/form/Button";
import QuizSection from "./QuizSection";
import Input from "../../../shared/components/form/Input";
import Textarea from "../../../shared/components/form/Textarea";
import {
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from "../slices/MaterialApiSlice.tsx"; // <-- import hooks

export type LessonType = "video" | "article" | "quiz";

interface ManageLessonPageProps {
  sectionId: string;     // passed from route or parent
  materialId?: string;   // optional for edit mode
}

const ManageLessonPage = ({ sectionId, materialId }: ManageLessonPageProps) => {
  const [lessonType, setLessonType] = useState<LessonType>("video");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  // RTK Query mutations
  const [createMaterial, { isLoading: isCreating }] =
    useCreateMaterialMutation();
  const [updateMaterial, { isLoading: isUpdating }] =
    useUpdateMaterialMutation();

  const handleSave = async () => {
    try {
      const payload =
        lessonType === "quiz"
          ? {
              title,
              orderIndex: 1,
              type: "QUIZ",
              quiz: { questions: quizQuestions },
            }
          : lessonType === "video"
          ? {
              title,
              orderIndex: 1,
              type: "VIDEO",
              videoUrl: content,
            }
          : {
              title,
              orderIndex: 1,
              type: "ARTICLE",
              article: content,
            };

      if (materialId) {
        // update
        await updateMaterial({ sectionId, materialId, data: payload }).unwrap();
        alert("Lesson updated!");
      } else {
        // create
        await createMaterial({data: payload }).unwrap();
        alert("Lesson created!");
      }
    } catch (err: any) {
      console.error("Failed to save lesson:", err);
      alert("Error saving lesson.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Lesson</h1>

      {/* Lesson Title */}
      <div>
        <label className="block font-medium mb-1">Lesson Title</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lesson title"
        />
      </div>

      {/* Type Tabs */}
      <div className="flex space-x-2 border-b mb-4">
        {(["video", "article", "quiz"] as LessonType[]).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 font-medium rounded-t-lg ${
              lessonType === type
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-dark border-b border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => setLessonType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Fields */}
      {lessonType === "video" && (
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

      {lessonType === "article" && (
        <div>
          <label className="block font-medium mb-1">Article Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article..."
            className="h-40"
          />
          {content && (
            <div className="mt-2 p-4 border rounded bg-gray-50 dark:bg-dark">
              {content}
            </div>
          )}
        </div>
      )}

      {lessonType === "quiz" && (
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
        {materialId ? (isUpdating ? "Updating..." : "Update Lesson") : isCreating ? "Saving..." : "Save Lesson"}
      </Button>
    </div>
  );
};

export default ManageLessonPage;
