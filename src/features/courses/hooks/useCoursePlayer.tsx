import { useParams } from "react-router-dom";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useGetCourseDetailsQuery } from "../coursesApiSlice";
import { Course } from "../../../shared/types/types";
import { useEffect, useMemo, useState } from "react";
import { CurrentMaterial } from "../types";

export default function useCoursePlayer() {
  const { navigate, location } = useAppHook();
  const { courseId, moduleId } = useParams();

  const moduleIndex = Number(moduleId);
  const { data, isLoading } = useGetCourseDetailsQuery(Number(courseId));
  const course: Course = data?.data;

  const module = course?.modules.find((m) => m.id === moduleIndex);

  const [currentMaterial, setCurrentMaterial] =
    useState<CurrentMaterial | null>(null);

  useEffect(() => {
    if (!module) return;

    const isNavigatedFromPrev = location.state?.fromNav === "prev";
    const targetSection = isNavigatedFromPrev
      ? module.sections[module.sections.length - 1]
      : module.sections[0];

    const targetMaterial = isNavigatedFromPrev
      ? targetSection?.materials[targetSection.materials.length - 1]
      : targetSection?.materials[0];

    if (targetSection && targetMaterial) {
      setCurrentMaterial({
        sectionId: targetSection.id,
        materialId: targetMaterial.id,
      });
    }
  }, [module, location.state]);

  const activeSection = module?.sections.find(
    (s) => s.id === currentMaterial?.sectionId
  );
  const material = activeSection?.materials.find(
    (m) => m.id === currentMaterial?.materialId
  );

  const allMaterials = useMemo(
    () =>
      module?.sections.flatMap((section) =>
        section.materials.map((material) => ({
          ...material,
          sectionId: section.id,
        }))
      ) || [],
    [module]
  );

  const currentIndex = useMemo(
    () =>
      allMaterials.findIndex(
        (m) =>
          m.id === currentMaterial?.materialId &&
          m.sectionId === currentMaterial?.sectionId
      ),
    [allMaterials, currentMaterial]
  );

  const handleNavigateToModule = (
    newModuleIndex: number,
    from: "prev" | "next"
  ) => {
    navigate(`/learn/${courseId}/${newModuleIndex}`, {
      state: { fromNav: from },
    });
  };

  const handleNext = () => {
    if (!module || !course || currentIndex === -1) return;

    const isLastMaterialInModule = currentIndex === allMaterials.length - 1;
    const isLastModule =
      module.id === course.modules[course.modules.length - 1].id;

    if (isLastMaterialInModule && !isLastModule) {
      handleNavigateToModule(moduleIndex + 1, "next");
    } else if (currentIndex < allMaterials.length - 1) {
      const nextMaterial = allMaterials[currentIndex + 1];
      setCurrentMaterial({
        sectionId: nextMaterial.sectionId,
        materialId: nextMaterial.id,
      });
    }
  };

  const handlePrev = () => {
    if (!module || !course || currentIndex === -1) return;

    const isFirstMaterialInModule = currentIndex === 0;
    const isFirstModule = module.id === course.modules[0].id;

    if (isFirstMaterialInModule && !isFirstModule) {
      handleNavigateToModule(moduleIndex - 1, "prev");
    } else if (currentIndex > 0) {
      const prevMaterial = allMaterials[currentIndex - 1];
      setCurrentMaterial({
        sectionId: prevMaterial.sectionId,
        materialId: prevMaterial.id,
      });
    }
  };

  const nextExists =
    (module &&
      course &&
      ((module.id !== course.modules[course.modules.length - 1].id &&
        currentIndex === allMaterials.length - 1) ||
        currentIndex < allMaterials.length - 1)) ??
    false;

  const prevExists =
    (module &&
      course &&
      ((module.id !== course.modules[0].id && currentIndex === 0) ||
        currentIndex > 0)) ??
    false;

  return {
    isLoading,
    course,
    module,
    material,
    currentMaterial,
    setCurrentMaterial,
    prevExists,
    handlePrev,
    nextExists,
    handleNext,
  };
}
