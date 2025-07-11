import { AUTH_URL } from "../../constants/constants";
import { apiSlice } from "../../shared/slices/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "post",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "post",
        headers: { Authorization: `Bearer ${data}` },
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (data) => ({
        url: `image/upload`,
        method: "post",
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: AUTH_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${AUTH_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "post",
        params: { email },
      }),
    }),
    validateOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `${AUTH_URL}/validate-otp`,
        method: "post",
        params: { email, otp },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, otp, newPassword }) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "post",
        params: { email, otp, newPassword },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUploadPhotoMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useValidateOtpMutation,
  useResetPasswordMutation,
} = usersApiSlice;
