import { Course } from "../../../shared/types/types";
import { useState } from "react";
import {
  useGetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetRecommendedCoursesQuery,
  useGetTrendingCoursesQuery,
  useGetOrgCoursesQuery,
  useGetInstCoursesQuery,
} from "../apiSlices/coursesApiSlice";
import { useAppHook } from "../../../shared/hooks/useAppHook";

type Params = {
  orgId?: number | string;
  instructorId?: number | string;
};

export default function useCourses({ orgId, instructorId }: Params = {}) {
  const { user } = useAppHook();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [recommendedSize, setRecommendedSize] = useState(5);
  const [trendingSize, setTrendingSize] = useState(5);
  const [popularSize, setPopularSize] = useState(5);
  const [orgSize, setOrgSize] = useState(5);
  const [instSize, setInstSize] = useState(5);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // All
  const { data, isLoading, error } = useGetCoursesQuery({
    page,
    size,
    sortBy,
    sortDirection,
  });
  const courses: Course[] = data?.data?.content || [];

  // Recommended (skip when user is not available)
  const {
    data: recommendedData,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useGetRecommendedCoursesQuery(
    {
      page,
      size: recommendedSize, // FIX: must be "size"
      sortBy,
      sortDirection,
    },
    { skip: !user }
  );
  const recommendedCourses: Course[] = recommendedData?.data?.content || [];

  // Trending
  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetTrendingCoursesQuery({
    page,
    size: trendingSize, // FIX
    sortBy,
    sortDirection,
  });
  const trendingCourses: Course[] = trendingData?.data?.content || [];

  // Popular
  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useGetPopularCoursesQuery({
    page,
    size: popularSize, // FIX
    sortBy,
    sortDirection,
  });
  const popularCourses: Course[] = popularData?.data?.content || [];

  // Organization
  const {
    data: orgData,
    isLoading: orgLoading,
    error: orgError,
  } = useGetOrgCoursesQuery(
    {
      id: orgId,
      page,
      size: orgSize,
      sortBy,
      sortDirection,
    },
    { skip: !orgId }
  );
  const orgCourses: Course[] = orgData?.data?.content || [];

  // Instructor
  const {
    data: instData,
    isLoading: instLoading,
    error: instError,
  } = useGetInstCoursesQuery(
    {
      id: instructorId,
      page,
      size: instSize,
      sortBy,
      sortDirection,
    },
    { skip: !instructorId }
  );
  const instCourses: Course[] = instData?.data?.content || [];

  const totalPages = data?.data?.totalPages || 1;

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

    orgCourses,
    orgSize,
    setOrgSize,
    orgLoading,
    orgError,

    instCourses,
    instSize,
    setInstSize,
    instLoading,
    instError,
  };
}
