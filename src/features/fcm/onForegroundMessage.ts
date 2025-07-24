import { onMessage, isSupported, getMessaging } from "firebase/messaging";
import { firebaseApp } from "../../app/firbase";

export async function listenToForegroundMessages() {
  const supported = await isSupported();

  if (!supported) {
    console.warn("❌ Firebase Messaging is not supported in this browser.");
    return;
  }

  const messaging = getMessaging(firebaseApp);

  onMessage(messaging, (payload) => {
    console.log("📩 Foreground FCM message:", payload);
    alert(payload.notification?.title ?? "You have a new notification!");
  });
}
