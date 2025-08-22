import { useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../shared/components/form/Button";
import SortableQuestion from "./SortableQuestion";
import {
  useGetQuizzesQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useVerifyQuizMutation,
} from "../slices/QuizApiSlice"; // adjust path if needed

interface QuizSectionProps {
  quizQuestions: any[];
  setQuizQuestions: (questions: any[]) => void;
}

export default function QuizSection({
  quizQuestions,
  setQuizQuestions,
}: QuizSectionProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  // 🔹 API hooks
  const { data: quizzes, isLoading } = useGetQuizzesQuery();
  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();
  const [verifyQuiz] = useVerifyQuizMutation();

  // 🔹 Prefill state when quizzes load
  useEffect(() => {
    if (quizzes && quizzes.length > 0) {
      // load first quiz’s questions into UI (example)
      setQuizQuestions(
        quizzes[0].questions.map((q: any, i: number) => ({
          id: `q${q.id}`,
          question: q.content,
          options: [
            { id: `o${i}1`, text: q.answer1 },
            { id: `o${i}2`, text: q.answer2 },
            { id: `o${i}3`, text: q.answer3 },
            { id: `o${i}4`, text: q.answer4 },
          ],
          answer: 0, // backend doesn’t provide correct index here
        }))
      );
    }
  }, [quizzes, setQuizQuestions]);

  // 🔹 Local add question
  const addQuizQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        id: `q${Date.now()}`,
        question: "",
        options: [
          { id: `o${Date.now()}`, text: "" },
          { id: `o${Date.now() + 1}`, text: "" },
        ],
        answer: 0,
      },
    ]);
  };

  // 🔹 Drag reordering
  const handleQuestionDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = quizQuestions.findIndex((q) => q.id === active.id);
      const newIndex = quizQuestions.findIndex((q) => q.id === over.id);
      setQuizQuestions(arrayMove(quizQuestions, oldIndex, newIndex));
    }
  };

  // 🔹 Submit to backend
  const saveQuiz = async () => {
    const payload = {
      questions: quizQuestions.map((q) => ({
        content: q.question,
        answer1: q.options[0]?.text || "",
        answer2: q.options[1]?.text || "",
        answer3: q.options[2]?.text || "",
        answer4: q.options[3]?.text || "",
      })),
    };
    try {
      await createQuiz(payload).unwrap();
      alert("Quiz saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving quiz.");
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading quizzes...</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleQuestionDragEnd}
        >
          <SortableContext
            items={quizQuestions.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            {quizQuestions.map((q, qIndex) => (
              <SortableQuestion
                key={q.id}
                qIndex={qIndex}
                question={q}
                setQuizQuestions={setQuizQuestions}
              />
            ))}
          </SortableContext>
          <div className="flex gap-2 mt-2">
            <Button
              onClick={addQuizQuestion}
              variant="secondary"
              className="flex items-center"
            >
              <PlusCircleIcon className="w-5 mr-1" /> Add Question
            </Button>
            <Button
              onClick={saveQuiz}
              disabled={isCreating}
              className="flex items-center"
            >
              {isCreating ? "Saving..." : "Save Quiz"}
            </Button>
          </div>
        </DndContext>
      )}
    </div>
  );
}
