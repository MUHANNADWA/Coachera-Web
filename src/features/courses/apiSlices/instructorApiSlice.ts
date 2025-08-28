import { apiSlice } from  "../../../shared/slices/apiSlice";

const INSTRUCTOR_URL = "instructors";

export const instructorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all instructors
    getInstructors: builder.query({
      query: () => INSTRUCTOR_URL,
      providesTags: ["Instructor"],
      keepUnusedDataFor: 5,
    }),

    // Create new instructor
    createInstructor: builder.mutation({
      query: (data) => ({
        url: INSTRUCTOR_URL,
        method: "POST",
        body: data, // { "bio": "A Developer specialized in Java dev....." }
      }),
      invalidatesTags: ["Instructor"],
    }),

    // Update instructor
    updateInstructor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${INSTRUCTOR_URL}/${id}`,
        method: "PUT",
        body: data, // { "bio": "Updated bio..." }
      }),
      invalidatesTags: ["Instructor"],
    }),

    // Delete instructor
    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `${INSTRUCTOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Instructor"],
    }),

    // Get instructor details by id
    getInstructorDetails: builder.query({
      query: (id) => `${INSTRUCTOR_URL}/${id}`,
      providesTags: ["Instructor"],
      keepUnusedDataFor: 5,
    }),

    // Get instructor courses
    getInstructorCourses: builder.query({
      query: (instructorId) => `${INSTRUCTOR_URL}/${instructorId}/courses`,
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),

    // Get currently logged-in instructor
    getMe: builder.query({
      query: () => `${INSTRUCTOR_URL}/me`,
      providesTags: ["Instructor"],
      keepUnusedDataFor: 5,
    }),

    // Get all courses (instructors' courses)
    getCourses: builder.query({
      query: () => `${INSTRUCTOR_URL}/courses`,
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),

    // Get specific course by id
    getCourseDetails: builder.query({
      query: (courseId) => `${INSTRUCTOR_URL}/courses/${courseId}`,
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInstructorsQuery,
  useCreateInstructorMutation,
  useUpdateInstructorMutation,
  useDeleteInstructorMutation,
  useGetInstructorDetailsQuery,
  useGetInstructorCoursesQuery,
  useGetMeQuery,
  useGetCoursesQuery,
  useGetCourseDetailsQuery,
} = instructorsApiSlice;
