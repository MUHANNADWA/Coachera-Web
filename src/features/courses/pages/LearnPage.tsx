import CourseSidebar from "../components/CourseSidebar";
import Loader from "../../../shared/components/Loader";
import NotFoundPage from "../../../shared/pages/NotFoundPage";
import useCoursePlayer from "../hooks/useCoursePlayer";
import QuizPage from "./quiz/QuizPage";
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

  // After loading finishes, if course or module is missing, show 404
  if (!course || !module) {
    return <NotFoundPage />;
  }

  if (!material || !currentMaterial) {
    return <NotFoundPage />;
  }

  console.log(material);

  return (
    <div className="page flex">
      <CourseSidebar
        module={module}
        currentMaterial={currentMaterial}
        setCurrentMaterial={setCurrentMaterial}
      />

      <main className="flex-1 px-8">
        <CourseHeader
          course={course}
          currentMaterial={currentMaterial}
          handleNext={handleNext}
          handlePrev={handlePrev}
          nextExists={nextExists}
          prevExists={prevExists}
        />

        {material.type === "VIDEO" && <VideoPage material={material} />}
        {material.type === "ARTICLE" && <ArticlePage material={material} />}
        {material.type === "QUIZ" && <QuizPage material={material} />}
      </main>
    </div>
  );
}
