import { Course } from "../../../shared/types/types";
import { useState } from "react";
import {
  useGetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetRecommendedCoursesQuery,
  useGetTrendingCoursesQuery,
} from "../apiSlices/coursesApiSlice";
import { useAppHook } from "../../../shared/hooks/useAppHook";

export default function useCourses() {
  const { user } = useAppHook();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [recommendedSize, setRecommendedSize] = useState(5);
  const [trendingSize, setTrendingSize] = useState(5);
  const [popularSize, setPopularSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error } = useGetCoursesQuery({
    page,
    size,
    sortBy,
    sortDirection,
  });
  const courses: Course[] = data?.data.content || [];

  const {
    data: recommendedData,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useGetRecommendedCoursesQuery(
    {
      page,
      recommendedSize,
      sortBy,
      sortDirection,
    },
    { skip: !user }
  );
  const recommendedCourses: Course[] = recommendedData?.data.content || [];

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetTrendingCoursesQuery({
    page,
    trendingSize,
    sortBy,
    sortDirection,
  });
  const trendingCourses: Course[] = trendingData?.data.content || [];

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useGetPopularCoursesQuery({
    page,
    popularSize,
    sortBy,
    sortDirection,
  });
  const popularCourses: Course[] = popularData?.data.content || [];

  const totalPages = data?.data.totalPages || 1;

  return {
    page,
    setPage,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    totalPages,
    courses,
    size,
    setSize,
    isLoading,
    error,
    recommendedCourses,
    recommendedSize,
    setRecommendedSize,
    recommendedLoading,
    recommendedError,
    trendingCourses,
    trendingSize,
    setTrendingSize,
    trendingLoading,
    trendingError,
    popularCourses,
    popularSize,
    setPopularSize,
    popularLoading,
    popularError,
  };
}
