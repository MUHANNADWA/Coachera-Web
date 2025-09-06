// SectionCard.tsx
// Creates a default ARTICLE lesson on Add, then navigates to Manage for editing only.

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
import { useCreateMaterialMutation } from "../../api/materialApiSlice"; // ⬅️ ensure path

interface Props {
  section: Section;
  onChangeTitle: (name: string) => void;
  onRemove: () => void;
  onAddLesson: () => void; // kept for compatibility (not used here)
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
  const [createMaterial, { isLoading: isCreating }] =
    useCreateMaterialMutation();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderLessons(section, String(active.id), String(over.id));
    onReorderLessons(next);
  };

  // Add default ARTICLE on server, then navigate to manage page for editing
  const handleAdd = async () => {
    try {
      const orderIndex = section.materials?.length ?? 0;
      const payload = {
        title: "New Lesson",
        type: "ARTICLE" as const,
        article: "", // empty content
        orderIndex,
        sectionId: section.id,
      };

      const created = await createMaterial(payload).unwrap();
      // Extract created id according to your API shape
      const newMaterialId: number | string = created?.data?.id ?? created?.id;

      // Optionally update local UI immediately (if desired)
      // onUpdateLesson(orderIndex, { ...payload, id: newMaterialId } as Material);

      // Navigate to manage for EDIT only
      navigate(`/manage-lesson/${newMaterialId}`, {
        state: {
          sectionId: section.id,
          materialId: newMaterialId,
          orderIndex,
          initial: {
            id: newMaterialId,
            title: payload.title,
            type: "ARTICLE",
            article: "",
            videoUrl: null,
            quiz: null,
            orderIndex,
            sectionId: section.id,
          } as Partial<Material>,
        },
      });
    } catch (err) {
      console.error("[Create Material] failed:", err);
      alert("Failed to create lesson.");
    }
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
                      const numericId =
                        typeof lesson.id === "number" &&
                        Number.isFinite(lesson.id)
                          ? (lesson.id as number)
                          : undefined;

                      navigate(`/manage-lesson/${numericId ?? "new"}`, {
                        state: {
                          sectionId: section.id,
                          materialId: numericId, // undefined => create (legacy)
                          orderIndex: lIndex,
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
              onClick={handleAdd}
              variant="primary"
              className="items-center mt-2"
              type="button"
              disabled={isCreating}
            >
              <PlusCircleIcon className="w-6 mr-1" />
              {isCreating ? "Adding..." : "Add Lesson"}
            </Button>
          </>
        )}
      </div>
    </SortableItem>
  );
}
