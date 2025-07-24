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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      variant="primary"
      className={`m-0! p-2! h-10 w-10 fixed! right-5 bottom-5 ${
        showButton ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      <ArrowLongUpIcon className="h-5 w-5 self-center" />
    </Button>
  );
}
