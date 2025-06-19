import { useParams } from "react-router-dom";
import {
  CheckBadgeIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useGetCourseDetailsQuery } from "../coursesApiSlice";
import { Course, Review as ReviewType } from "../../../shared/types/types";
import Loader from "../../../shared/components/Loader";
import Meta from "../../../shared/components/Meta";
import Skills from "../../../shared/components/Skills";
import { skills } from "../../../shared/data/sampleData";
import { CourseModules } from "../components/CourseModules";
import { placeholderImage } from "../utils/Utils";
import Review from "../components/Review";
import { useGetCourseReviewsQuery } from "../reviewsApiSlice";
import { Button } from "../../../shared/components/Button";

export default function CourseDetailsPage() {
  const { id } = useParams();

  const { data } = useGetCourseDetailsQuery(Number(id));
  const course: Course = data?.data;

  const { data: reviewsData } = useGetCourseReviewsQuery(Number(id));
  const reviews: ReviewType[] = reviewsData?.data;

  if (!course) return <Loader center />;

  return (
    <div className="container mx-auto py-8 px-4">
      <Meta title={course.title} description={course.description} />
      <div className="rounded-lg overflow-hidden">
        <div className="flex max-lg:flex-col-reverse">
          <div className="lg:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.instructor}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>{course.durationHours}</span>
              </div>
              <div className="flex items-center text-sm">
                <ChartBarIcon className="h-5 w-5 mr-1" />
                <span>{course.level ?? "Begginner"}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckBadgeIcon className="h-5 w-5 mr-1" />
                <span>Certificate</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700">{course.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
              <ul className="list-['✓'] pl-5 space-y-2">
                <li>Master the fundamentals of the subject</li>
                <li>Build real-world projects</li>
                <li>Get certified upon completion</li>
                <li>Join a community of learners</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Skills You'll gain</h2>
              <Skills skills={skills} />
            </div>

            <CourseModules modules={course.modules} />

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              {reviews.map((_, i) => (
                <Review review={reviews[i] as ReviewType} />
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 bg-gray-50 p-6">
            <div className="sticky top-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={course.image ?? placeholderImage(course.title)}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue">
                    ${course.price}
                  </span>
                  <span className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                    ★ {course.rating}
                  </span>
                </div>
                <Button full variant="primary" className="mb-2">
                  Enroll Now
                </Button>
                <Button full variant="secondary">
                  Add to Favorites
                </Button>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">This Course Includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>10 hours on-demand video</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>5 articles</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
