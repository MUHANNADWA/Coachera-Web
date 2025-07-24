import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useAppHook } from "../../hooks/useAppHook";
import { toggleTheme } from "../../slices/themeSlice";
import { Button } from "../form/Button";

export default function HeaderThemeToggle() {
  const { theme, dispatch } = useAppHook();

  return (
    <Button onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? (
        <SunIcon className="px-2 w-9 h-9" />
      ) : (
        <MoonIcon className="px-2 w-9 h-9" />
      )}
    </Button>
  );
}
