import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Course"],
  endpoints: () => ({}),
});
