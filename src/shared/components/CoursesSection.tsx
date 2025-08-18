import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import useCourses from "../../features/courses/hooks/useCourses";
import CourseCardSkeleton from "../../features/skeletons/CourseCardSkeleton";
import { showErrorMessage } from "../../utils/errorMessage";
import Message from "./Message";
import { Course } from "../types/types";
import CourseCard from "../../features/courses/components/courseCard/CourseCard";
import { Button } from "./form/Button";

interface CoursesSectionProps {
  variant?: "all" | "recommended" | "trending" | "popular";
}

export default function CoursesSection({
  variant = "all",
}: CoursesSectionProps) {
  const {
    courses,
    size,
    setSize,
    isLoading,
    error,
    recommendedCourses,
    recommendedSize,
    setRecommendedSize,
    recommendedLoading,
    recommendedError,
    trendingCourses,
    trendingSize,
    setTrendingSize,
    trendingLoading,
    trendingError,
    popularCourses,
    popularSize,
    setPopularSize,
    popularLoading,
    popularError,
  } = useCourses();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 298;
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  let data = {
    title: "All Courses",
    list: courses,
    size,
    setSize,
    isLoading,
    error,
  };

  switch (variant) {
    case "recommended":
      data = {
        title: "Recommended Courses For You",
        list: recommendedCourses,
        size: recommendedSize,
        setSize: setRecommendedSize,
        isLoading: recommendedLoading,
        error: recommendedError,
      };
      break;
    case "trending":
      data = {
        title: "Trending Courses This Month",
        list: trendingCourses,
        size: trendingSize,
        setSize: setTrendingSize,
        isLoading: trendingLoading,
        error: trendingError,
      };
      break;
    case "popular":
      data = {
        title: "Most Popular Courses",
        list: popularCourses,
        size: popularSize,
        setSize: setPopularSize,
        isLoading: popularLoading,
        error: popularError,
      };
      break;
    default:
      break;
  }

  return (
    <section className="flex-1 relative">
      <div className="px-16 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
          {data.title}
        </h2>

        {/* Scroll buttons */}
        <Button
          onClick={() => scroll("left")}
          variant="primaryInverted"
          className="absolute! left-2 top-1/2 z-10 border-2 border-secondary! p-2!"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => scroll("right")}
          variant="primaryInverted"
          className="absolute! right-2 top-1/2 z-10 border-2 border-secondary! p-2!"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>

        <div
          ref={scrollRef}
          className="p-4 flex overflow-x-auto space-x-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {data.isLoading ? (
            Array(data.size)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="snap-center min-w-[300px]">
                  <CourseCardSkeleton />
                </div>
              ))
          ) : data.error ? (
            showErrorMessage(data.error)
          ) : data.list.length === 0 ? (
            <div className="min-w-full text-center">
              <Message variant="info">
                No courses found. Please check back later or try a different
                search.
              </Message>
            </div>
          ) : (
            data.list.map((course: Course) => (
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
