import { apiSlice } from "../../../shared/slices/apiSlice";

export const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all materials in a section
    getMaterials: builder.query({
      query: (sectionId) => `materials/sections/${sectionId}`,
      providesTags: ["Material"],
      keepUnusedDataFor: 5,
    }),

    // Get single material by materialId
    getMaterial: builder.query({
      query: (materialId) => `materials/${materialId}`,
      providesTags: ["Material"],
      keepUnusedDataFor: 5,
    }),

    // Create new material
    createMaterial: builder.mutation({
      query: (data) => ({
        url: `materials`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Material"],
    }),

    // Update material
    updateMaterial: builder.mutation({
      query: ({ materialId, data }) => ({
        url: `materials/${materialId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Material"],
    }),

    // Delete material
    deleteMaterial: builder.mutation({
      query: (materialId) => ({
        url: `materials/${materialId}`,
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
