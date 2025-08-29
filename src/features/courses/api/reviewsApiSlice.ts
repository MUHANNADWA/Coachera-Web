import { REVIEWS_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseReviews: builder.query({
      query: (courseId) => ({
        url: `${REVIEWS_URL}/course/${courseId}`,
      }),
    }),
    getReview: builder.query({
      query: (reviewId) => ({
        url: `${REVIEWS_URL}/${reviewId}`,
      }),
    }),
    createReview: builder.mutation({
      query: () => ({
        url: `${REVIEWS_URL}`,
        method: "POST",
      }),
    }),
    updateReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/${data.reviewId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `${REVIEWS_URL}/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCourseReviewsQuery,
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApiSlice;
