importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js"
);

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
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle =
    payload.notification.title || "Background Notification";
  const notificationOptions = {
    body: payload.notification.body || "You have a new message.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
