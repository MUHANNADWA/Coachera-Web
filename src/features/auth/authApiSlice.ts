import { AUTH_URL } from "../../constants/constants";
import { apiSlice } from "../../shared/slices/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),

    uploadPhoto: builder.mutation({
      query: (data) => ({
        url: `image/upload`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query({
      query: () => AUTH_URL,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${AUTH_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
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
      query: (id) => `${AUTH_URL}/${id}`,
      keepUnusedDataFor: 5,
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        params: { email },
      }),
    }),

    validateOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `${AUTH_URL}/validate-otp`,
        method: "POST",
        params: { email, otp },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ email, otp, newPassword }) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        params: { email, otp, newPassword },
      }),
    }),
  }),
  overrideExisting: false,
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
