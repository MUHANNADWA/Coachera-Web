import { useParams } from "react-router-dom";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useGetCourseDetailsQuery } from "../api/coursesApiSlice";
import { Course } from "../../../shared/types/types";
import { useEffect, useMemo, useState } from "react";
import { CurrentMaterial } from "../types";

export default function useCoursePlayer() {
  const { navigate, location } = useAppHook();
  const { courseId, moduleId } = useParams<{
    courseId: string;
    moduleId: string;
  }>();

  // Fetch course details; refetch when courseId changes
  const { data, isLoading, isFetching } = useGetCourseDetailsQuery(
    Number(courseId),
    {
      // this ensures we refetch when courseId changes
      refetchOnMountOrArgChange: true,
    }
  );

  const course: Course | undefined = data?.data;

  // Resolve module:
  // 1) try by id equality (string compare to be safe)
  // 2) if moduleId is numeric and not found by id, fallback to index
  const module = useMemo(() => {
    if (!course?.modules) return undefined;

    const byId = course.modules.find((m) => String(m.id) === String(moduleId));
    if (byId) return byId;

    const idx = Number(moduleId);
    if (!Number.isNaN(idx)) {
      return course.modules[idx];
    }

    return undefined;
  }, [course, moduleId]);

  const [currentMaterial, setCurrentMaterial] =
    useState<CurrentMaterial | null>(null);

  // Initialize current material whenever module or navigation state changes
  useEffect(() => {
    if (!module) return;

    const isNavigatedFromPrev = location.state?.fromNav === "prev";
    const sections = module.sections ?? [];
    if (!sections.length) return;

    const targetSection = isNavigatedFromPrev
      ? sections[sections.length - 1]
      : sections[0];
    const materials = targetSection?.materials ?? [];
    if (!materials.length) return;

    const targetMaterial = isNavigatedFromPrev
      ? materials[materials.length - 1]
      : materials[0];

    setCurrentMaterial({
      sectionId: targetSection.id,
      materialId: targetMaterial.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module, location.state]);

  const activeSection = useMemo(
    () => module?.sections.find((s) => s.id === currentMaterial?.sectionId),
    [module, currentMaterial]
  );

  const material = useMemo(
    () =>
      activeSection?.materials.find(
        (m) => m.id === currentMaterial?.materialId
      ),
    [activeSection, currentMaterial]
  );

  const allMaterials = useMemo(
    () =>
      module?.sections.flatMap((section) =>
        (section.materials ?? []).map((mat) => ({
          ...mat,
          sectionId: section.id,
        }))
      ) ?? [],
    [module]
  );

  const currentIndex = useMemo(() => {
    return allMaterials.findIndex(
      (m) =>
        m.id === currentMaterial?.materialId &&
        m.sectionId === currentMaterial?.sectionId
    );
  }, [allMaterials, currentMaterial]);

  // Helper: get module position inside course.modules (by id)
  const modulePos = useMemo(() => {
    if (!course?.modules || !module) return -1;
    return course.modules.findIndex((m) => String(m.id) === String(module.id));
  }, [course, module]);

  const handleNavigateToModule = (targetPos: number, from: "prev" | "next") => {
    if (!course?.modules?.[targetPos]) return;
    const targetModuleId = course.modules[targetPos].id; // navigate by ID, not index
    navigate(`/learn/${courseId}/${targetModuleId}`, {
      state: { fromNav: from },
    });
  };

  const handleNext = () => {
    if (!module || !course || currentIndex === -1) return;

    const isLastMaterialInModule = currentIndex === allMaterials.length - 1;
    const isLastModule =
      modulePos !== -1 && modulePos === course.modules.length - 1;

    if (isLastMaterialInModule && !isLastModule) {
      handleNavigateToModule(modulePos + 1, "next");
      return;
    }

    if (currentIndex < allMaterials.length - 1) {
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
    const isFirstModule = modulePos === 0;

    if (isFirstMaterialInModule && !isFirstModule) {
      handleNavigateToModule(modulePos - 1, "prev");
      return;
    }

    if (currentIndex > 0) {
      const prevMaterial = allMaterials[currentIndex - 1];
      setCurrentMaterial({
        sectionId: prevMaterial.sectionId,
        materialId: prevMaterial.id,
      });
    }
  };

  const nextExists =
    !!module &&
    !!course &&
    (modulePos < (course.modules?.length ?? 0) - 1 ||
      currentIndex < allMaterials.length - 1);

  const prevExists =
    !!module && !!course && (modulePos > 0 || currentIndex > 0);

  return {
    isLoading: isLoading || isFetching,
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
