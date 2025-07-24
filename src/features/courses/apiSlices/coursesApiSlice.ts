import {
  COURSES_URL,
  ENROLLMENTS_URL,
  UPLOAD_URL,
} from "../../../constants/constants";
import { apiSlice } from "../../../shared/slices/apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: ({
        page = 0,
        size = 10,
        sortBy = "id",
        sortDirection = "desc",
      }) => ({
        url: COURSES_URL,
        params: { page, size, sortBy, sortDirection },
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    getRecommendedCourses: builder.query({
      query: ({
        page = 0,
        size = 10,
        sortBy = "id",
        sortDirection = "desc",
      }) => ({
        url: `${COURSES_URL}/recommended`,
        params: { page, size, sortBy, sortDirection },
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    getTrendingCourses: builder.query({
      query: ({
        page = 0,
        size = 10,
        sortBy = "id",
        sortDirection = "desc",
      }) => ({
        url: `${COURSES_URL}/trending`,
        params: { page, size, sortBy, sortDirection },
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    getPopularCourses: builder.query({
      query: ({
        page = 0,
        size = 10,
        sortBy = "id",
        sortDirection = "desc",
      }) => ({
        url: `${COURSES_URL}/popular`,
        params: { page, size, sortBy, sortDirection },
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    getCourseDetails: builder.query({
      query: (courseID) => ({
        url: `${COURSES_URL}/${courseID}`,
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    getEnrolledCourses: builder.query({
      query: () => `${ENROLLMENTS_URL}/student`,
      providesTags: ["Enrollments"],
    }),
    enrollCourse: builder.mutation({
      query: (courseId: number) => ({
        url: `${ENROLLMENTS_URL}/student/${courseId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Enrollments"],
    }),

    unEnrollCourse: builder.mutation({
      query: (courseId: number) => ({
        url: `${ENROLLMENTS_URL}/delete/${courseId}/student`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enrollments"],
    }),
    createCourse: builder.mutation({
      query: () => ({
        url: `${COURSES_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    uploadCourseImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    getTopCourses: builder.query({
      query: () => `${COURSES_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetRecommendedCoursesQuery,
  useGetTrendingCoursesQuery,
  useGetPopularCoursesQuery,
  useGetCourseDetailsQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useUploadCourseImageMutation,
  useDeleteCourseMutation,
  useCreateReviewMutation,
  useGetTopCoursesQuery,
  useGetEnrolledCoursesQuery,
  useEnrollCourseMutation,
  useUnEnrollCourseMutation,
} = coursesApiSlice;
