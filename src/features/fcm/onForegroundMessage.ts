import { onMessage } from "firebase/messaging";
import { messaging } from "../../app/firbase";

export function listenToForegroundMessages() {
  onMessage(messaging, (payload) => {
    console.log("📩 Foreground FCM message:", payload);
    alert(payload.notification?.title ?? "You have a new notification!");
  });
}
