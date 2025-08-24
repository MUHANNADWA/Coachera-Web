// features/courses/hooks/useCourses.ts
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

type HookArgs = { orgId?: number | string; instructorId?: number | string };

export default function useCourses({ orgId, instructorId }: HookArgs = {}) {
  const { user } = useAppHook();

  // sizes you can grow to "load more"
  const [size, setSize] = useState(8);
  const [recommendedSize, setRecommendedSize] = useState(8);
  const [trendingSize, setTrendingSize] = useState(8);
  const [popularSize, setPopularSize] = useState(8);
  const [orgSize, setOrgSize] = useState(8);
  const [instSize, setInstSize] = useState(8);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // All
  const { data, isLoading, error } = useGetCoursesQuery({
    page: 0,
    size,
    sortBy,
    sortDirection,
  });
  const courses: Course[] = data?.data?.content ?? [];
  const allTotal = data?.data?.totalElements ?? 0;
  const allLast = data?.data?.last ?? true;

  // Recommended (fix: send size not "recommendedSize")
  const {
    data: recommendedData,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useGetRecommendedCoursesQuery(
    { page: 0, size: recommendedSize, sortBy, sortDirection },
    { skip: !user }
  );
  const recommendedCourses: Course[] = recommendedData?.data?.content ?? [];
  const recommendedTotal = recommendedData?.data?.totalElements ?? 0;
  const recommendedLast = recommendedData?.data?.last ?? true;

  // Trending
  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetTrendingCoursesQuery({
    page: 0,
    size: trendingSize,
    sortBy,
    sortDirection,
  });
  const trendingCourses: Course[] = trendingData?.data?.content ?? [];
  const trendingTotal = trendingData?.data?.totalElements ?? 0;
  const trendingLast = trendingData?.data?.last ?? true;

  // Popular
  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useGetPopularCoursesQuery({
    page: 0,
    size: popularSize,
    sortBy,
    sortDirection,
  });
  const popularCourses: Course[] = popularData?.data?.content ?? [];
  const popularTotal = popularData?.data?.totalElements ?? 0;
  const popularLast = popularData?.data?.last ?? true;

  // Org
  const {
    data: orgData,
    isLoading: orgLoading,
    error: orgError,
  } = useGetOrgCoursesQuery(
    { id: orgId, page: 0, size: orgSize, sortBy, sortDirection },
    { skip: !orgId }
  );
  const orgCourses: Course[] = orgData?.data?.content ?? [];
  const orgTotal = orgData?.data?.totalElements ?? 0;
  const orgLast = orgData?.data?.last ?? true;

  // Inst
  const {
    data: instData,
    isLoading: instLoading,
    error: instError,
  } = useGetInstCoursesQuery(
    { id: instructorId, page: 0, size: instSize, sortBy, sortDirection },
    { skip: !instructorId }
  );
  const instCourses: Course[] = instData?.data?.content ?? [];
  const instTotal = instData?.data?.totalElements ?? 0;
  const instLast = instData?.data?.last ?? true;

  return {
    // sorting (if you want)
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,

    // all
    courses,
    size,
    setSize,
    isLoading,
    error,
    allTotal,
    allLast,

    // recommended
    recommendedCourses,
    recommendedSize,
    setRecommendedSize,
    recommendedLoading,
    recommendedError,
    recommendedTotal,
    recommendedLast,

    // trending
    trendingCourses,
    trendingSize,
    setTrendingSize,
    trendingLoading,
    trendingError,
    trendingTotal,
    trendingLast,

    // popular
    popularCourses,
    popularSize,
    setPopularSize,
    popularLoading,
    popularError,
    popularTotal,
    popularLast,

    // org
    orgCourses,
    orgSize,
    setOrgSize,
    orgLoading,
    orgError,
    orgTotal,
    orgLast,

    // inst
    instCourses,
    instSize,
    setInstSize,
    instLoading,
    instError,
    instTotal,
    instLast,
  };
}
