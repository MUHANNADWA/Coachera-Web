import { SKILLS_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const skillsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({
        url: SKILLS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getSkill: builder.query({
      query: (skillID) => ({
        url: `${SKILLS_URL}/${skillID}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSkill: builder.mutation({
      query: () => ({
        url: `${SKILLS_URL}`,
        method: "POST",
      }),
    }),
    updateSkill: builder.mutation({
      query: (data) => ({
        url: `${SKILLS_URL}/${data.skillId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (skillId) => ({
        url: `${SKILLS_URL}/${skillId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsApiSlice;
