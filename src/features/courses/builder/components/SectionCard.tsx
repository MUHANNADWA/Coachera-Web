import {
  PlusCircleIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
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
import { useState } from "react";

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
  const [collapsed, setCollapsed] = useState(false);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderLessons(section, String(active.id), String(over.id));
    onReorderLessons(next);
  };

  return (
    <SortableItem id={section.id}>
      <div className="consect ml-6 p-3 mb-3 rounded-2xl border-2 dark:border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Button
            type="button"
            variant="secondary"
            className="p-2! rounded-2xl"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronUpIcon className="w-5 h-5" />
            )}
          </Button>

          <div className="flex-1 flex items-center gap-2">
            <Bars3BottomLeftIcon className="w-5 h-5 text-primary" />
            <Input
              type="text"
              value={section.name}
              onChange={(e) => onChangeName(e.target.value)}
              className="font-medium border-b px-2 py-1 focus:outline-none w-full"
              placeholder="Section title"
              prefixIcon={Bars3BottomLeftIcon}
            />
          </div>

          <Button
            onClick={onRemove}
            className="text-danger hover:text-danger/70"
            type="button"
          >
            <TrashIcon className="w-6 h-6" />
          </Button>
        </div>

        {!collapsed && (
          <>
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
                      /* navigate to lesson editor if needed */
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
              type="button"
            >
              <PlusCircleIcon className="w-6 mr-1" />
              Add Lesson
            </Button>
          </>
        )}
      </div>
    </SortableItem>
  );
}
