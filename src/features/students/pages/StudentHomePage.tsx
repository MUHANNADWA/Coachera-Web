import { Meta } from "react-router-dom";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { Course } from "../../../shared/types/types";
import { Button } from "../../../shared/components/form/Button";
import Message from "../../../shared/components/Message";
import CoursesView from "../../../shared/components/CoursesView";
import FeaturesSection from "../../../shared/components/FeaturesSection";
import HighlightsSection from "../../../shared/components/HighlightsSection";
import CategoriesSection from "../../../shared/components/CategoriesSection";
import FAQAccordion from "../../../shared/components/Faq";

// Helper: derive a "continue" target (customize as needed)
function getNextLessonLink(course: Course): string {
  // If you track progress, compute next lesson id; fallback to first module
  return `/learn/${course.id}/${course.modules?.[0]?.id ?? "intro"}`;
}

export default function StudentHomePage() {
  const { navigate, user, enrolledCourses, wishlistCourses } = useAppHook();

  // Simple hero title depending on user (first name if available)
  const firstName =
    (user as any)?.details?.firstName || (user as any)?.username || "there";

  return (
    <div className="alternate-sections">
      <Meta />

      {/* Student Welcome */}
      <section>
        <div className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, <span className="text-primary">{firstName}</span> 👋
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Pick up where you left off or discover new courses tailored for
              you.
            </p>
            <div className="flex flex-wrap gap-4">
              {enrolledCourses?.length ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(getNextLessonLink(enrolledCourses[0]))
                  }
                >
                  Continue learning
                </Button>
              ) : (
                <Button variant="primary" onClick={() => navigate("/courses")}>
                  Start learning
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => navigate("/notifications")}
              >
                View notifications
              </Button>
            </div>
          </div>

          {/* Quick stats / wishlist hint */}
          <div className="consect rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Your learning at a glance
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Enrolled courses:{" "}
                <strong>{enrolledCourses?.length ?? 0}</strong>
              </li>
              <li>
                Wishlist: <strong>{wishlistCourses?.length ?? 0}</strong>
              </li>
              <li>
                Account:{" "}
                <strong className="uppercase">
                  {(user as any)?.role ?? "STUDENT"}
                </strong>
              </li>
            </ul>
            {!enrolledCourses?.length && (
              <Message variant="info" className="mt-4">
                You have no enrolled courses yet — browse popular picks below.
              </Message>
            )}
          </div>
        </div>
      </section>

      {/* Continue learning (if enrolled) */}
      {enrolledCourses?.length > 0 && (
        <section>
          <div className="px-6 md:px-16">
            <h2 className="text-3xl font-bold mb-4">Continue learning</h2>
            {/* Reuse CoursesView with a grid layout by passing layout="grid" */}
            {/* If you want exactly the user's enrolled list, render custom cards instead. */}
            {/* Here we render a simple grid of enrolled courses: */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledCourses.map((course: Course) => (
                <div key={course.id} className="card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold line-clamp-1">
                      {course.title}
                    </h3>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(getNextLessonLink(course))}
                    >
                      Resume
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {course.description ?? "Keep up the momentum!"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended / Trending / Popular for students */}
      <CoursesView variant="recommended" layout="carousel" />
      <CoursesView variant="trending" layout="grid" />
      <CoursesView variant="popular" layout="grid" />

      {/* Keep common marketing sections (students still benefit) */}
      <FeaturesSection />
      <HighlightsSection />
      <CategoriesSection />
      <FAQAccordion />
    </div>
  );
}
