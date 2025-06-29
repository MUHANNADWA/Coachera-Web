import { getToken } from "firebase/messaging";
import { messaging } from "../../app/firbase";

export async function requestPermission(): Promise<string | null> {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BFSFgFeI2J1gWmz_w0weFfV05-P-GAbUBpTZ_HBXvZ6uS81bWJjpazp_9-Tz9Td87NTZ9h1UMb-TBbUIvka4mfI",
      });
      console.log("FCM Token:", token);
      return token;
    }
  } catch (err) {
    console.error("FCM permission error", err);
  }
  return null;
}
