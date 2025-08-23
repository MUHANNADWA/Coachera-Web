// features/courses/builder/components/SectionCard.tsx
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import Input from "../../../../shared/components/form/Input";
import { Button } from "../../../../shared/components/form/Button";
import SortableItem from "../dnd/SortableItem";
import LessonRow from "./LessonRow";
import { Lesson, Section } from "../types";
import { reorderLessons } from "../utils/reorder";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  section: Section;
  onChangeName: (name: string) => void;
  onRemove: () => void;
  onAddLesson: () => void;
  onUpdateLesson: (index: number, next: Lesson) => void;
  onRemoveLesson: (index: number) => void;
  onReorderLessons: (nextLessons: Lesson[]) => void;
}

export default function SectionCard({
  section,
  onChangeName,
  onRemove,
  onAddLesson,
  onUpdateLesson,
  onRemoveLesson,
  onReorderLessons,
}: Props) {
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderLessons(section, String(active.id), String(over.id));
    onReorderLessons(next);
  };

  return (
    <SortableItem id={section.id}>
      <div className="consect ml-6 p-3 mb-3 bg-white rounded border">
        <div className="flex justify-between items-center mb-2">
          <Input
            type="text"
            value={section.name}
            onChange={(e) => onChangeName(e.target.value)}
            className="font-medium border-b px-2 py-1 focus:outline-none w-full"
          />
          <Button
            onClick={onRemove}
            className="ml-3 text-danger hover:text-danger/50"
          >
            <TrashIcon className="w-6" />
          </Button>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={section.lessons.map((l) => String(l.id))}
            strategy={verticalListSortingStrategy}
          >
            {section.lessons.map((lesson, lIndex) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                onChangeName={(name) =>
                  onUpdateLesson(lIndex, { ...lesson, name })
                }
                onEdit={() => {
                  // Navigate from parent if needed; expose callback if required.
                }}
                onRemove={() => onRemoveLesson(lIndex)}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          onClick={onAddLesson}
          variant="primary"
          className="items-center mt-2"
        >
          <PlusCircleIcon className="w-6 mr-1" /> Add Lesson
        </Button>
      </div>
    </SortableItem>
  );
}
