import { apiSlice } from "../../../shared/slices/apiSlice";

const MODULES_URL = "/api/modules";

export const sectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all sections of a module
    getSections: builder.query({
      query: (moduleId) => `${MODULES_URL}/${moduleId}/sections`,
      providesTags: ["Section"],
      keepUnusedDataFor: 5,
    }),

    // Get a single section by ID
    getSectionById: builder.query({
      query: ({ moduleId, sectionId }) =>
        `${MODULES_URL}/${moduleId}/sections/${sectionId}`,
      providesTags: ["Section"],
      keepUnusedDataFor: 5,
    }),

    // Create a new section
    createSection: builder.mutation({
      query: ({ moduleId, data }) => ({
        url: `${MODULES_URL}/${moduleId}/sections`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),

    // Update a section
    updateSection: builder.mutation({
      query: ({ moduleId, sectionId, data }) => ({
        url: `${MODULES_URL}/${moduleId}/sections/${sectionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),

    // Delete a section
    deleteSection: builder.mutation({
      query: ({ moduleId, sectionId }) => ({
        url: `${MODULES_URL}/${moduleId}/sections/${sectionId}`,
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
