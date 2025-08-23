// features/courses/builder/components/ModuleCard.tsx
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import Input from "../../../../shared/components/form/Input";
import { Button } from "../../../../shared/components/form/Button";
import SortableItem from "../dnd/SortableItem";
import SectionCard from "./SectionCard";
import { Lesson, Module, Section } from "../types";
import { reorderSections } from "../utils/reorder";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  module: Module;
  onChangeName: (name: string) => void;
  onRemove: () => void;
  onAddSection: () => void;
  onUpdateSection: (index: number, next: Section) => void;
  onRemoveSection: (index: number) => void;
  onReorderSections: (nextSections: Section[]) => void;
  onSectionReplaced?: (sectionId: string | number, next: Section) => void;
}

export default function ModuleCard({
  module,
  onChangeName,
  onRemove,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
  onReorderSections,
}: Props) {
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderSections(module, String(active.id), String(over.id));
    onReorderSections(next);
  };

  return (
    <SortableItem id={module.id}>
      <div className="consect p-4 mb-6 bg-gray-50 rounded-lg shadow">
        <div className="flex justify-between items-center mb-3">
          <Input
            type="text"
            value={module.name}
            onChange={(e) => onChangeName(e.target.value)}
            className="text-lg font-semibold border-b px-2 py-1 focus:outline-none w-full"
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
            items={module.sections.map((s) => String(s.id))}
            strategy={verticalListSortingStrategy}
          >
            {module.sections.map((section, sIndex) => (
              <SectionCard
                key={section.id}
                section={section}
                onChangeName={(name) =>
                  onUpdateSection(sIndex, { ...section, name })
                }
                onRemove={() => onRemoveSection(sIndex)}
                onAddLesson={() => {
                  const next: Lesson = {
                    id: `l_${Date.now()}`,
                    name: `Lesson ${section.lessons.length + 1}`,
                  };
                  const updated = [...module.sections];
                  updated[sIndex] = {
                    ...section,
                    lessons: [...section.lessons, next],
                  };
                  onUpdateSection(sIndex, updated[sIndex]);
                }}
                onUpdateLesson={(lIndex, nextLesson) => {
                  const updated = [...module.sections];
                  const lessons = [...updated[sIndex].lessons];
                  lessons[lIndex] = nextLesson;
                  updated[sIndex] = { ...updated[sIndex], lessons };
                  onUpdateSection(sIndex, updated[sIndex]);
                }}
                onRemoveLesson={(lIndex) => {
                  const updated = [...module.sections];
                  updated[sIndex] = {
                    ...updated[sIndex],
                    lessons: updated[sIndex].lessons.filter(
                      (_, i) => i !== lIndex
                    ),
                  };
                  onUpdateSection(sIndex, updated[sIndex]);
                }}
                onReorderLessons={(nextLessons) => {
                  const updated = [...module.sections];
                  updated[sIndex] = { ...section, lessons: nextLessons };
                  onUpdateSection(sIndex, updated[sIndex]);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          onClick={onAddSection}
          className="items-center mt-2"
          variant="secondary"
        >
          <PlusCircleIcon className="w-6 mr-1" /> Add Section
        </Button>
      </div>
    </SortableItem>
  );
}
