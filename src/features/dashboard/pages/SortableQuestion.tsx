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
  setQuizQuestions: (questions: QuizQuestion[]) => void;
}

export default function SortableQuestion({
  question,
  qIndex,
  setQuizQuestions,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const updateQuestionField = (field: keyof QuizQuestion, value: any) => {
    const updated = [...JSON.parse(JSON.stringify(setQuizQuestions))];
    updated[qIndex][field] = value;
    setQuizQuestions(updated);
  };

  const addOption = () => {
    if (question.options.length >= 4) return;
    const updated = [...JSON.parse(JSON.stringify(setQuizQuestions))];
    updated[qIndex].options.push({ id: `o${Date.now()}`, text: "" });
    setQuizQuestions(updated);
  };

  const removeOption = (oIndex: number) => {
    if (question.options.length <= 2) return;
    const updated = [...JSON.parse(JSON.stringify(setQuizQuestions))];
    updated[qIndex].options.splice(oIndex, 1);
    setQuizQuestions(updated);
  };

  const handleOptionDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const updated = [...JSON.parse(JSON.stringify(setQuizQuestions))];
      const oldIndex = updated[qIndex].options.findIndex(
        (o) => o.id === active.id
      );
      const newIndex = updated[qIndex].options.findIndex(
        (o) => o.id === over.id
      );
      updated[qIndex].options = arrayMove(
        updated[qIndex].options,
        oldIndex,
        newIndex
      );
      setQuizQuestions(updated);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

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
          onClick={() => {
            const updated = [...JSON.parse(JSON.stringify(setQuizQuestions))];
            updated.splice(qIndex, 1);
            setQuizQuestions(updated);
          }}
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
                onChange={(e) => {
                  const updated = [
                    ...JSON.parse(JSON.stringify(setQuizQuestions)),
                  ];
                  updated[qIndex].options[oIndex].text = e.target.value;
                  setQuizQuestions(updated);
                }}
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
