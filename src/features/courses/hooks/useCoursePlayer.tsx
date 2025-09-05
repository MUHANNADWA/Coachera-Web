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
      refetchOnMountOrArgChange: true,
    }
  );

  const course: Course | undefined = data?.data;

  // Resolve module with robust fallbacks:
  // 1) try by exact id
  // 2) try by numeric index
  // 3) fallback to first module (if any)
  const resolvedModule = useMemo(() => {
    if (!course?.modules?.length) return undefined;

    const byId = course.modules.find((m) => String(m.id) === String(moduleId));
    if (byId) return byId;

    const idx = Number(moduleId);
    if (!Number.isNaN(idx) && course.modules[idx]) {
      return course.modules[idx];
    }

    // Fallback to first module if URL param is stale or invalid
    return course.modules[0];
  }, [course, moduleId]);

  // Keep URL canonical: if the current URL moduleId doesn't match resolvedModule.id,
  // replace the URL to use the correct module id (avoid stale params across courses).
  useEffect(() => {
    if (!course || !resolvedModule) return;
    if (String(resolvedModule.id) !== String(moduleId)) {
      navigate(`/learn/${courseId}/${resolvedModule.id}`, {
        replace: true,
        state: location.state,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, course, resolvedModule]);

  // Current material state
  const [currentMaterial, setCurrentMaterial] =
    useState<CurrentMaterial | null>(null);

  // Reset currentMaterial when module changes (prevent stale selection)
  useEffect(() => {
    setCurrentMaterial(null);
  }, [resolvedModule?.id]);

  // Initialize current material whenever module or navigation state changes
  useEffect(() => {
    const mod = resolvedModule;
    if (!mod) return;

    const isNavigatedFromPrev = location.state?.fromNav === "prev";
    const sections = mod.sections ?? [];
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
      materialId: Number(targetMaterial.id),
    });
  }, [resolvedModule, location.state]);

  // Convenience getters
  const activeSection = useMemo(
    () =>
      resolvedModule?.sections.find((s) => s.id === currentMaterial?.sectionId),
    [resolvedModule, currentMaterial]
  );

  const material = useMemo(
    () =>
      activeSection?.materials.find(
        (m) => m.id === currentMaterial?.materialId
      ),
    [activeSection, currentMaterial]
  );

  // Flatten materials across sections for prev/next
  const allMaterials = useMemo(
    () =>
      resolvedModule?.sections.flatMap((section) =>
        (section.materials ?? []).map((mat) => ({
          ...mat,
          sectionId: section.id,
        }))
      ) ?? [],
    [resolvedModule]
  );

  const currentIndex = useMemo(() => {
    return allMaterials.findIndex(
      (m) =>
        m.id === currentMaterial?.materialId &&
        m.sectionId === currentMaterial?.sectionId
    );
  }, [allMaterials, currentMaterial]);

  // Position of current module inside course
  const modulePos = useMemo(() => {
    if (!course?.modules || !resolvedModule) return -1;
    return course.modules.findIndex(
      (m) => String(m.id) === String(resolvedModule.id)
    );
  }, [course, resolvedModule]);

  const handleNavigateToModule = (targetPos: number, from: "prev" | "next") => {
    if (!course?.modules?.[targetPos]) return;
    const targetModuleId = course.modules[targetPos].id; // navigate by ID, not index
    navigate(`/learn/${courseId}/${targetModuleId}`, {
      state: { fromNav: from },
    });
  };

  const handleNext = () => {
    if (!resolvedModule || !course || currentIndex === -1) return;

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
        materialId: Number(nextMaterial.id),
      });
    }
  };

  const handlePrev = () => {
    if (!resolvedModule || !course || currentIndex === -1) return;

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
        materialId: Number(prevMaterial.id),
      });
    }
  };

  const nextExists =
    !!resolvedModule &&
    !!course &&
    (modulePos < (course.modules?.length ?? 0) - 1 ||
      currentIndex < allMaterials.length - 1);

  const prevExists =
    !!resolvedModule && !!course && (modulePos > 0 || currentIndex > 0);

  return {
    isLoading: isLoading || isFetching,
    course,
    module: resolvedModule,
    material,
    currentMaterial,
    setCurrentMaterial,
    prevExists,
    handlePrev,
    nextExists,
    handleNext,
  };
}
