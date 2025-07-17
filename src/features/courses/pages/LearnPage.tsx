import CourseSidebar from "../components/CourseSidebar";
import Loader from "../../../shared/components/Loader";
import NotFoundPage from "../../../shared/pages/NotFoundPage";
import useCoursePlayer from "../hooks/useCoursePlayer";
import QuizPage from "./QuizPage";
import ArticlePage from "./ArticlePage";
import VideoPage from "./VideoPage";
import CourseHeader from "../components/CourseHeader";

export default function LearnPage() {
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

  if (isLoading) return <Loader logo />;

  if (!course || !module || !material || !currentMaterial) {
    return <Loader logo />;
  }

  if (!module || !material) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex">
      <CourseSidebar
        module={module}
        currentMaterial={currentMaterial}
        setCurrentMaterial={setCurrentMaterial}
      />

      <main className="page flex-1 px-8">
        <CourseHeader
          course={course}
          currentMaterial={currentMaterial}
          handleNext={handleNext}
          handlePrev={handlePrev}
          nextExists={nextExists}
          prevExists={prevExists}
        />

        {/* if Matrial is Video */}
        {material.type === "VIDEO" && <VideoPage material={material} />}

        {/* if Matrial is Article */}
        {material.type === "ARTICLE" && <ArticlePage material={material} />}

        {/* if Matrial is Quiz */}
        {material.type === "QUIZ" && <QuizPage material={material} />}
      </main>
    </div>
  );
}
