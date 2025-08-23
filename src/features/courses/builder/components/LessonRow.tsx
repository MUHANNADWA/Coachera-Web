// features/courses/builder/components/LessonRow.tsx
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Input from "../../../../shared/components/form/Input";
import { Button } from "../../../../shared/components/form/Button";
import SortableItem from "../dnd/SortableItem";
import { Lesson } from "../types";

interface Props {
  lesson: Lesson;
  onChangeName: (name: string) => void;
  onEdit: () => void;
  onRemove: () => void;
}

export default function LessonRow({
  lesson,
  onChangeName,
  onEdit,
  onRemove,
}: Props) {
  return (
    <SortableItem id={lesson.id} className="ml-6 flex items-center mb-2">
      <Input
        type="text"
        value={lesson.name}
        onChange={(e) => onChangeName(e.target.value)}
        className="border-b px-2 py-1 focus:outline-none w-full"
      />
      <Button
        onClick={onEdit}
        className="ml-3 text-secondary hover:text-secondary/50"
      >
        <PencilSquareIcon className="w-6" />
      </Button>
      <Button
        onClick={onRemove}
        className="ml-3 text-danger hover:text-danger/50"
      >
        <TrashIcon className="w-6" />
      </Button>
    </SortableItem>
  );
}
