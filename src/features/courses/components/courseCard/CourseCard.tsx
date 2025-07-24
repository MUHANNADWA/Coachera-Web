import { Course } from "../../../../shared/types/types";
import { placeholderImage, renderStars } from "../../utils/Utils";
import { useAppHook } from "../../../../shared/hooks/useAppHook";
import { FavButton } from "./FavButton";
import { ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../shared/components/form/Button";

interface CourseCardProps {
  course: Course;
  className?: string;
}

export default function CourseCard({ course, className }: CourseCardProps) {
  const { navigate } = useAppHook();

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (course.categories?.[0]) {
      navigate(`/search/${course.categories[0]}`);
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

  return (
    <article
      className={`card group ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View course: ${course.title}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={course.image ?? placeholderImage(course.title)}
          alt={`Course cover for ${course.title}`}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Badge */}
        {course.categories?.[0] && (
          <Button
            onClick={handleCategoryClick}
            className="absolute! top-3 left-3 text-xs font-medium py-1.5! px-3! m-0!"
            variant="primaryInverted"
            aria-label={`Filter by category: ${course.categories[0]}`}
            tabIndex={0}
            type="button"
            onKeyDown={(e) => e.stopPropagation()}
            onClickCapture={(e) => {
              e.stopPropagation();
              handleCategoryClick(e);
            }}>
            {course.categories[0]}
          </Button>
        )}

        {/* Favorite Button */}
        <div className="absolute! top-3 right-3 z-10">
          <span title="Add to favorites">
            <FavButton id={course.id} />
          </span>
        </div>

        {/* Level Badge */}
        <div className="absolute! bottom-3 right-3 z-10">
          <span className="text-xs font-semibold text-white dark:text-dark bg-primary backdrop-blur-sm px-2 py-1 rounded-md">
            {course.level ?? "Beginner"}
          </span>
        </div>
        {/* Free Badge */}
        {course.price === 0 && (
          <div className="absolute! bottom-3 left-3 z-10">
            <span className="text-xs font-bold text-primary bg-white/90 border-2 border-primary/20 px-2 py-1 rounded-md">
              Free
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3
          className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-200"
          title={course.title}>
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <UserIcon className="w-4 h-4" />
          <span
            className="truncate"
            title={course.instructor ?? "Abo Mahmoud Org"}>
            {course.instructor ?? "Abo Mahmoud Org"}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm dark:text-gray-400">
          <ClockIcon className="w-4 h-4" />
          <span>{formatDuration(course.durationHours)}</span>
        </div>

        {/* Description */}
        {course.description && (
          <div
            className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2"
            title={course.description}>
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
          <span className="text-sm text-gray-500">
            ({course.ratingCount ?? 0} reviews)
          </span>
        </div>

        {/* Price & Type */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-primary-dark">
          <div className="text-xl font-bold text-primary">
            {formatPrice(course.price)}
          </div>
          <div className="text-sm text-gray-600">course</div>
        </div>
      </div>
    </article>
  );
}
