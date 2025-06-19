import { useState } from "react";
import {
  Course,
  Skill,
  // LearningPath,
  // Material,
  // Question,
  // Category,
  // Quiz,
  // Section,
  // Review,
  // Certificate,
  // Student,
  // Instructor,
} from "../types/types";
import { useParams } from "react-router-dom";
import { useSearchQuery } from "../slices/searchApiSlice";
import FiltersSidebar from "../../features/courses/components/FiltersSidebar";
import CourseCardSkeleton from "../../features/courses/components/CourseCardSkeleton";
import Message from "../components/Message";
import CourseCard from "../../features/courses/components/CourseCard";
import Pagination from "../../features/courses/components/Pagination";
import Skills from "../components/Skills";
import { showErrorMessage } from "../../utils/errorMessage";

export default function SearchPage() {
  const { query: searchTerm } = useParams();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [entityType, setEntityType] = useState("courses");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error } = useSearchQuery({
    data: {
      page,
      size,
      sortBy,
      sortDirection,
      searchTerm,
    },
    entityType,
  });

  const results = data?.data.content || [];
  const totalPages = data?.data.totalPages || 1;

  return (
    <div className="flex h-full-s overflow-x-hidden">
      <FiltersSidebar
        setPage={setPage}
        size={size}
        setSize={setSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        entityType={entityType}
        setEntityType={setEntityType}
      />

      <main className="max-h-full-s overflow-y-auto flex-1 flex flex-col py-8 ml-8 pr-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Search Results for "{searchTerm}"
          </h2>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  Array(size)
                    .fill(0)
                    .map((_, index) => <CourseCardSkeleton key={index} />)
                ) : error ? (
                  showErrorMessage(error)
                ) : results.length === 0 ? (
                  <Message variant="info">
                    No {entityType} found matching your search
                  </Message>
                ) : (
                  renderResults(results, entityType)
                )}
              </div>

              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                isLoading={isLoading}
                isError={!!error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const renderResults = (results: any[], entityType: string) => {
  switch (entityType) {
    case "courses":
      return (results as Course[]).map((course) => (
        <CourseCard key={course.id} course={course} />
      ));
    case "skills":
      return <Skills skills={results as Skill[]} />;
    default:
      return (
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              {Object.keys(results[0] || {}).map((key) => (
                <th key={key} className="border px-4 py-2 capitalize">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className="border">
                {Object.values(item).map((value, idx) => (
                  <td key={idx} className="border px-4 py-2">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : value?.toString() ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
};
