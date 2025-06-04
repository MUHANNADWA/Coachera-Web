import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../shared/components/ScrollToTop";

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <Toaster containerClassName="mt-20" />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
