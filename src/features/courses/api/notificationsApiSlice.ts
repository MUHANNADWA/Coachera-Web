import { NOTIFICATIONS_URL } from "../../../constants/constants";
import { apiSlice } from "../../../shared/api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // جلب إشعارات المستخدم الحالي
    getMyNotifications: builder.query({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/my`,
      }),
      keepUnusedDataFor: 5,
    }),

    // جلب عدد الغير مقروء
    getUnreadCount: builder.query({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/unread-count`,
      }),
      keepUnusedDataFor: 5,
    }),

    // إرسال إشعار لمستخدم واحد
    sendNotification: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATIONS_URL}/send`,
        method: "POST",
        body: data, // { userId, title, body }
      }),
    }),

    // إرسال إشعار لمجموعة
    sendBulkNotification: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATIONS_URL}/send/bulk`,
        method: "POST",
        body: data, // { userIds: [], title, body }
      }),
    }),

    // تعليم الإشعارات كمقروءة
    markAllAsRead: builder.mutation({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/mark-read`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useSendNotificationMutation,
  useSendBulkNotificationMutation,
  useMarkAllAsReadMutation,
} = notificationsApiSlice;
