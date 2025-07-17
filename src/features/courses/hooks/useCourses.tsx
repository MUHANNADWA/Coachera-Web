import { Course } from "../../../shared/types/types";
import { useState } from "react";
import { useGetCoursesQuery } from "../apiSlices/coursesApiSlice";

export default function useCourses() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error } = useGetCoursesQuery({
    page,
    size,
    sortBy,
    sortDirection,
  });
  const courses: Course[] = data?.data.content || [];
  const totalPages = data?.data.totalPages || 1;

  return {
    page,
    setPage,
    size,
    setSize,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    courses,
    totalPages,
    isLoading,
    error,
  };
}
