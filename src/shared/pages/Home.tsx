import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types/types';
import SearchBar from '../components/SearchBar';
import { useGetCoursesQuery } from '../slices/coursesApiSlice';
import Message from '../components/Message';
import { courses } from '../data/sampleData';
import CourseCard from '../../features/courses/components/CourseCard';
import CourseCardSkeleton from '../../features/courses/components/CourseCardSkeleton';

export default function Home() {
  const { data, isLoading, error } = useGetCoursesQuery({});

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-position-[center_top_75rem] bg-[url(https://images.unsplash.com/photo-1742201348078-79d92183839a?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn Without Limits</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start, switch, or advance your career with 5,000+ courses, Professional Certificates, and degrees from world-class universities and companies.
          </p>
          <div className="flex justify-center mb-12">
            <SearchBar />
          </div>
          <Link
            to="/courses"
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
          >
            Browse Courses
          </Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
            isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            ) :
             error ? (
              <>
                <Message variant="danger">An unexpected error occurred </Message>
                {courses.map((course: Course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </>
            ) : (
              <Suspense fallback={Array(3).fill(0).map((_, index) => (<CourseCardSkeleton key={index} />))}>
                {data?.map((course: Course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </Suspense>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}