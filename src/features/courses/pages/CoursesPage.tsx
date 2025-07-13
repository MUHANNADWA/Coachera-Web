import CourseCard from "../components/CourseCard";
import { Course } from "../../../shared/types/types";
import CourseCardSkeleton from "../components/CourseCardSkeleton";
import FiltersSidebar from "../components/FiltersSidebar";
import Pagination from "../components/Pagination";
import { showErrorMessage } from "../../../utils/errorMessage";
import useCourses from "../hooks/useCourses";
import { useAppHook } from "../../../shared/hooks/useAppHook";

export default function CoursesPage() {
  const {
    page,
    setPage,
    size,
    setSize,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    courses,
    totalPages,
    isLoading,
    error,
  } = useCourses();

  const { favCoursesIds } = useAppHook();

  console.log("favCoursesIds = " + favCoursesIds);

  return (
    <div className="flex">
      {/* FiltersSidebar */}
      <FiltersSidebar
        setPage={setPage}
        size={size}
        setSize={setSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <main className="flex-1 py-8 ml-8 pr-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Featured Courses
          </h2>
          <div className="flex gap-8">
            {/* Courses Grid */}
            <div className="flex-1">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {isLoading
                  ? Array(size)
                      .fill(0)
                      .map((_, index) => <CourseCardSkeleton key={index} />)
                  : error
                  ? showErrorMessage(error)
                  : courses.map((course: Course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isFav={favCoursesIds?.includes(course.id)}
                      />
                    ))}
              </div>
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                isLoading={isLoading}
                isError={!!error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
