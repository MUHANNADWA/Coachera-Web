import { apiSlice } from "../../../shared/slices/apiSlice";

export const sectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all sections of a module
    getSections: builder.query({
      query: (moduleId) => `sections/modules/${moduleId}`,
      providesTags: ["Section"],
      keepUnusedDataFor: 5,
    }),

    // Get a single section by ID
    getSectionById: builder.query({
      query: (sectionId) =>
        `sections/${sectionId}`,
      providesTags: ["Section"],
      keepUnusedDataFor: 5,
    }),

    // Create a new section
    createSection: builder.mutation({
      query: (data) => ({
        url: `sections`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),

    // Update a section
    updateSection: builder.mutation({
      query: ({ sectionId, data }) => ({
        url: `sections/${sectionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),

    // Delete a section
    deleteSection: builder.mutation({
      query: ({ moduleId, sectionId }) => ({
        url: `${moduleId}/sections/${sectionId}`,
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
