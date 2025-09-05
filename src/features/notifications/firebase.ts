// src/features/notifications/firebase.ts
// Firebase initialization + safe messaging helpers (no React hooks here)

import { initializeApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  type Messaging,
  getToken,
  onMessage,
  type MessagePayload,
} from "firebase/messaging";

// --- Firebase config (fixed storageBucket) ---
const firebaseConfig = {
  apiKey: "AIzaSyCrvsR8AF7vWJWRpQrzgTWUugsJMisLG0k",
  authDomain: "coachera-notifications.firebaseapp.com",
  projectId: "coachera-notifications",
  storageBucket: "coachera-notifications.appspot.com", // FIXED
  messagingSenderId: "690396129580",
  appId: "1:690396129580:web:a0872287012945c017a489",
  measurementId: "G-LQ7G1R3RTL",
};

// Init app once
const app = initializeApp(firebaseConfig);

// Gate messaging behind isSupported()
export const getMessagingIfSupported = async (): Promise<Messaging | null> => {
  const supported = await isSupported().catch(() => false);
  return supported ? getMessaging(app) : null;
};

// Use env if available; fallback to provided key
const VAPID_KEY =
  "BFSFgFeI2J1gWmz_w0weFfV05-P-GAbUBpTZ_HBXvZ6uS81bWJjpazp_9-Tz9Td87NTZ9h1UMb-TBbUIvka4mfI";

// Request permission and get FCM token (no hooks)
export const requestFcmToken = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("[FCM] Notification permission not granted.");
      return null;
    }

    const messaging = await getMessagingIfSupported();
    if (!messaging) {
      console.warn("[FCM] Messaging not supported in this environment.");
      return null;
    }

    // Ensure SW is ready (must be registered elsewhere)
    const swReg = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swReg,
    });

    return token ?? null;
  } catch (error) {
    console.error("[FCM] Error while getting token:", error);
    return null;
  }
};

// Subscribe to foreground messages (returns unsubscribe)
export const subscribeForegroundMessages = async (
  handler: (payload: MessagePayload) => void
): Promise<() => void> => {
  const messaging = await getMessagingIfSupported();
  if (!messaging) return () => {};
  return onMessage(messaging, handler);
};
