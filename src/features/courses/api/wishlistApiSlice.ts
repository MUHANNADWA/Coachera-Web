import { WISHLIST_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => `${WISHLIST_URL}/student`,
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (courseId: number) => ({
        url: `${WISHLIST_URL}/${courseId}/student`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (courseId: number) => ({
        url: `${WISHLIST_URL}/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApiSlice;
