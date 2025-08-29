import { useParams } from "react-router-dom";
import {
  CheckBadgeIcon,
  ClockIcon,
  ChartBarIcon,
  UserIcon,
  StarIcon,
  PlayIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import {
  useEnrollCourseMutation,
  useGetCourseDetailsQuery,
} from "../api/coursesApiSlice";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../api/wishlistApiSlice";
import { Course, Review as ReviewType } from "../../../shared/types/types";
import Loader from "../../../shared/components/Loader";
import Meta from "../../../shared/components/Meta";
import Skills from "../../../shared/components/Skills";
import { skills } from "../../../shared/data/sampleData";
import { CourseModules } from "../components/CourseModules";
import Review from "../components/Review";
import { useGetCourseReviewsQuery } from "../api/reviewsApiSlice";
import { Button } from "../../../shared/components/form/Button";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import {
  addToWishlistSlice,
  removeFromWishlistSlice,
} from "../slices/wishlistSlice";
import { LEARN_URL } from "../../../constants/constants";
import { useRequiresAuth } from "../../../shared/hooks/useRequiresAuth";
import toastPromise from "../../../shared/utils/toast";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { wishlistCourses, enrolledCourses, dispatch, navigate } = useAppHook();
  const requiresAuth = useRequiresAuth();

  const { data, isLoading } = useGetCourseDetailsQuery(Number(id));
  const course: Course = data?.data;

  const { data: reviewsData } = useGetCourseReviewsQuery(Number(id));
  const reviews: ReviewType[] = reviewsData?.data ?? [];

  const [enrollCourse] = useEnrollCourseMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const handleEnrollment = async () => {
    await toastPromise(enrollCourse(Number(id)), {
      loadingMessage: "Enrolling in course...",
      successMessage: "Enrolled!",
      errorMessage: "Failed to enroll",
    });
  };

  const isEnrolled = course
    ? enrolledCourses.some((c) => c.id === course.id)
    : false;

  const isWishlisted = course
    ? wishlistCourses.some((c) => c.id === course.id)
    : false;

  const handleToggleWishlist = async () => {
    if (!course) return;

    const promise = isWishlisted
      ? removeFromWishlist(Number(id))
      : addToWishlist(Number(id));

    toastPromise(promise, {
      loadingMessage: isWishlisted
        ? "Removing from favorites..."
        : "Adding to favorites...",
      successMessage: isWishlisted
        ? "Removed from favorites."
        : "Added to favorites!",
      onSuccess: () => {
        if (isWishlisted) {
          dispatch(removeFromWishlistSlice(course));
        } else {
          dispatch(addToWishlistSlice(course));
        }
      },
    });
  };

  if (!course || isLoading) return <Loader logo />;

  // Price helpers
  const price = course.price ?? 0;
  const isFree = price === 0;
  const displayPrice = isFree ? "Free" : `$${price.toFixed(2)}`;
  const oldPrice = !isFree ? `$${(price * 1.55).toFixed(2)}` : "";

  return (
    <div className="page">
      <Meta title={course.title} description={course.description} />

      {/* HERO */}
      <section className="relative px-6 sm:px-10 py-12 sm:py-16 bg-primary-lightest dark:bg-dark">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            {/* Left: Title & Stats */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 dark:border-primary/40 bg-primary/5 dark:bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-5">
                New • {course.level ?? "Beginner"}
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                {course.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                {course.description ??
                  "Master new skills with expert guidance."}
              </p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-3">
                <StatPill
                  icon={<UserIcon className="h-5 w-5" />}
                  label={course.instructors?.[0] ?? "Organization"}
                />
                <StatPill
                  icon={<ClockIcon className="h-5 w-5" />}
                  label={`${course.durationHours ?? "N/A"} hours`}
                />
                <StatPill
                  icon={<ChartBarIcon className="h-5 w-5" />}
                  label={course.level ?? "Beginner"}
                />
                <StatPill
                  icon={<StarIcon className="h-5 w-5" />}
                  label={`${(course.rating ?? 0).toFixed(1)} rating`}
                  badge
                />
              </div>
            </div>

            {/* Right: Hero image card */}
            <div className="relative group rounded-2xl overflow-hidden border-2 border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 shadow-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-[280px] md:h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="inline-flex items-center gap-2 bg-white/15 dark:bg-black/25 backdrop-blur-md rounded-full px-3 py-2 text-sm text-white">
                  <PlayIcon className="h-5 w-5" />
                  Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Main */}
          <main className="space-y-8">
            {/* About */}
            <CardSection title="About This Course">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[1.05rem]">
                {course.description}
              </p>
            </CardSection>

            {/* Objectives */}
            <CardSection title="What You'll Learn">
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  "Master the fundamentals of the subject",
                  "Build real-world projects",
                  "Get certified upon completion",
                  "Join a community of learners",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-[3px] w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckBadgeIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardSection>

            {/* Skills */}
            <CardSection title="Skills You'll Gain">
              <Skills skills={skills} showCount variant="compact" />
            </CardSection>

            {/* Modules */}
            <CourseModules course={course} />

            {/* Reviews */}
            <CardSection
              title="Student Reviews"
              headerRight={
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-yellow-300/40 bg-yellow-50/60 dark:bg-yellow-500/10 px-3 py-1 text-sm">
                  <StarIcon className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {(course.rating ?? 0).toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({reviews.length} reviews)
                  </span>
                </div>
              }
            >
              <div className="space-y-6">
                {reviews.map((review, i) => (
                  <Review key={(review as any)?.id ?? i} review={review} />
                ))}
                {reviews.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    No reviews yet.
                  </p>
                )}
              </div>
            </CardSection>
          </main>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              {/* Pricing / CTA */}
              <div className="consect py-6 px-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="leading-none">
                    <div className="text-3xl font-extrabold">
                      {displayPrice}
                    </div>
                    {!isFree && (
                      <div className="text-gray-400 line-through mt-1">
                        {oldPrice}
                      </div>
                    )}
                  </div>

                  <div className="inline-flex items-center bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    <StarIcon className="h-4 w-4 mr-1" />
                    {(course.rating ?? 0).toFixed(1)}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    full
                    variant="primary"
                    onClick={
                      isEnrolled
                        ? () => navigate(`${LEARN_URL}/${id}/1`)
                        : () => requiresAuth(handleEnrollment)
                    }
                  >
                    {isEnrolled ? "Go To Course" : "Enroll Now"}
                  </Button>

                  <Button
                    onClick={() => requiresAuth(handleToggleWishlist)}
                    full
                    variant="secondary"
                  >
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  30-Day Money-Back Guarantee
                </p>
              </div>

              {/* Includes */}
              <CardSection title="This Course Includes:">
                <Feature
                  icon={
                    <PlayIcon className="h-5 w-5 text-primary dark:text-primary" />
                  }
                  title="10 hours on-demand video"
                  subtitle="HD quality content"
                />
                <Feature
                  icon={
                    <DocumentTextIcon className="h-5 w-5 text-primary dark:text-primary" />
                  }
                  title="5 articles"
                  subtitle="Supplementary materials"
                />
                <Feature
                  icon={
                    <ArrowDownTrayIcon className="h-5 w-5 text-primary dark:text-primary" />
                  }
                  title="Downloadable resources"
                  subtitle="Code files & exercises"
                />
                <Feature
                  icon={
                    <AcademicCapIcon className="h-5 w-5 text-primary dark:text-primary" />
                  }
                  title="Certificate of completion"
                  subtitle="Share on LinkedIn"
                />
              </CardSection>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/** Small presentational helper components (keep in-file for simplicity) */
function StatPill({
  icon,
  label,
  badge = false,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: boolean;
}) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2",
        badge
          ? "border-yellow-300/40 bg-yellow-50/60 dark:bg-yellow-500/10"
          : "border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-dark/50",
        "backdrop-blur-md text-sm text-gray-700 dark:text-gray-200",
      ].join(" ")}
    >
      <span className="opacity-80">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function CardSection({
  title,
  children,
  headerRight,
}: {
  title: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}) {
  return (
    <section className="consect py-6 px-8">
      <div className="flex items-start justify-between gap-4 mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        {headerRight}
      </div>
      {children}
    </section>
  );
}

function Feature({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 mb-3 rounded-xl border-2 border-gray-100 dark:border-white/10">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
