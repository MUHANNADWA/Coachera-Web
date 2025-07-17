import { MATERIALS_URL, QUIZZES_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/slices/apiSlice";

export const quizzesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesByMaterial: builder.query({
      query: (materialId) => ({
        url: `${MATERIALS_URL}/${materialId}/quizzes`,
      }),
      providesTags: ["Quiz"],
      keepUnusedDataFor: 5,
    }),

    getQuizDetails: builder.query({
      query: ({ materialId, quizId }) => ({
        url: `${MATERIALS_URL}/${materialId}/quizzes/${quizId}`,
      }),
      providesTags: ["Quiz"],
      keepUnusedDataFor: 5,
    }),

    createQuiz: builder.mutation({
      query: (data) => ({
        url: `${MATERIALS_URL}/${data.materialId}/quizzes`,
        method: "POST",
        body: data.quizData,
      }),
      invalidatesTags: ["Quiz"],
    }),

    deleteQuiz: builder.mutation({
      query: ({ materialId, quizId }) => ({
        url: `${MATERIALS_URL}/${materialId}/quizzes/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),

    submitQuiz: builder.mutation({
      query: (submissionData) => ({
        url: `${QUIZZES_URL}/verify`,
        method: "POST",
        body: submissionData,
      }),
    }),
  }),
});

export const {
  useGetQuizzesByMaterialQuery,
  useGetQuizDetailsQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useSubmitQuizMutation,
} = quizzesApiSlice;
