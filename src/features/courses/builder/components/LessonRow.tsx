import {
  PencilSquareIcon,
  TrashIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Input from "../../../../shared/components/form/Input";
import { Button } from "../../../../shared/components/form/Button";
import SortableItem from "../dnd/SortableItem";
import { Material } from "../../../../shared/types/types";

interface Props {
  material: Material;
  onChangeTitle: (name: string) => void;
  onEdit: () => void;
  onRemove: () => void;
}

export default function LessonRow({
  material,
  onChangeTitle,
  onEdit,
  onRemove,
}: Props) {
  return (
    <SortableItem id={material.id} className="ml-6 flex items-center mb-2">
      <Input
        type="text"
        value={material.title}
        onChange={(e) => onChangeTitle(e.target.value)}
        className="border-b px-2 py-1 focus:outline-none w-full"
        placeholder="Lesson title"
        prefixIcon={BookOpenIcon}
      />
      <Button
        onClick={onEdit}
        className="ml-3 text-secondary hover:text-secondary/70"
        type="button"
      >
        <PencilSquareIcon className="w-6 h-6" />
      </Button>
      <Button
        onClick={onRemove}
        className="ml-3 text-danger hover:text-danger/70"
        type="button"
      >
        <TrashIcon className="w-6 h-6" />
      </Button>
    </SortableItem>
  );
}
