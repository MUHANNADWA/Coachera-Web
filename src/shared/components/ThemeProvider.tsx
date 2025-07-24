import { useEffect } from "react";
import { useAppHook } from "../hooks/useAppHook";

const ThemeProvider = () => {
  const { theme } = useAppHook();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
};

export default ThemeProvider;
