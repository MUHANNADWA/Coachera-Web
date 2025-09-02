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
import { reorderLessons } from "../utils/reorder";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Material, Section } from "../../../../shared/types/types";
import { useAppHook } from "../../../../shared/hooks/useAppHook";

interface Props {
  section: Section;
  onChangeTitle: (name: string) => void;
  onRemove: () => void;
  onAddLesson: () => void;
  onUpdateLesson: (index: number, next: Material) => void;
  onRemoveLesson: (index: number) => void;
  onReorderLessons: (nextLessons: Material[]) => void;
}

export default function SectionCard({
  section,
  onChangeTitle,
  onRemove,
  onAddLesson,
  onUpdateLesson,
  onRemoveLesson,
  onReorderLessons,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { navigate } = useAppHook();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    // keep using helper that returns the next materials array
    const next = reorderLessons(section, String(active.id), String(over.id));
    onReorderLessons(next);
  };

  return (
    <SortableItem id={String(section.id)}>
      <div className="consect ml-6 p-3 mb-3 rounded-2xl border-2 dark:border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Button
            type="button"
            variant="secondary"
            className="p-2 rounded-2xl"
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
              value={section.title}
              onChange={(e) => onChangeTitle(e.target.value)}
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
                items={section.materials.map((l) => String(l.id))}
                strategy={verticalListSortingStrategy}
              >
                {section.materials.map((lesson, lIndex) => (
                  <LessonRow
                    key={lesson.id}
                    material={lesson}
                    onChangeTitle={(title) =>
                      onUpdateLesson(lIndex, { ...lesson, title })
                    }
                    onEdit={() => {
                      // pass identifiers (and optionally initial data) via location.state
                      navigate(`/manage-lesson/${lesson.id}`, {
                        state: {
                          sectionId: section.id,
                          materialId: lesson.id,
                          initial: lesson,
                        },
                      });
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
