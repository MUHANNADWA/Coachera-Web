import { Review as ReviewType, Student } from "../../../shared/types/types";
import { useGetStudentQuery } from "../../../shared/slices/studentsApiSlice";
import { renderStars } from "../utils/Utils";
import { PROFILE_IMAGE } from "../../../constants/constants";
import { StarIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  const { data, isLoading, isError } = useGetStudentQuery(review.studentId);
  const student: Student = data?.data;

  const createdAt = new Date(review.createdAt);
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt);

  // Calculate time ago
  const timeAgo = (() => {
    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInDays > 0)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    if (diffInHours > 0)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInMinutes > 0)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
  })();

  return (
    <div className="consect p-6">
      {/* Student Info */}
      {isLoading ? (
        <div className="animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      ) : isError || !student ? (
        <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-xl border-2 border-red-200">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-danger text-sm font-semibold">!</span>
          </div>
          <div>
            <p className="text-red-700 font-medium">Student not found</p>
            <p className="text-danger text-sm">
              Unable to load student information
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={PROFILE_IMAGE}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <CheckBadgeIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">
                    {student.firstName} {student.lastName}
                  </h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Verified Student
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{timeAgo}</span>
                </div>
              </div>
            </div>

            {/* Rating badge */}
            <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-700">
                {review.rating}.0
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div className="pl-15">
            <div className="bg-gray-50 dark:bg-primary-dark rounded-xl p-4 border-l-4 border-primary">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{review.comment}"
              </p>
            </div>

            {/* Review metadata */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span>Helpful review</span>
                </span>
                <span>•</span>
                <span>{date}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary transition-colors">
                  <span>
                    <HandThumbUpIcon className="w-5 h-5" />
                  </span>
                  <span>Helpful</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary transition-colors">
                  <span>
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                  </span>
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
