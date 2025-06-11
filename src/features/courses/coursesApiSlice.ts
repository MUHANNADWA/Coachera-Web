import {
  COURSES_URL,
  ENROLLMENTS_URL,
  UPLOAD_URL,
} from "../../constants/constants";
import { apiSlice } from "../../shared/slices/apiSlice";

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
      keepUnusedDataFor: 5,
    }),
    getCourseDetails: builder.query({
      query: (courseID) => ({
        url: `${COURSES_URL}/${courseID}`,
      }),
      keepUnusedDataFor: 5,
    }),
    enrollCourse: builder.mutation({
      query: (courseID) => ({
        url: `${ENROLLMENTS_URL}/student/${courseID}`,
        method: "POST",
      }),
    }),
    unEnrollCourse: builder.mutation({
      query: (courseID) => ({
        url: `${ENROLLMENTS_URL}delete/${courseID}/student`,
        method: "DELETE",
      }),
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
  useGetCourseDetailsQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useUploadCourseImageMutation,
  useDeleteCourseMutation,
  useCreateReviewMutation,
  useGetTopCoursesQuery,
  useEnrollCourseMutation,
  useUnEnrollCourseMutation,
} = coursesApiSlice;
