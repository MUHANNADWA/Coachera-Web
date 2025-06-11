import { MATERIALS_URL } from "../../constants/constants";
import { apiSlice } from "../../shared/slices/apiSlice";

export const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: () => ({
        url: MATERIALS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMaterial: builder.query({
      query: (materialID) => ({
        url: `${MATERIALS_URL}/${materialID}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createMaterial: builder.mutation({
      query: () => ({
        url: `${MATERIALS_URL}`,
        method: "POST",
      }),
    }),
    updateMaterial: builder.mutation({
      query: (data) => ({
        url: `${MATERIALS_URL}/${data.materialId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMaterial: builder.mutation({
      query: (materialId) => ({
        url: `${MATERIALS_URL}/${materialId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApiSlice;
