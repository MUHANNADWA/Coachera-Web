import { apiSlice } from "../../../shared/slices/apiSlice";

const QUIZ_URL = "quizzes";

export const quizzesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all quizzes
    getQuizzes: builder.query<any, void>({
      query: () => QUIZ_URL,
      providesTags: ["Quiz"],
      keepUnusedDataFor: 5,
    }),

    // CREATE quiz
    createQuiz: builder.mutation({
      query: (data) => ({
        url: QUIZ_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),

    // DELETE quiz by id
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `${QUIZ_URL}/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),

    // GET quiz details by id
    getQuizDetails: builder.query({
      query: (quizId) => `${QUIZ_URL}/${quizId}`,
      providesTags: ["Quiz"],
      keepUnusedDataFor: 5,
    }),

    // VERIFY quiz answers
    verifyQuiz: builder.mutation({
      query: (data) => ({
        url: `${QUIZ_URL}/verify`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuizzesQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetQuizDetailsQuery,
  useVerifyQuizMutation,
} = quizzesApiSlice;
