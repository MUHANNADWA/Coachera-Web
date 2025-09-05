import { useGetLearningPathsQuery } from "../../features/courses/api/learningPathApiSlice";
import LearningPathCard from "../../features/courses/components/courseCard/LearningPathCard";
import Message from "./Message";
import { Button } from "./form/Button";

export default function LearningPathsView({
  title = "Learning Paths",
  className = "",
  gridPageSize = 4,
}) {
  const { data, isLoading, error, refetch } = useGetLearningPathsQuery({
    page: 0,
    size: gridPageSize,
    sortBy: "id",
    sortDirection: "desc",
  });
  const learningPaths = data?.data?.content ?? [];

  return (
    <section className={`flex-1 relative ${className}`}>
      <div className="max-sm:px-4 py-10">
        <div className="mb-6 flex items-center justify-between max-sm:flex-col max-sm:gap-3">
          <h2 className="text-3xl font-bold text-center sm:text-left dark:text-white">
            {title}
          </h2>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(gridPageSize)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="min-w-[300px]">
                  <div className="animate-pulse h-72 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
              ))}
          </div>
        ) : error ? (
          <Message variant="danger">
            Failed to load learning paths.
            <Button variant="secondary" onClick={() => refetch()} className="ml-4">Retry</Button>
          </Message>
        ) : learningPaths.length === 0 ? (
          <Message variant="info">No learning paths found.</Message>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {learningPaths.map((lp) => (
              <LearningPathCard key={lp.id} learningPath={lp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
