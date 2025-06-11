import CourseSidebar from "../components/CourseSidebar";
import Loader from "../../../shared/components/Loader";
import NotFoundPage from "../../../shared/pages/NotFoundPage";
import useCoursePlayer from "../hooks/useCoursePlayer";
import QuizPage from "./QuizPage";
import ArticlePage from "./ArticlePage";
import VideoPage from "./VideoPage";
import CourseHeader from "../components/CourseHeader";

export default function CoursePage() {
  const {
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
  } = useCoursePlayer();

  if (isLoading) return <Loader center />;

  if (!course || !module || !material || !currentMaterial) {
    return <Loader center />;
  }

  if (!module || !material) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex h-full-s overflow-x-hidden">
      <CourseSidebar
        module={module}
        currentMaterial={currentMaterial}
        setCurrentMaterial={setCurrentMaterial}
      />

      <main className="max-h-full-s overflow-y-auto flex-1 flex flex-col ml-8 pr-8">
        <CourseHeader
          course={course}
          currentMaterial={currentMaterial}
          handleNext={handleNext}
          handlePrev={handlePrev}
          nextExists={nextExists}
          prevExists={prevExists}
        />

        {/* if Matrial is Video */}
        {material.videoUrl && <VideoPage material={material} />}

        {/* if Matrial is Article */}
        {material.article && <ArticlePage material={material} />}

        {/* if Matrial is Quiz */}
        {material.quiz && <QuizPage material={material} />}
      </main>
    </div>
  );
}
