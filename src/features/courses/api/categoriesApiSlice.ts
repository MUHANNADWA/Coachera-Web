import { CATEGORIES_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({
        page = 0,
        size = 10,
        sortBy = "id",
        sortDirection = "desc",
      }) => ({
        url: CATEGORIES_URL,
        params: { page, size, sortBy, sortDirection },
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    getCategoryDetails: builder.query({
      query: (categoryId: number | string) => `${CATEGORIES_URL}/${categoryId}`,
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    createCategory: builder.mutation({
      query: (data: unknown) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: (data: any) => ({
        url: `${CATEGORIES_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId: number | string) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
