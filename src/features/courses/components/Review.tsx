import { Review as ReviewType, Student } from "../../../shared/types/types";
import { useGetStudentQuery } from "../../../shared/slices/studentsApiSlice";
import { renderStars } from "../utils/Utils";

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  const { data, isLoading, isError } = useGetStudentQuery(review.studentId);
  const student: Student = data?.data;

  return (
    <div className="p-4 rounded-lg shadow-sm bg-primary-light space-y-2 mb-4">
      {/* Student Info */}
      {isLoading ? (
        <div className="animate-pulse h-6 w-32 bg-gray-200 rounded" />
      ) : isError || !student ? (
        <p className="text-sm text-red-500">Student not found</p>
      ) : (
        <div className="flex items-center gap-3">
          <img
            src={
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt={student.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-medium text-gray-800">
            {student.firstName} {student.lastName}
          </p>
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-1 ml-12">
        {renderStars(review.rating)}
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm ml-12">{review.comment}</p>
    </div>
  );
}
