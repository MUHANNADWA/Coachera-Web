import { Review as ReviewType, Student } from "../../../shared/types/types";
import { useGetStudentQuery } from "../../../shared/slices/studentsApiSlice";
import { renderStars } from "../utils/Utils";
import { PROFILE_IMAGE } from "../../../constants/constants";

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

  return (
    <div className="p-4 rounded-lg bg-gray-50 mb-4 border border-gray-300">
      {/* Student Info */}
      {isLoading ? (
        <div className="animate-pulse h-6 w-32 bg-gray-200 rounded" />
      ) : isError || !student ? (
        <p className="text-sm text-red-500">Student not found</p>
      ) : (
        <div className=" flex">
          <img
            src={PROFILE_IMAGE}
            alt={student.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <section className="ml-4">
            {/* Name */}
            <p className="font-semibold text-gray-800">
              {student.firstName} {student.lastName}
            </p>
            {/* Rating */}
            <div className="flex items-center gap-1">
              {renderStars(review.rating)}
              <span className="text-gray-500 text-sm">{date}</span>
            </div>

            {/* Comment */}
            <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
          </section>
        </div>
      )}
    </div>
  );
}
