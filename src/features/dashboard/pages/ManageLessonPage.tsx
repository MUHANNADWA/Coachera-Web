import { useState } from "react";
import { Button } from "../../../shared/components/form/Button";
import QuizSection from "./QuizSection";

export type LessonType = "video" | "article" | "quiz";

const ManageLessonPage = () => {
  const [lessonType, setLessonType] = useState<LessonType>("video");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  const handleSave = () => {
    const payload =
      lessonType === "quiz"
        ? { title, type: lessonType, quizQuestions }
        : { title, type: lessonType, content };
    console.log(payload);
    alert("Lesson saved! Check console for payload.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Lesson</h1>

      {/* Lesson Title */}
      <div>
        <label className="block font-medium mb-1">Lesson Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                : "bg-gray-100 dark:bg-dark border-b border-gray-300"
            }`}
            onClick={() => setLessonType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {lessonType === "video" && (
        <div>
          <label className="block font-medium mb-1">Video URL</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          />
          {content && (
            <video
              src={content}
              controls
              className="w-full rounded-lg border border-gray-300"
            />
          )}
        </div>
      )}

      {lessonType === "article" && (
        <div>
          <label className="block font-medium mb-1">Article Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-primary"
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

      <Button onClick={handleSave} className="mt-4" variant="primary">
        Save Lesson
      </Button>
    </div>
  );
};

export default ManageLessonPage;
