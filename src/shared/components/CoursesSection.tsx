import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import useCourses from "../../features/courses/hooks/useCourses";
import CourseCardSkeleton from "../../features/skeletons/CourseCardSkeleton";
import { showErrorMessage } from "../../utils/errorMessage";
import Message from "./Message";
import { Course } from "../types/types";
import CourseCard from "../../features/courses/components/courseCard/CourseCard";
import { Button } from "./Button";

export default function CoursesSection() {
  const { size, courses, isLoading, error } = useCourses();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="flex-1 relative">
      <div className="px-16 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Recommended Courses
        </h2>

        {/* Scroll buttons */}
        <Button
          onClick={() => scroll("left")}
          variant="primaryInverted"
          className="absolute left-2 top-1/2 z-10 border border-secondary! p-2!">
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => scroll("right")}
          variant="primaryInverted"
          className="absolute right-2 top-1/2 z-10 border border-secondary! p-2!">
          <ChevronRightIcon className="w-6 h-6" />
        </Button>

        <div
          ref={scrollRef}
          className="p-4 flex overflow-x-auto space-x-6 snap-x snap-mandatory scroll-smooth px-2"
          style={{ scrollbarWidth: "none" }}>
          {isLoading ? (
            Array(size)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="snap-start min-w-[300px]">
                  <CourseCardSkeleton />
                </div>
              ))
          ) : error ? (
            showErrorMessage(error)
          ) : courses.length === 0 ? (
            <div className="min-w-full text-center">
              <Message variant="info">
                No courses found. Please check back later or try a different
                search.
              </Message>
            </div>
          ) : (
            courses.map((course: Course) => (
              <div key={course.id} className="snap-start min-w-[300px]">
                <CourseCard course={course} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
