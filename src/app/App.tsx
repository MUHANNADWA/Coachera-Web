import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import AutoReturnTop from "../shared/components/AutoReturnTop";
import ScrollToTop from "../shared/components/scrollToTop";
import { useEffect } from "react";
import { requestPermission } from "../features/fcm/requestPermission";
import { listenToForegroundMessages } from "../features/fcm/onForegroundMessage";

function AppContent() {
  return (
    <>
      <AutoReturnTop />
      <div className="flex min-h-screen flex-col relative">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <ScrollToTop />
        <Toaster containerClassName="mt-20" />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  useEffect(() => {
    requestPermission().then((token) => {
      if (token) {
        // 🔁 Send this token to backend
      }
    });

    listenToForegroundMessages();
  }, []);
  return <AppContent />;
}
