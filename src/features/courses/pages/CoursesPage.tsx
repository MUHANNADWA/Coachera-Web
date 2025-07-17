import CourseCard from "../components/courseCard/CourseCard";
import { Course } from "../../../shared/types/types";
import CourseCardSkeleton from "../../skeletons/CourseCardSkeleton";
import { showErrorMessage } from "../../../utils/errorMessage";
import useCourses from "../hooks/useCourses";
import Message from "../../../shared/components/Message";

export default function CoursesPage() {
  const { size, courses, isLoading, error } = useCourses();

  return (
    <section className="flex-1">
      <div className="h-full w-full p-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Recommended Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(size)
                .fill(0)
                .map((_, index) => <CourseCardSkeleton key={index} />)
            ) : error ? (
              showErrorMessage(error)
            ) : courses.length === 0 ? (
              <Message variant="info">
                No courses found. Please check back later or try a different
                search.
              </Message>
            ) : (
              courses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
