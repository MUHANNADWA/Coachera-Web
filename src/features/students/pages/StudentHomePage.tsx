// features/students/pages/StudentHomePage.tsx
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { Course } from "../../../shared/types/types";
import { Button } from "../../../shared/components/form/Button";
import Message from "../../../shared/components/Message";
import CoursesView from "../../../shared/components/CoursesView";
import FeaturesSection from "../../../shared/components/FeaturesSection";
import HighlightsSection from "../../../shared/components/HighlightsSection";
import CategoriesSection from "../../../shared/components/CategoriesSection";
import FAQAccordion from "../../../shared/components/Faq";

// Icons
import {
  BellIcon,
  BookOpenIcon,
  HeartIcon,
  UserCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  ClockIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

function getNextLessonLink(course: Course): string {
  // Navigate to first module by id; fallback to "1"
  return `/learn/${course.id}/${course.modules?.[0]?.id ?? "1"}`;
}

export default function StudentHomePage() {
  const { navigate, user, enrolledCourses, wishlistCourses } = useAppHook();

  const firstName =
    (user as any)?.details?.firstName || (user as any)?.username || "there";

  return (
    <div className="alternate-sections max-sm:text-center">
      {/* ===================== HERO ===================== */}
      <section>
        <div className="py-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          {/* Left: Welcome + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 dark:border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
              <BoltIcon className="w-4 h-4" />
              Personalized Dashboard
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Welcome back, <span className="text-primary">{firstName}</span> 👋
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
              Pick up where you left off, track your progress, and discover new
              courses curated just for you.
            </p>

            <div className="flex flex-wrap gap-4 max-sm:justify-center">
              {enrolledCourses?.length ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(getNextLessonLink(enrolledCourses[0]))
                  }
                  className="inline-flex items-center gap-2"
                >
                  <PlayIcon className="w-5 h-5" />
                  Continue learning
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => navigate("/courses")}
                  className="inline-flex items-center gap-2"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                  Start learning
                </Button>
              )}

              <Button
                variant="secondary"
                onClick={() => navigate("/notifications")}
                className="inline-flex items-center gap-2"
              >
                <BellIcon className="w-5 h-5" />
                View notifications
              </Button>
            </div>
          </div>

          {/* Right: Quick stats with icons */}
          <div className="consect p-8">
            <h3 className="text-xl font-semibold mb-6 max-sm:text-center">
              Quick Stats
            </h3>

            <ul className="space-y-4 text-start">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                  <BookOpenIcon className="w-5 h-5 text-primary" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enrolled courses
                  </p>
                  <p className="text-lg font-semibold">
                    {enrolledCourses?.length ?? 0}
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30">
                  <HeartIcon className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Wishlist
                  </p>
                  <p className="text-lg font-semibold">
                    {wishlistCourses?.length ?? 0}
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 dark:bg-white/10">
                  <UserCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Account
                  </p>
                  <p className="text-lg font-semibold uppercase">
                    {(user as any)?.role ?? "STUDENT"}
                  </p>
                </div>
              </li>
            </ul>

            {!enrolledCourses?.length && (
              <Message variant="info" className="mt-6">
                You have no enrolled courses yet — check popular picks below.
              </Message>
            )}
          </div>
        </div>
      </section>

      {/* ===================== CONTINUE LEARNING ===================== */}
      {enrolledCourses?.length > 0 && (
        <section className="bg-gray-50 dark:bg-dark/40">
          <div>
            <div className="px-24 mx-auto py-14 max-sm:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Continue learning</h2>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/courses")}
                  className="inline-flex items-center gap-2 max-sm:hidden"
                >
                  Browse more
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {enrolledCourses.map((course: Course) => {
                  // Derivatives
                  const level = course.level ?? "Beginner";
                  const category =
                    (course as any)?.categories?.[0]?.name ?? "General";
                  const thumb =
                    course.image ||
                    `https://placehold.co/800x450?text=${encodeURIComponent(
                      course.title
                    )}`;
                  const duration = (course as any)?.durationHours;
                  const modulesCount = course.modules?.length ?? 0;
                  const progress =
                    (course as any)?.progressPct ??
                    Math.min(95, Math.floor(Math.random() * 70) + 10);

                  return (
                    <article
                      key={course.id}
                      className="card group "
                      role="button"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      {/* Image (مثل CourseCard) */}
                      <div className="relative overflow-hidden">
                        <img
                          src={thumb}
                          alt={`Course cover for ${course.title}`}
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.12]"
                          loading="lazy"
                        />

                        {/* Category badge (نفس ستايل زر معكوس) */}
                        {category && (
                          <Button
                            className="absolute! top-3 left-3 text-xs font-medium py-1.5! px-3! m-0!"
                            variant="primaryInverted"
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/search?q=${encodeURIComponent(
                                  category
                                )}&type=categories`
                              );
                            }}
                          >
                            {category}
                          </Button>
                        )}

                        {/* Level badge (أسفل يمين) */}
                        <div className="absolute! bottom-3 right-3 z-10">
                          <span className="text-xs font-semibold text-white dark:text-dark bg-primary backdrop-blur-sm px-2 py-1 rounded-md">
                            {level}
                          </span>
                        </div>
                      </div>

                      {/* Body (متقارب مع CourseCard) */}
                      <div className="p-5 space-y-3">
                        <h3
                          className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-200"
                          title={course.title}
                        >
                          {course.title}
                        </h3>

                        {course.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {course.description}
                          </p>
                        )}

                        {/* Meta row */}
                        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                          <span className="inline-flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {duration ? `${duration}h` : "—"}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <BookOpenIcon className="w-4 h-4" />
                            {modulesCount} modules
                          </span>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5 pt-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">
                              Progress
                            </span>
                            <span className="font-semibold">{progress}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: `${Math.max(
                                  0,
                                  Math.min(100, progress)
                                )}%`,
                              }}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={Math.max(
                                0,
                                Math.min(100, progress)
                              )}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="primary"
                            className="flex-1 inline-flex items-center justify-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(getNextLessonLink(course));
                            }}
                          >
                            <PlayIcon className="w-4 h-4" />
                            Resume
                          </Button>
                          <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/courses/${course.id}`);
                            }}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== FEEDS ===================== */}
      <CoursesView variant="recommended" className="px-24" />
      <CoursesView variant="trending" className="px-24" />
      <CoursesView variant="popular" className="px-24" />

      {/* ===================== SECTIONS ===================== */}
      <FeaturesSection />
      <HighlightsSection />
      <CategoriesSection />
      <FAQAccordion />
    </div>
  );
}
