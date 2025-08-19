import {
  useGetMyNotificationsQuery,
  useMarkAllAsReadMutation,
} from "../../../features/courses/apiSlices/notificationsApiSlice";
import { Button } from "../../../shared/components/form/Button";

export default function NotificationsPage() {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetMyNotificationsQuery({});

  const notifList = notifications?.data?.content ?? [];
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const handleMarkAll = async () => {
    await markAllAsRead({});
    refetch();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          All Notifications
        </h1>
        <Button onClick={handleMarkAll} className="text-sm text-primary">
          Mark all as read
        </Button>
      </div>

      {isLoading ? (
        <p>Loading notifications...</p>
      ) : notifList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
      ) : (
        <ul className="space-y-3">
          {notifList.map((n: any) => (
            <li
              key={n.id}
              className={`p-4 rounded-lg border ${
                n.read
                  ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  : "bg-white dark:bg-gray-900 border-primary"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {n.content}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(n.sentAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
