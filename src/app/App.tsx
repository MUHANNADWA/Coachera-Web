import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import AutoReturnTop from "../shared/components/AutoReturnTop";
import ScrollToTop from "../shared/components/ScrollToTop";
import InitProvider from "../shared/components/InitProvider";
import { useUtils } from "../features/courses/utils/useUtils";

export default function App() {
  const { toastOptions } = useUtils();

  return (
    <>
      <InitProvider />
      <AutoReturnTop />
      <div className="flex min-h-screen flex-col relative">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <ScrollToTop />
        <Toaster toastOptions={toastOptions} containerClassName="mt-20" />
        <Footer />
      </div>
    </>
  );
}
