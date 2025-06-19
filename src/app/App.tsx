import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import AutoReturnTop from "../shared/components/AutoReturnTop";
import ScrollToTop from "../shared/components/scrollToTop";

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
  return <AppContent />;
}
