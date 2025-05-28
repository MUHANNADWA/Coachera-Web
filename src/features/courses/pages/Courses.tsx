import CourseCard from '../components/CourseCard'
import { Course } from '../../../shared/types/types'
import { useGetCoursesQuery } from '../../../shared/slices/coursesApiSlice';
import CourseCardSkeleton from '../components/CourseCardSkeleton';
import Message from '../../../shared/components/Message';
import { courses } from '../../../shared/data/sampleData';

export default function Courses() {

  const { data, isLoading, isError } = useGetCoursesQuery({});

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Courses</h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          ) : isError ? (
            <>
              <Message variant="danger">An unexpected error occurred </Message>
              {courses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </>
          ) : (
            data?.data.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}