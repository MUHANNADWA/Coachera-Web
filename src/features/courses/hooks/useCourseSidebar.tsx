import { useEffect, useRef, useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { toggleCourseSidebar } from "../courseSidebarSlice";
import { CurrentMaterial } from "../types";

export default function useCourseSidebar(currentMaterial: CurrentMaterial) {
  const { dispatch, courseSidebarCollapsed } = useAppHook();

  const toggleCollapse = () => dispatch(toggleCourseSidebar());

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const materialRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());

  useEffect(() => {
    const key = `${currentMaterial.sectionId}-${currentMaterial.materialId}`;
    const itemEl = materialRefs.current.get(key);
    const sidebarEl = sidebarRef.current;

    if (itemEl && sidebarEl) {
      const offsetTop = itemEl.offsetTop;
      sidebarEl.scrollTo({
        top: offsetTop - 110,
        behavior: "smooth",
      });
    }
  }, [currentMaterial]);

  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(
    new Set()
  );

  const toggleSectionCollapse = (sectionId: number) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
      return newSet;
    });
  };

  const isCurrentMaterial = (sectionId: number, materialId: number) =>
    sectionId === currentMaterial.sectionId &&
    materialId === currentMaterial.materialId;

  return {
    toggleCollapse,
    sidebarRef,
    materialRefs,
    collapsedSections,
    toggleSectionCollapse,
    isCurrentMaterial,
    courseSidebarCollapsed,
  };
}
