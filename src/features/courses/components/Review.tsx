import { Review as ReviewType, Student } from "../../../shared/types/types";
import { useGetStudentQuery } from "../../../shared/slices/studentsApiSlice";
import { renderStars } from "../utils/Utils";
import { PROFILE_IMAGE } from "../../../constants/constants";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

interface ReviewProps {
  review: ReviewType;
}

function timeAgoFrom(dateStr: string) {
  const createdAt = new Date(dateStr);
  const diff = Date.now() - createdAt.getTime();
  const m = Math.floor(diff / (1000 * 60));
  const h = Math.floor(diff / (1000 * 60 * 60));
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (d > 0) return `${d} day${d > 1 ? "s" : ""} ago`;
  if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
  if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
  return "Just now";
}

export default function Review({ review }: ReviewProps) {
  const { data, isLoading, isError } = useGetStudentQuery(review.studentId);
  const student: Student | undefined = data?.data;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <div className="flex items-start gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="rounded-2xl border border-red-200/60 bg-red-50 p-4">
        <p className="text-red-700 font-medium">Student not found</p>
        <p className="text-red-600/80 text-sm">
          Unable to load student information
        </p>
      </div>
    );
  }

  const createdAt = new Date(review.createdAt);
  const fullDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt);

  return (
    <article className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      {/* Header: Avatar + Name + Meta */}
      <header className="flex items-start gap-3">
        <div className="relative">
          <img
            src={PROFILE_IMAGE}
            alt={`${student.firstName} ${student.lastName}`}
            className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-100 dark:ring-gray-800"
          />
          <span
            className="absolute -bottom-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white"
            title="Verified"
          >
            <CheckBadgeIcon className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h4 className="font-semibold leading-none">
              {student.firstName} {student.lastName}
            </h4>
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {renderStars(review.rating)}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {review.rating}.0
              </span>
            </div>
            <span>·</span>
            <time dateTime={createdAt.toISOString()} title={fullDate}>
              {timeAgoFrom(review.createdAt)}
            </time>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mt-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          “{review.comment}”
        </p>
      </section>

      {/* Footer: Meta + Actions */}
      <footer className="mt-4 flex items-center justify-end pt-2 border-gray-100 dark:border-gray-800">
        <div className="text-sm text-gray-500 text-right">
          <time dateTime={createdAt.toISOString()}>{fullDate}</time>
        </div>
      </footer>
    </article>
  );
}
