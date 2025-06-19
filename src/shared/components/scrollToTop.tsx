import { ArrowLongUpIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Button } from "./Button";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`bg-primary h-10 w-10 fixed right-5 bottom-5 shadow-md rounded-2xl cursor-pointer 
          hover:bg-secondary hover:shadow-2xl transition-opacity duration-300 ${
            showButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
      <ArrowLongUpIcon className="h-5 w-5 self-center text-white" />
    </Button>
  );
}
