import { STUDENTS_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: STUDENTS_URL,
      }),
    }),
    getStudent: builder.query({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
      }),
    }),
    createStudent: builder.mutation({
      query: () => ({
        url: `${STUDENTS_URL}`,
        method: "POST",
      }),
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/${data.studentId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        method: "DELETE",
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
} = studentsApiSlice;
