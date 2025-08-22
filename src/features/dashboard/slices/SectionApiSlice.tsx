import { apiSlice } from "../../../shared/slices/apiSlice";

const BASE_URL = "/api";

export const sectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all sections of a module
    getSections: builder.query({
      query: (moduleId) => `${BASE_URL}/sections/modules/${moduleId}`,
      providesTags: ["Section"],
      keepUnusedDataFor: 5,
    }),

    // Get a single section by ID
    getSectionById: builder.query({
      query: (sectionId) =>
        `${BASE_URL}/sections/${sectionId}`,
      providesTags: ["Section"],
      keepUnusedDataFor: 5,
    }),

    // Create a new section
    createSection: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/sections`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),

    // Update a section
    updateSection: builder.mutation({
      query: ({ sectionId, data }) => ({
        url: `${BASE_URL}/sections/${sectionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),

    // Delete a section
    deleteSection: builder.mutation({
      query: ({ moduleId, sectionId }) => ({
        url: `${BASE_URL}/${moduleId}/sections/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Section"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionsApiSlice;
