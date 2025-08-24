import { ArrowLongUpIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Button } from "./form/Button";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const scrollThreshold = 200;

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      variant="primary"
      className={[
        "m-0! p-2! h-12 w-12 fixed! right-6 bottom-6 z-45 rounded-2xl shadow-xl",
        "transition-all duration-300 will-change-transform",
        showButton
          ? "opacity-100 animate-[popIn_0.35s_ease-out]"
          : "opacity-0 pointer-events-none animate-[popOut_0.25s_ease-in]",
      ].join(" ")}
    >
      <ArrowLongUpIcon className="h-6 w-6 self-center" />
    </Button>
  );
}
