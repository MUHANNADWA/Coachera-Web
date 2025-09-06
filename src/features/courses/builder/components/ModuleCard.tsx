import {
  PlusCircleIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import Input from "../../../../shared/components/form/Input";
import { Button } from "../../../../shared/components/form/Button";
import SectionCard from "./SectionCard";
import { reorderSections } from "../utils/reorder";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Material, Module, Section } from "../../../../shared/types/types";
import { useDeleteMaterialMutation } from "../../api/materialApiSlice";

interface Props {
  module: Module;
  onChangeTitle: (title: string) => void;
  onRemove: () => void;
  onAddSection: () => void;
  onUpdateSection: (index: number, next: Section) => void;
  onRemoveSection: (index: number) => void;
  onReorderSections: (nextSections: Section[]) => void;
}

export default function ModuleCard({
  module,
  onChangeTitle,
  onRemove,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
  onReorderSections,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const [deleteMaterial] = useDeleteMaterialMutation();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderSections(module, String(active.id), String(over.id));
    onReorderSections(next);
  };

  return (
    <div className="consect p-4 mb-5 rounded-2xl border-2 dark:border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <Button
          type="button"
          variant="secondary"
          className="p-2! rounded-2xl"
          onClick={() => setCollapsed((v) => !v)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand module" : "Collapse module"}
        >
          {collapsed ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronUpIcon className="w-5 h-5" />
          )}
        </Button>

        <div className="flex-1 flex items-center gap-2">
          <RectangleStackIcon className="w-5 h-5 text-primary" />
          <Input
            type="text"
            value={module.title}
            onChange={(e) => onChangeTitle(e.target.value)}
            className="text-lg font-semibold border-b px-2 py-1 focus:outline-none w-full"
            placeholder="Module title"
            prefixIcon={RectangleStackIcon}
          />
        </div>

        <Button
          onClick={onRemove}
          className="ml-3 text-danger hover:text-danger/70"
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
              items={module.sections.map((s) => String(s.id))}
              strategy={verticalListSortingStrategy}
            >
              {module.sections.map((section, sIndex) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onChangeTitle={(title) =>
                    onUpdateSection(sIndex, { ...section, title })
                  }
                  onRemove={() => onRemoveSection(sIndex)}
                  onAddLesson={() => {
                    const next: Material = {
                      id: `new_${Date.now()}`, // temporary local id; treated as new
                      title: `Lesson ${section.materials.length + 1}`,
                      type: "ARTICLE",
                    };
                    const updated = {
                      ...section,
                      materials: [...section.materials, next],
                    };
                    onUpdateSection(sIndex, updated);
                  }}
                  onUpdateLesson={(lIndex, nextLesson) => {
                    const materials = [...section.materials];
                    materials[lIndex] = nextLesson;
                    onUpdateSection(sIndex, { ...section, materials });
                  }}
                  onRemoveLesson={(lIndex) => {
                    const materials = section.materials.filter(
                      (_, i) => i !== lIndex
                    );
                    deleteMaterial(lIndex);
                    onUpdateSection(sIndex, { ...section, materials });
                  }}
                  onReorderLessons={(nextLessons) =>
                    onUpdateSection(sIndex, {
                      ...section,
                      materials: nextLessons,
                    })
                  }
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            onClick={onAddSection}
            className="items-center mt-2"
            variant="secondary"
            type="button"
          >
            <PlusCircleIcon className="w-6 mr-1" />
            Add Section
          </Button>
        </>
      )}
    </div>
  );
}
