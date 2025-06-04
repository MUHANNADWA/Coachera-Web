import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CourseSidebar from "../components/CourseSidebar";
import Breadcrumb from "../components/Breadcrumb";
import VideoPlayer from "../components/VideoPlayer";
import Loader from "../../../shared/components/Loader";
import { CurrentMaterial } from "../types";
import { getBreadcrumbs } from "../utils/breadcrumbs";
import { useGetCourseDetailsQuery } from "../../../shared/slices/coursesApiSlice";
import { Course } from "../../../shared/types/types";
import NotFound from "../../../shared/pages/NotFound";
import { useAppHook } from "../../../shared/hooks/useAppHook";

export default function CoursePlayer() {
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
    module &&
    course &&
    ((module.id !== course.modules[course.modules.length - 1].id &&
      currentIndex === allMaterials.length - 1) ||
      currentIndex < allMaterials.length - 1);

  const prevExists =
    module &&
    course &&
    ((module.id !== course.modules[0].id && currentIndex === 0) ||
      currentIndex > 0);

  if (isLoading) return <Loader center />;

  if (!course || !module || !material || !currentMaterial) {
    return <Loader center/>;
  }

  if (!module || !material) {
    return <NotFound />;
  }

  return (
    <div className="flex h-full-s overflow-x-hidden">
      <CourseSidebar
        module={module}
        currentMaterial={currentMaterial}
        setCurrentMaterial={setCurrentMaterial}
      />

      <main className="max-h-full-s overflow-y-auto flex-1 flex flex-col ml-8 pr-8">
        <header className="flex items-center justify-between my-4">
          <button
            onClick={handlePrev}
            disabled={!prevExists}
            className="cursor-pointer disabled:text-gray-400 px-6 py-3 hover:text-primary"
          >
            {"< Previous"}
          </button>

          <Breadcrumb
            items={getBreadcrumbs(course, currentMaterial.materialId)}
          />

          <button
            onClick={handleNext}
            disabled={!nextExists}
            className="cursor-pointer disabled:text-gray-400 px-6 py-3 hover:text-primary"
          >
            {"Next >"}
          </button>
        </header>

        {material.videoUrl && (
          <section className="relative w-full" style={{ paddingTop: "400px" }}>
            <VideoPlayer src={material.videoUrl} />
          </section>
        )}
        <section className="bg-white m-4">
          <h1 className="text-2xl mb-4 font-semibold">{material.title}</h1>
          <hr />
          <p className="text-l mb-4">{material.title}</p>
        </section>
      </main>
    </div>
  );
}
