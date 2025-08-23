// shared/components/CoursesView.tsx
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useRef, useState } from "react";
import useCourses from "../../features/courses/hooks/useCourses";
import CourseCardSkeleton from "../../features/skeletons/CourseCardSkeleton";
import { showErrorMessage } from "../../utils/errorMessage";
import Message from "./Message";
import { Course } from "../types/types";
import CourseCard from "../../features/courses/components/courseCard/CourseCard";
import { Button } from "./form/Button";
import { AddCourseCard, CourseCardWithOverlay } from "./CourseCardOverlay";

type LayoutMode = "carousel" | "grid";

interface CoursesViewProps {
  variant?: "all" | "recommended" | "trending" | "popular" | "org" | "inst";
  orgId?: number;
  instructorId?: number;
  layout?: LayoutMode;
  gridPageSize?: number;
  showLayoutToggle?: boolean;

  // Optional handlers for actions
  onAddCourseClick?: () => void;
  onEditCourse?: (course: Course) => void;
  onDeleteCourse?: (course: Course) => void;
}

export default function CoursesView({
  variant = "all",
  orgId,
  instructorId,
  layout,
  gridPageSize = 8,
  showLayoutToggle = true,
  onAddCourseClick,
  onEditCourse,
  onDeleteCourse,
}: CoursesViewProps) {
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

    orgCourses,
    orgSize,
    setOrgSize,
    orgLoading,
    orgError,

    instCourses,
    instSize,
    setInstSize,
    instLoading,
    instError,
  } = useCourses({ orgId, instructorId });

  // Local layout state if not forced via prop
  const [localLayout, setLocalLayout] = useState<LayoutMode>("carousel");
  const effectiveLayout: LayoutMode = layout ?? localLayout;

  // Horizontal scroll (carousel)
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 298;
    const currentScroll = scrollRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
    scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  type DataPack = {
    title: string;
    list: Course[];
    size: number;
    setSize: (n: number) => void;
    isLoading: boolean;
    error: any;
  };

  let data: DataPack = {
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
    case "org":
      data = {
        title: "Organization Courses",
        list: orgCourses,
        size: orgSize,
        setSize: setOrgSize,
        isLoading: orgLoading,
        error: orgError,
      };
      break;
    case "inst":
      data = {
        title: "Instructor Courses",
        list: instCourses,
        size: instSize,
        setSize: setInstSize,
        isLoading: instLoading,
        error: instError,
      };
      break;
    default:
      break;
  }

  // Grid paging (client-side slice)
  const [gridPage, setGridPage] = useState(1);
  const gridSlice = useMemo(() => {
    const end = gridPage * gridPageSize;
    return data.list.slice(0, end);
  }, [data.list, gridPage, gridPageSize]);

  const canLoadMoreGrid = gridSlice.length < data.list.length;

  // Action mode based on variant
  const overlayMode =
    variant === "org" ? "org" : variant === "inst" ? "inst" : "none";

  // Helpers for overlay actions
  const handleEdit = (c: Course) => onEditCourse?.(c);
  const handleDelete = (c: Course) => onDeleteCourse?.(c);

  // Render one course item with overlay
  const renderCourseItem = (course: Course) => (
    <CourseCardWithOverlay
      key={course.id}
      course={course}
      mode={overlayMode as any}
      onEdit={handleEdit}
      onDelete={handleDelete}
    >
      <CourseCard course={course} />
    </CourseCardWithOverlay>
  );

  // AddCourseCard only for org variant
  const maybeAddCard =
    variant === "org" ? (
      <AddCourseCard onClick={() => onAddCourseClick?.()} />
    ) : null;

  return (
    <section className="flex-1 relative">
      <div className="max-sm:px-4 px-16 py-10">
        <div className="mb-6 flex items-center justify-between max-sm:flex-col max-sm:gap-3">
          <h2 className="text-3xl font-bold text-center sm:text-left dark:text-white">
            {data.title}
          </h2>

          {/* Layout toggle (hidden if layout prop is provided) */}
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

        {/* Loading / Error / Empty */}
        {data.isLoading ? (
          effectiveLayout === "carousel" ? (
            <div className="relative">
              {/* Scroll buttons */}
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
                {Array(data.size)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="snap-start min-w-[300px]">
                      <CourseCardSkeleton />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {variant === "org" && <CourseCardSkeleton />}
              {Array(gridPageSize)
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
            {/* If org and empty, show only AddCourseCard */}
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
            {/* Scroll buttons */}
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
                  {renderCourseItem(course)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {variant === "org" && maybeAddCard}
              {gridSlice.map((course: Course) => renderCourseItem(course))}
            </div>

            {/* Grid "Load more" */}
            {canLoadMoreGrid && (
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setGridPage((p) => p + 1)}
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
