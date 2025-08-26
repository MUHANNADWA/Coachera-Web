import { apiSlice } from  "../../../shared/slices/apiSlice";

const LEARNING_PATH_URL = "/api/learning-paths";

export const learningPathsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all learning paths
    getLearningPaths: builder.query({
      query: () => LEARNING_PATH_URL,
      providesTags: ["LearningPath"],
      keepUnusedDataFor: 5,
    }),

    // Get learning path by ID
    getLearningPathById: builder.query({
      query: (id) => `${LEARNING_PATH_URL}/${id}`,
      providesTags: ["LearningPath"],
      keepUnusedDataFor: 5,
    }),

    // Create a learning path
    createLearningPath: builder.mutation({
      query: (data) => ({
        url: LEARNING_PATH_URL,
        method: "POST",
        body: data, 
        /*
          {
            "orgId": 1,
            "title": "Java Learning Path",
            "description": "Comprehensive path to learn Java from basics to advanced",
            "imageUrl": "java-path.jpg",
            "courses": [
              {
                "courseId": 1,
                "orderIndex": 1
              }
            ]
          }
        */
      }),
      invalidatesTags: ["LearningPath"],
    }),

    // Update a learning path
    updateLearningPath: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${LEARNING_PATH_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["LearningPath"],
    }),

    // Delete a learning path
    deleteLearningPath: builder.mutation({
      query: (id) => ({
        url: `${LEARNING_PATH_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningPath"],
    }),

    // Add a course to a learning path
    addCourseToLearningPath: builder.mutation({
      query: ({ learningPathId, courseId }) => ({
        url: `${LEARNING_PATH_URL}/${learningPathId}/courses/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["LearningPath", "Course"],
    }),

    // Remove a course from a learning path
    removeCourseFromLearningPath: builder.mutation({
      query: ({ learningPathId, courseId }) => ({
        url: `${LEARNING_PATH_URL}/${learningPathId}/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningPath", "Course"],
    }),

    // Get learning paths by organization
    getLearningPathsByOrganization: builder.query({
      query: () => `${LEARNING_PATH_URL}/organization`,
      providesTags: ["LearningPath"],
      keepUnusedDataFor: 5,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLearningPathsQuery,
  useGetLearningPathByIdQuery,
  useCreateLearningPathMutation,
  useUpdateLearningPathMutation,
  useDeleteLearningPathMutation,
  useAddCourseToLearningPathMutation,
  useRemoveCourseFromLearningPathMutation,
  useGetLearningPathsByOrganizationQuery,
} = learningPathsApiSlice;
