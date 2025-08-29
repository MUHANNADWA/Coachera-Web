// features/courses/components/courseCard/CourseCard.tsx
import { Course } from "../../../../shared/types/types";
import { renderStars } from "../../utils/Utils";
import { useAppHook } from "../../../../shared/hooks/useAppHook";
import { FavButton } from "./FavButton";
import {
  ClockIcon,
  UserIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../../../shared/components/form/Button";
import Modal from "../../../../shared/components/Modal"; // <-- adjust path if needed
import { useState } from "react";
import { useDeleteCourseMutation } from "../../api/coursesApiSlice";

interface CourseCardProps {
  course: Course;
  className?: string;
  actionMode?: "none" | "org" | "inst";
}

export default function CourseCard({
  course,
  className,
  actionMode = "none",
}: CourseCardProps) {
  const { navigate } = useAppHook();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteCourse] = useDeleteCourseMutation();

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const category = course.categories?.[0];
    const name = typeof category === "string" ? category : category?.name;

    if (name) {
      navigate(`/search/${encodeURIComponent(name)}?type=categories`);
    }
  };

  const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === null) return "$0";
    return price === 0 ? "Free" : `$${price.toFixed(2)}`;
  };

  const formatDuration = (duration: string | undefined): string => {
    if (!duration) return "Duration not specified";
    return duration;
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // async confirm delete
  const onConfirmDelete = async () => {
    await deleteCourse(course.id).unwrap();
  };

  return (
    <article
      className={`card group ${className ?? ""}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View course: ${course.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={`Course cover for ${course.title}`}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Badge */}
        {course.categories?.[0] && (
          <Button
            className="absolute! top-3 left-3 text-xs font-medium py-1.5! px-3! m-0!"
            variant="primaryInverted"
            tabIndex={0}
            type="button"
            onClick={handleCategoryClick}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {typeof course.categories[0] === "string"
              ? (course.categories[0] as unknown as string)
              : course.categories[0]?.name}
          </Button>
        )}

        {/* Top-right action */}
        <div className="absolute! top-3 right-3 z-10" onClick={stop}>
          {actionMode === "org" ? (
            <Button
              type="button"
              variant="dangerInverted"
              className="relative m-0! p-2! rounded-full!"
              aria-label="Delete course"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
          ) : actionMode === "inst" ? (
            <Button
              type="button"
              variant="primaryInverted"
              className="relative m-0! p-2! rounded-full!"
              aria-label="Edit course"
              onClick={() =>
                navigate(`/edit-course`, { state: { courseId: course.id } })
              }
            >
              <PencilSquareIcon className="w-5 h-5" />
            </Button>
          ) : (
            <FavButton course={course} />
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute! bottom-3 right-3 z-10">
          <span className="text-xs font-semibold text-white dark:text-dark bg-primary backdrop-blur-sm px-2 py-1 rounded-md">
            {course.level ?? "Beginner"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3
          className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-200"
          title={course.title}
        >
          {course.title}
        </h3>

        {/* Instructor/Org */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <UserIcon className="w-4 h-4" />
          <span className="truncate" title={course.orgTitle ?? "Organization"}>
            {course.orgTitle ?? "Organization"}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ClockIcon className="w-4 h-4" />
          <span>{formatDuration(course.durationHours)}</span>
        </div>

        {/* Description */}
        {course.description && (
          <div
            className="text-gray-800 dark:text-gray-300 text-sm line-clamp-2"
            title={course.description}
          >
            {course.description}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold not-dark:text-gray-900">
              {course.rating?.toFixed(1) ?? "0.0"}
            </span>
            <div className="flex gap-0.5">
              {renderStars(course.rating ?? 0)}
            </div>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({course.ratingCount ?? 0} reviews)
          </span>
        </div>

        {/* Price & Type */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-primary-dark">
          <div className="text-xl font-bold text-primary">
            {formatPrice(course.price)}
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-300">course</div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        variant="confirm"
        title="Delete course?"
        message={`Are you sure you want to delete "${course.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonVariant="danger"
        onConfirm={() => {
          stop;
          onConfirmDelete();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </article>
  );
}
