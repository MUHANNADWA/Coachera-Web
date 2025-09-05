import { LearningPath } from "../../../../shared/types/types";
import { renderStars } from "../../utils/Utils";
import { useAppHook } from "../../../../shared/hooks/useAppHook";
import { ClockIcon, UserIcon } from "@heroicons/react/24/outline";

interface LearningPathCardProps {
  learningPath: LearningPath;
  className?: string;
}

export default function LearningPathCard({
  learningPath,
  className,
}: LearningPathCardProps) {
  const { navigate } = useAppHook();

  const handleCardClick = () => {
    navigate(`/learningPaths/${learningPath.id}`);
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
      className={`card group ${className} drop-shadow-[3px_3px_0px_#e1e1e1ee,4px_4px_0px_#b1b1b1ee] dark:drop-shadow-[3px_3px_0px_var(--color-primary-dark),4px_4px_0px_var(--color-primary-darkest)]`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View learningPath: ${learningPath.title}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={
            learningPath.imageUrl ||
            `https://placehold.co/800?text=${learningPath.title}`
          }
          alt={`LearningPath cover for ${learningPath.title}`}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Level Badge */}
        <div className="absolute! bottom-3 right-3 z-10">
          <span className="text-xs font-semibold text-white dark:text-dark bg-primary backdrop-blur-sm px-2 py-1 rounded-md">
            {learningPath.level ?? "Beginner"}
          </span>
        </div>
        {/* Free Badge */}
        {learningPath.price === 0 && (
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
          title={learningPath.title}
        >
          {learningPath.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <UserIcon className="w-4 h-4" />
          <span
            className="truncate"
            title={learningPath.level ?? "Abo Mahmoud Org"}
          >
            {learningPath.level ?? "Abo Mahmoud Org"}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm dark:text-gray-400">
          <ClockIcon className="w-4 h-4" />
          <span>{formatDuration(learningPath.duration)}</span>
        </div>

        {/* Description */}
        {learningPath.description && (
          <div
            className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2"
            title={learningPath.description}
          >
            {learningPath.description}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold not-dark:text-gray-900">
              {learningPath.rating?.toFixed(1) ?? "0.0"}
            </span>
            <div className="flex gap-0.5">
              {renderStars(learningPath.rating ?? 0)}
            </div>
          </div>
          <span className="text-sm text-gray-500">
            ({learningPath.ratingCount ?? 0} reviews)
          </span>
        </div>

        {/* Price & Type */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-primary-dark">
          <div className="text-xl font-bold text-primary">
            {formatPrice(learningPath.price)}
          </div>
          <div className="text-sm text-gray-600">Learning Path</div>
        </div>
      </div>
    </article>
  );
}
