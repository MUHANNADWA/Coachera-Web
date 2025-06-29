import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCrvsR8AF7vWJWRpQrzgTWUugsJMisLG0k",
  authDomain: "coachera-notifications.firebaseapp.com",
  projectId: "coachera-notifications",
  storageBucket: "coachera-notifications.firebasestorage.app",
  messagingSenderId: "690396129580",
  appId: "1:690396129580:web:a0872287012945c017a489",
  measurementId: "G-LQ7G1R3RTL",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
