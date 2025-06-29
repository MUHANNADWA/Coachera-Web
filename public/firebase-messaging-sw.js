import {logo} from "../src/assets/logo.svg"

importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCrvsR8AF7vWJWRpQrzgTWUugsJMisLG0k",
  projectId: "coachera-notifications",
  messagingSenderId: "690396129580",
  appId: "1:690396129580:web:a0872287012945c017a489",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: {logo},
  });
});
