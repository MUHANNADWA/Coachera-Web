import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrvsR8AF7vWJWRpQrzgTWUugsJMisLG0k",
  authDomain: "coachera-notifications.firebaseapp.com",
  projectId: "coachera-notifications",
  storageBucket: "coachera-notifications.firebasestorage.app",
  messagingSenderId: "690396129580",
  appId: "1:690396129580:web:a0872287012945c017a489",
  measurementId: "G-LQ7G1R3RTL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Replace this with your actual VAPID key from Firebase Console
const VAPID_KEY =
  "BFSFgFeI2J1gWmz_w0weFfV05-P-GAbUBpTZ_HBXvZ6uS81bWJjpazp_9-Tz9Td87NTZ9h1UMb-TBbUIvka4mfI";

// Request permission and get FCM token
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: await navigator.serviceWorker.ready,
      });
      if (token) {
        console.log("FCM Token:", token);
        // TODO: const data = {}
      } else {
        console.log("No token received. Permission may have been denied.");
      }
    } else {
      console.warn("Notification permission not granted.");
    }
  } catch (error) {
    console.error("An error occurred while getting token:", error);
  }
};

// Optional: Handle messages while the app is in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  // Show custom UI if needed
});
