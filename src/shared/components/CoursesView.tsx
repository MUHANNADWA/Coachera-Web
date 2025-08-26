// shared/components/CoursesView.tsx
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useCourses from "../../features/courses/hooks/useCourses";
import CourseCardSkeleton from "../../features/skeletons/CourseCardSkeleton";
import { showErrorMessage } from "../../utils/errorMessage";
import Message from "./Message";
import { Course } from "../types/types";
import CourseCard from "../../features/courses/components/courseCard/CourseCard";
import { Button } from "./form/Button";
import { AddCourseCard } from "./CourseCardOverlay";
import { useNavigate } from "react-router-dom";

type LayoutMode = "carousel" | "grid";

interface CoursesViewProps {
  variant?: "all" | "recommended" | "trending" | "popular" | "org" | "inst";
  orgId?: number;
  instructorId?: number;
  layout?: LayoutMode;
  gridPageSize?: number;
  showLayoutToggle?: boolean;
}

export default function CoursesView({
  variant = "all",
  orgId,
  instructorId,
  layout,
  gridPageSize = 8,
  showLayoutToggle = true,
}: CoursesViewProps) {
  const {
    // all
    courses,
    size,
    setSize,
    isLoading,
    error,
    allTotal,
    allLast,
    // recommended
    recommendedCourses,
    recommendedSize,
    setRecommendedSize,
    recommendedLoading,
    recommendedError,
    recommendedTotal,
    recommendedLast,
    // trending
    trendingCourses,
    trendingSize,
    setTrendingSize,
    trendingLoading,
    trendingError,
    trendingTotal,
    trendingLast,
    // popular
    popularCourses,
    popularSize,
    setPopularSize,
    popularLoading,
    popularError,
    popularTotal,
    popularLast,
    // org
    orgCourses,
    orgSize,
    setOrgSize,
    orgLoading,
    orgError,
    orgTotal,
    orgLast,
    // inst
    instCourses,
    instSize,
    setInstSize,
    instLoading,
    instError,
    instTotal,
    instLast,
  } = useCourses({ orgId, instructorId });

  const [localLayout, setLocalLayout] = useState<LayoutMode>("carousel");
  const effectiveLayout: LayoutMode = layout ?? localLayout;

  const [loadingMore, setLoadingMore] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 298;
    const left =
      scrollRef.current.scrollLeft + (dir === "left" ? -amount : amount);
    scrollRef.current.scrollTo({ left, behavior: "smooth" });
  };

  type DataPack = {
    title: string;
    list: Course[];
    isLoading: boolean;
    error: any;
    total: number;
    last: boolean;
    getSize: () => number;
    setSize: (n: number) => void;
  };

  let data: DataPack = {
    title: "All Courses",
    list: courses,
    isLoading,
    error,
    total: allTotal,
    last: allLast,
    getSize: () => size,
    setSize,
  };

  switch (variant) {
    case "recommended":
      data = {
        title: "Recommended Courses For You",
        list: recommendedCourses,
        isLoading: recommendedLoading,
        error: recommendedError,
        total: recommendedTotal,
        last: recommendedLast,
        getSize: () => recommendedSize,
        setSize: setRecommendedSize,
      };
      break;
    case "trending":
      data = {
        title: "Trending Courses This Month",
        list: trendingCourses,
        isLoading: trendingLoading,
        error: trendingError,
        total: trendingTotal,
        last: trendingLast,
        getSize: () => trendingSize,
        setSize: setTrendingSize,
      };
      break;
    case "popular":
      data = {
        title: "Most Popular Courses",
        list: popularCourses,
        isLoading: popularLoading,
        error: popularError,
        total: popularTotal,
        last: popularLast,
        getSize: () => popularSize,
        setSize: setPopularSize,
      };
      break;
    case "org":
      data = {
        title: "Organization Courses",
        list: orgCourses,
        isLoading: orgLoading,
        error: orgError,
        total: orgTotal,
        last: orgLast,
        getSize: () => orgSize,
        setSize: setOrgSize,
      };
      break;
    case "inst":
      data = {
        title: "Instructor Courses",
        list: instCourses,
        isLoading: instLoading,
        error: instError,
        total: instTotal,
        last: instLast,
        getSize: () => instSize,
        setSize: setInstSize,
      };
      break;
    default:
      break;
  }

  const navigate = useNavigate();

  const maybeAddCard =
    variant === "org" ? (
      <AddCourseCard onClick={() => navigate("/add-course")} />
    ) : null;

  const canLoadMore = data.list.length < data.total && !data.last;

  const onLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      data.setSize(data.getSize() + gridPageSize);
    } finally {
      // keep the visual feedback visible briefly
      setTimeout(() => setLoadingMore(false), 600);
    }
  };

  return (
    <section className="flex-1 relative">
      <div className="max-sm:px-4 px-16 py-10">
        <div className="mb-6 flex items-center justify-between max-sm:flex-col max-sm:gap-3">
          <h2 className="text-3xl font-bold text-center sm:text-left dark:text-white">
            {data.title}
          </h2>

          {showLayoutToggle && !layout && (
            <div className="flex items-center gap-2">
              <Button
                variant={
                  effectiveLayout === "carousel" ? "primary" : "secondary"
                }
                onClick={() => setLocalLayout("carousel")}
                className="flex items-center gap-2"
                aria-pressed={effectiveLayout === "carousel"}
                type="button"
              >
                <ViewColumnsIcon className="w-5 h-5" />
                Carousel
              </Button>
              <Button
                variant={effectiveLayout === "grid" ? "primary" : "secondary"}
                onClick={() => setLocalLayout("grid")}
                className="flex items-center gap-2"
                aria-pressed={effectiveLayout === "grid"}
                type="button"
              >
                <Squares2X2Icon className="w-5 h-5" />
                Grid
              </Button>
            </div>
          )}
        </div>

        {data.isLoading ? (
          effectiveLayout === "carousel" ? (
            <div className="relative">
              <Button
                onClick={() => scroll("left")}
                variant="primaryInverted"
                className="absolute! left-2 top-1/2 z-10 border-2 border-secondary! p-2! max-sm:hidden"
                type="button"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                variant="primaryInverted"
                className="absolute! right-2 top-1/2 z-10 border-2 border-secondary! p-2! max-sm:hidden"
                type="button"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </Button>

              <div
                ref={scrollRef}
                className="p-4 flex overflow-x-auto space-x-4 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {variant === "org" && (
                  <div className="snap-start min-w-[300px]">
                    <CourseCardSkeleton />
                  </div>
                )}
                {Array(data.getSize())
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="snap-start min-w-[300px]">
                      <CourseCardSkeleton />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {variant === "org" && <CourseCardSkeleton />}
              {Array(Math.min(gridPageSize, data.getSize()))
                .fill(0)
                .map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
            </div>
          )
        ) : data.error ? (
          showErrorMessage(data.error)
        ) : data.list.length === 0 ? (
          <div className="min-w-full text-center">
            {variant === "org" ? (
              <div className="flex justify-center">{maybeAddCard}</div>
            ) : (
              <Message variant="info">
                No courses found. Please check back later or try a different
                search.
              </Message>
            )}
          </div>
        ) : effectiveLayout === "carousel" ? (
          <div className="relative">
            <Button
              onClick={() => scroll("left")}
              variant="primaryInverted"
              className="absolute! -left-13 top-1/2 z-10 border-2 border-secondary! p-2! max-sm:hidden"
              type="button"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => scroll("right")}
              variant="primaryInverted"
              className="absolute! -right-13 top-1/2 z-10 border-2 border-secondary! p-2! max-sm:hidden"
              type="button"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </Button>

            <div
              ref={scrollRef}
              className="p-4 flex overflow-x-auto space-x-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {variant === "org" && (
                <div className="snap-start min-w-[300px]">{maybeAddCard}</div>
              )}
              {data.list.map((course: Course) => (
                <div key={course.id} className="snap-start min-w-[300px]">
                  <CourseCard
                    course={course}
                    actionMode={
                      variant === "org"
                        ? "org"
                        : variant === "inst"
                        ? "inst"
                        : "none"
                    }
                  />
                </div>
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-6 flex flex-col items-center gap-4">
                {loadingMore && (
                  <div className="flex gap-4">
                    {Array(gridPageSize)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="min-w-[300px]">
                          <CourseCardSkeleton />
                        </div>
                      ))}
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {variant === "org" && maybeAddCard}
              {data.list.map((course: Course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  actionMode={
                    variant === "org"
                      ? "org"
                      : variant === "inst"
                      ? "inst"
                      : "none"
                  }
                />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-8 flex flex-col items-center gap-4">
                {loadingMore && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {Array(gridPageSize)
                      .fill(0)
                      .map((_, i) => (
                        <CourseCardSkeleton key={i} />
                      ))}
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
