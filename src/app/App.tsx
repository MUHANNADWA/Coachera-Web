import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import AutoReturnTop from "../shared/components/AutoReturnTop";
import ScrollToTop from "../shared/components/scrollToTop";
import { useEffect } from "react";
import { requestPermission } from "../features/fcm/requestPermission";
import { listenToForegroundMessages } from "../features/fcm/onForegroundMessage";
import Loader from "../shared/components/Loader";
import { Icon123, IconCheck, IconX } from "@tabler/icons-react";

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
        <Toaster
          toastOptions={{
            success: {
              icon: <IconCheck className="text-primary" />,
            },
            error: {
              icon: <IconX className="text-primary" />,
            },
            loading: {
              icon: <Loader className="text-primary h-6! w-6!" />,
            },
            style: {
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-primary)",
              borderRadius: "10px",
              padding: "10px",
              fontSize: "16px",
            },
          }}
          containerClassName="mt-20"
        />
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
