import { apiSlice } from "../../../shared/slices/apiSlice";

const MODULES_URL = "modules";

export const modulesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Get single module by ID
    getModule: builder.query({
      query: (moduleId) => `${MODULES_URL}/${moduleId}`,
      providesTags: ["Module"],
      keepUnusedDataFor: 5,
    }),

    // Update module by ID
    updateModule: builder.mutation({
      query: ({ moduleId, data }) => ({
        url: `${MODULES_URL}/${moduleId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Module"],
    }),

    // Delete module by ID
    deleteModule: builder.mutation({
      query: (moduleId) => ({
        url: `${MODULES_URL}/${moduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Module"],
    }),

    // Get modules by courseId
    getModulesByCourse: builder.query({
      query: (courseId) => `${MODULES_URL}/courses/${courseId}`,
      providesTags: ["Module"],
      keepUnusedDataFor: 5,
    }),

    // Create a module under a course
    createModule: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `${MODULES_URL}/courses/${courseId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Module"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetModuleQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useGetModulesByCourseQuery,
  useCreateModuleMutation,
} = modulesApiSlice;
