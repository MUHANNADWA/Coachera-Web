import CourseCard from "../components/CourseCard";
import { Course } from "../../../shared/types/types";
import { useGetCoursesQuery } from "../coursesApiSlice";
import CourseCardSkeleton from "../components/CourseCardSkeleton";
import Message from "../../../shared/components/Message";
import { useState } from "react";
import CoursesSidebar from "../components/CoursesSidebar";
import Pagination from "../components/Pagination";

export default function CoursesPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error } = useGetCoursesQuery({
    page,
    size,
    sortBy,
    sortDirection,
  });
  const courses: Course[] = data?.data.content || [];
  const totalPages = data?.data.totalPages || 1;

  return (
    <div className="flex h-full-s overflow-x-hidden">
      {/* CoursesSidebar Filters */}
      <CoursesSidebar
        setPage={setPage}
        size={size}
        setSize={setSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <main className="max-h-full-s overflow-y-auto flex-1 flex flex-col py-8 ml-8 pr-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Featured Courses
          </h2>
          <div className="flex gap-8">
            {/* Courses Grid */}
            <div className="flex-1">
              <div
                className={
                  !error
                    ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
                    : ""
                }>
                {isLoading ? (
                  Array(size)
                    .fill(0)
                    .map((_, index) => <CourseCardSkeleton key={index} />)
                ) : error ? (
                  <Message variant="danger">
                    {(error as any)?.data?.message ??
                      (error as any)?.message ??
                      `An unexpected error occurred`}
                  </Message>
                ) : (
                  courses.map((course: Course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                )}
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
