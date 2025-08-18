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

interface QuizSectionProps {
  quizQuestions: any[];
  setQuizQuestions: (questions: any[]) => void;
}

export default function QuizSection({
  quizQuestions,
  setQuizQuestions,
}: QuizSectionProps) {
  const sensors = useSensors(useSensor(PointerSensor));

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

  const handleQuestionDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = quizQuestions.findIndex((q) => q.id === active.id);
      const newIndex = quizQuestions.findIndex((q) => q.id === over.id);
      setQuizQuestions(arrayMove(quizQuestions, oldIndex, newIndex));
    }
  };

  return (
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
      <Button
        onClick={addQuizQuestion}
        variant="secondary"
        className="flex items-center mt-2"
      >
        <PlusCircleIcon className="w-5 mr-1" /> Add Question
      </Button>
    </DndContext>
  );
}
