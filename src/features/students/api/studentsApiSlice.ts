import { STUDENTS_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/students with pagination/sorting
    getStudents: builder.query({
      query: (params) => ({
        url: STUDENTS_URL,
        method: "GET",
        body: params, // e.g., { page: 0, size: 10, sortBy: "id", sortDirection: "desc" }
      }),
    }),

    // GET /api/students/{id}
    getStudent: builder.query({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        method: "GET",
      }),
    }),

    // POST /api/students
    createStudent: builder.mutation({
      query: (studentData) => ({
        url: STUDENTS_URL,
        method: "POST",
        body: studentData,
      }),
    }),

    // PUT /api/students
    updateStudent: builder.mutation({
      query: (studentData) => ({
        url: STUDENTS_URL,
        method: "PUT",
        body: studentData,
      }),
    }),

    // DELETE /api/students/{id}
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        method: "DELETE",
      }),
    }),

    // GET /api/students/me
    getMe: builder.query({
      query: () => ({
        url: `${STUDENTS_URL}/me`,
        method: "GET",
      }),
    }),

    // GET /api/students/me/courses with pagination
    getMyCourses: builder.query({
      query: (params) => ({
        url: `${STUDENTS_URL}/me/courses`,
        method: "GET",
        body: params, // same as getStudents params
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetMeQuery,
  useGetMyCoursesQuery,
} = studentsApiSlice;
