// features/courses/builder/utils/reorder.ts
import { arrayMove } from "@dnd-kit/sortable";
import { Material, Module, Section } from "../../../../shared/types/types";

export function reorderModules(
  list: Module[],
  activeId: string,
  overId: string
) {
  const oldIndex = list.findIndex((m) => String(m.id) === String(activeId));
  const newIndex = list.findIndex((m) => String(m.id) === String(overId));
  if (oldIndex < 0 || newIndex < 0) return list;
  return arrayMove(list, oldIndex, newIndex);
}

export function reorderSections(
  module: Module,
  activeId: string,
  overId: string
): Section[] {
  const oldIndex = module.sections.findIndex(
    (s) => String(s.id) === String(activeId)
  );
  const newIndex = module.sections.findIndex(
    (s) => String(s.id) === String(overId)
  );
  if (oldIndex < 0 || newIndex < 0) return module.sections;
  return arrayMove(module.sections, oldIndex, newIndex);
}

export function reorderLessons(
  section: Section,
  activeId: string,
  overId: string
): Material[] {
  const oldIndex = section.materials.findIndex(
    (l) => String(l.id) === String(activeId)
  );
  const newIndex = section.materials.findIndex(
    (l) => String(l.id) === String(overId)
  );
  if (oldIndex < 0 || newIndex < 0) return section.materials;
  return arrayMove(section.materials, oldIndex, newIndex);
}
