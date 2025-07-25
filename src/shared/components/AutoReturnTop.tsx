import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AutoReturnTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
