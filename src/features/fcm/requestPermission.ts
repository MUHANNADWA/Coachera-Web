import { getToken } from "firebase/messaging";
import { messaging } from "../../app/firbase";

export async function requestPermission(): Promise<string | null> {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      console.log("FCM Token:", token);
      return token;
    }
  } catch (err) {
    console.error("FCM permission error", err);
  }
  return null;
}
