import { apiSlice } from "../../../shared/slices/apiSlice";

const BASE_URL = "/api";

export const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all materials in a section
    getMaterials: builder.query({
      query: (sectionId) => `${BASE_URL}/materials`,
      providesTags: ["Material"],
      keepUnusedDataFor: 5,
    }),

    // Get single material by materialId
    getMaterial: builder.query({
      query: (materialId ) =>
        `${BASE_URL}/materials/${materialId}`,
      providesTags: ["Material"],
      keepUnusedDataFor: 5,
    }),

    // Create new material
    createMaterial: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/materials`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Material"],
    }),

    // Update material
    updateMaterial: builder.mutation({
      query: ({materialId, data }) => ({
        url: `${BASE_URL}/materials/${materialId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Material"],
    }),

    // Delete material
    deleteMaterial: builder.mutation({
      query: (materialId) => ({
        url: `${BASE_URL}/materials/${materialId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Material"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApiSlice;
