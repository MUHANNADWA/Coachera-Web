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
} from "../apiSlices/coursesApiSlice";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../apiSlices/wishlistApiSlice";
import { Course, Review as ReviewType } from "../../../shared/types/types";
import Loader from "../../../shared/components/Loader";
import Meta from "../../../shared/components/Meta";
import Skills from "../../../shared/components/Skills";
import { skills } from "../../../shared/data/sampleData";
import { CourseModules } from "../components/CourseModules";
import Review from "../components/Review";
import { useGetCourseReviewsQuery } from "../apiSlices/reviewsApiSlice";
import { Button } from "../../../shared/components/form/Button";
import toastPromise from "../../../utils/toast";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import {
  addToWishlistSlice,
  removeFromWishlistSlice,
} from "../slices/wishlistSlice";
import { LEARN_URL } from "../../../constants/constants";
import { useRequiresAuth } from "../../../shared/hooks/useRequiresAuth";

export default function CourseDetailsPage() {
  const { id } = useParams();

  const { wishlistCourses, enrolledCourses, dispatch, navigate } = useAppHook();
  const requiresAuth = useRequiresAuth();

  const { data } = useGetCourseDetailsQuery(Number(id));
  const course: Course = data?.data;

  const { data: reviewsData } = useGetCourseReviewsQuery(Number(id));
  const reviews: ReviewType[] = reviewsData?.data;

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

  const handleToggleWishlist = async () => {
    const promise = isInWishlist
      ? removeFromWishlist(Number(id))
      : addToWishlist(Number(id));

    toastPromise(promise, {
      loadingMessage: isInWishlist
        ? "Removing from favorites..."
        : "Adding to favorites...",
      successMessage: isInWishlist
        ? "Removed from favorites."
        : "Added to favorites!",
      onSuccess: () => {
        if (isInWishlist) {
          dispatch(removeFromWishlistSlice(course));
        } else {
          dispatch(addToWishlistSlice(course));
        }
      },
    });
  };

  const isEnrolled = enrolledCourses.includes(course);
  const isInWishlist = wishlistCourses.includes(course);

  if (!course) return <Loader logo />;

  return (
    <div className="page">
      <Meta title={course.title} description={course.description} />

      {/* Hero Section */}
      <div className="consect rounded-none border-none gradiant py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Master new skills with expert guidance
            </p>

            {/* Course Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <UserIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  {course.instructors[0] ?? "Abo Mahmoud Org"}
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  {course.durationHours} hours
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  {course.level ?? "Beginner"}
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <StarIcon className="h-5 w-5 mr-2 text-yellow-300" />
                <span className="font-medium">{course.rating} rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex max-lg:flex-col-reverse gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* About Section */}
            <section className="consect p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">About This Course</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {course.description}
              </p>
            </section>

            {/* Learning Objectives */}
            <section className="consect p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Master the fundamentals of the subject
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Build real-world projects
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Get certified upon completion
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Join a community of learners
                  </span>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="consect p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Skills You'll Gain</h2>
              <Skills skills={skills} showCount variant="detailed" />
            </section>

            {/* Course Modules */}
            <CourseModules course={course} />

            {/* Reviews Section */}
            <section className="consect p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Student Reviews</h2>
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {course.rating}
                  </span>
                  <span className="text-gray-500">
                    ({reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {reviews?.map((review, i) => (
                  <Review key={i} review={review as ReviewType} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <nav className="sticky top-8 space-y-6">
              {/* Course Image */}
              <section className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <PlayIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </section>

              {/* Pricing Card */}
              <section className="gradiant p-6 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold">${course.price}</span>
                    <span className="text-blue-200 ml-2 line-through">
                      ${(course.price * 1.55).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    <StarIcon className="h-4 w-4 mr-1" />
                    {course.rating}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    full
                    variant="primaryInverted"
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
                    variant="secondaryInverted"
                  >
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-blue-200 text-sm">
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              </section>

              {/* Course Includes */}
              <section className="consect p-6">
                <h3 className="font-bold text-xl mb-4">
                  This Course Includes:
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <PlayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">10 hours on-demand video</p>
                      <p className="text-sm text-gray-500">
                        HD quality content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <DocumentTextIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">5 articles</p>
                      <p className="text-sm text-gray-500">
                        Supplementary materials
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <ArrowDownTrayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Downloadable resources</p>
                      <p className="text-sm text-gray-500">
                        Code files & exercises
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <AcademicCapIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Certificate of completion</p>
                      <p className="text-sm text-gray-500">Share on LinkedIn</p>
                    </div>
                  </div>
                </div>
              </section>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
