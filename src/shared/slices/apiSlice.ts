import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as any).auth?.user?.accessToken;
    const token = accessToken ? `Bearer ${accessToken}` : null;
    console.log("prepairing headers, token:", token);
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "Course",
    "Wishlist",
    "Enrollments",
    "Quiz",
    "Module",
    "Section",
    "Material",
    "Quiz",
    "Category",
    "Instructor",
    "LearningPath"
  ],
  endpoints: () => ({}),
});
