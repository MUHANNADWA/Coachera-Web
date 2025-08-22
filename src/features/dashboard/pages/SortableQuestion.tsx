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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../../shared/components/form/Button";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Input from "../../../shared/components/form/Input";

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  answer: number;
}

interface Props {
  question: QuizQuestion;
  qIndex: number;
  setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

export default function SortableQuestion({
  question,
  qIndex,
  setQuizQuestions,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const sensors = useSensors(useSensor(PointerSensor));

  // 🔹 Update a question field
  const updateQuestionField = (field: keyof QuizQuestion, value: any) => {
    setQuizQuestions((prev) => {
      const updated = [...prev];
      updated[qIndex] = { ...updated[qIndex], [field]: value };
      return updated;
    });
  };

  // 🔹 Add new option
  const addOption = () => {
    if (question.options.length >= 4) return;
    setQuizQuestions((prev) => {
      const updated = [...prev];
      const newOptions = [
        ...updated[qIndex].options,
        { id: `o${Date.now()}`, text: "" },
      ];
      updated[qIndex] = { ...updated[qIndex], options: newOptions };
      return updated;
    });
  };

  // 🔹 Remove option
  const removeOption = (oIndex: number) => {
    if (question.options.length <= 2) return;
    setQuizQuestions((prev) => {
      const updated = [...prev];
      const newOptions = [...updated[qIndex].options];
      newOptions.splice(oIndex, 1);
      updated[qIndex] = { ...updated[qIndex], options: newOptions };
      return updated;
    });
  };

  // 🔹 Drag reordering options
  const handleOptionDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setQuizQuestions((prev) => {
      const updated = [...prev];
      const oldIndex = updated[qIndex].options.findIndex((o) => o.id === active.id);
      const newIndex = updated[qIndex].options.findIndex((o) => o.id === over.id);
      const reordered = arrayMove(updated[qIndex].options, oldIndex, newIndex);
      updated[qIndex] = { ...updated[qIndex], options: reordered };
      return updated;
    });
  };

  // 🔹 Delete entire question
  const removeQuestion = () => {
    setQuizQuestions((prev) => {
      const updated = [...prev];
      updated.splice(qIndex, 1);
      return updated;
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border rounded-lg bg-white dark:bg-dark space-y-2 mb-3"
    >
      <div className="flex justify-between items-center">
        <label className="font-medium">Question {qIndex + 1}</label>
        <Button
          onClick={removeQuestion}
          className="text-danger hover:text-danger/50"
          variant="secondary"
        >
          <TrashIcon className="w-5" />
        </Button>
      </div>

      <Input
        type="text"
        value={question.question}
        onChange={(e) => updateQuestionField("question", e.target.value)}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleOptionDragEnd}
      >
        <SortableContext
          items={question.options.map((o) => o.id)}
          strategy={verticalListSortingStrategy}
        >
          {question.options.map((opt, oIndex) => (
            <div key={opt.id} className="flex items-center space-x-2 mb-1">
              <Input
                type="text"
                value={opt.text}
                onChange={(e) =>
                  setQuizQuestions((prev) => {
                    const updated = [...prev];
                    const newOptions = [...updated[qIndex].options];
                    newOptions[oIndex] = { ...newOptions[oIndex], text: e.target.value };
                    updated[qIndex] = { ...updated[qIndex], options: newOptions };
                    return updated;
                  })
                }
              />
              <Button
                onClick={() => removeOption(oIndex)}
                className="text-danger hover:text-danger/50"
                variant="secondary"
              >
                <TrashIcon className="w-5" />
              </Button>
            </div>
          ))}
        </SortableContext>
      </DndContext>

      <Button
        onClick={addOption}
        variant="primary"
        className="mt-1 flex items-center"
        disabled={question.options.length >= 4}
      >
        <PlusCircleIcon className="w-5 mr-1" /> Add Option
      </Button>
    </div>
  );
}
