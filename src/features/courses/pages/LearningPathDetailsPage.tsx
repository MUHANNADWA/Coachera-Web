import { useParams } from "react-router-dom";
import { useGetLearningPathCoursesDtoQuery } from "../api/learningPathApiSlice";
import Message from "../../../shared/components/Message";
import CourseCard from "../components/courseCard/CourseCard";
import { Button } from "../../../shared/components/form/Button";

export default function LearningPathDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetLearningPathCoursesDtoQuery(id);
  const lp = data?.data;
  const coursesWithOrder = lp?.coursesWithOrder ?? [];

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      {isLoading ? (
        <div className="text-center py-20">Loading...</div>
      ) : error ? (
        <Message variant="danger">
          Failed to load learning path.
          <Button variant="secondary" onClick={() => refetch()} className="ml-4">Retry</Button>
        </Message>
      ) : !lp ? (
        <Message variant="info">Learning path not found.</Message>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start">
            <img
              src={lp.imageUrl || `https://placehold.co/800?text=${lp.title}`}
              alt={lp.title}
              className="w-full max-w-xs h-56 object-cover rounded-2xl shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 dark:text-white">{lp.title}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{lp.description}</p>
              {/* Add more info if needed */}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Courses in this Path</h2>
          {coursesWithOrder.length === 0 ? (
            <Message variant="info">No courses found in this learning path.</Message>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...coursesWithOrder]
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map(({ course }) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
