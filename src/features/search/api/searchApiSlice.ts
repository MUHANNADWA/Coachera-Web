import { SEARCH_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ data, entityType }) => ({
        url: `${SEARCH_URL}/${entityType}`,
        method: "post",
        body: data,
        params: { entityType },
      }),
    }),
    getEntities: builder.query({
      query: () => ({
        url: `${SEARCH_URL}/entities`,
      }),
    }),
  }),
});

export const { useSearchQuery, useGetEntitiesQuery } = searchApiSlice;
