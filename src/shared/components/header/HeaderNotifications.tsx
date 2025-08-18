import { BellIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button";
import {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllAsReadMutation,
} from "../../../features/courses/apiSlices/notificationsApiSlice";

export default function HeaderNotifications() {
  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useGetMyNotificationsQuery({});
  const { data: unread = { count: 0 } } = useGetUnreadCountQuery({});
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const handleMarkAll = async () => {
    await markAllAsRead({});
    refetch();
  };

  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button className="relative">
        <BellIcon className="px-2 w-9 h-9" />
        {unread.count > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unread.count}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      <div className="dropdown">
        <div className="flex justify-between items-center mb-2 px-2">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </span>
          <Button onClick={handleMarkAll} className="text-sm text-primary">
            Mark all read
          </Button>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <ul className="space-y-2">
            {[1, 2, 3].map((i) => (
              <li
                key={i}
                className="animate-pulse flex items-center space-x-3 px-3 py-2"
              >
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </li>
            ))}
          </ul>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-3">
            No notifications
          </p>
        ) : (
          <ul className="max-h-64 overflow-y-auto">
            {notifications.map((n: any, i: number) => (
              <li key={i}>
                <Button
                  onClick={() => {
                    // ممكن تفتح صفحة معينة مرتبطة بالإشعار
                    console.log("Clicked notification:", n);
                  }}
                  className="group flex w-full justify-start px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <div className="text-left">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {n.body}
                    </div>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
