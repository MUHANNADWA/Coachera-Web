/* public/firebase-messaging-sw.js */
// Uses compat inside SW for simplicity/reliability.

importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCrvsR8AF7vWJWRpQrzgTWUugsJMisLG0k",
  authDomain: "coachera-notifications.firebaseapp.com",
  projectId: "coachera-notifications",
  storageBucket: "coachera-notifications.appspot.com", // FIXED
  messagingSenderId: "690396129580",
  appId: "1:690396129580:web:a0872287012945c017a489",
  measurementId: "G-LQ7G1R3RTL",
});

// Retrieve an instance of Firebase Messaging for background handling
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  // You can shape the notification using payload.notification
  const title = payload?.notification?.title || "New Notification";
  const options = {
    body: payload?.notification?.body || "You have a new message.",
    icon: payload?.notification?.icon || "/favicon.ico",
    data: {
      click_action: payload?.fcmOptions?.link || "/", // optional deep link
    },
  };

  self.registration.showNotification(title, options);
});

// Focus or open the target URL on notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification?.data?.click_action || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          try {
            const samePath =
              new URL(client.url).pathname ===
              new URL(url, self.location.origin).pathname;
            if (samePath && "focus" in client) return client.focus();
          } catch (_) {}
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
