import { useAppHook } from "../../hooks/useAppHook";
import { Button } from "../form/Button";
import HeaderThemeToggle from "./HeaderThemeToggle";
import { HeaderFavorites } from "./HeaderFavorites";
import HeaderNotifications from "./HeaderNotifications";
import { HeaderUserDropdown } from "./HeaderUserDropdown";

export default function HeaderUserMenu() {
  const { user, navigate } = useAppHook();
  return user ? (
    <>
      <Button className="px-4 py-2" onClick={() => navigate("/teach")}>
        Teach on coachera
      </Button>
      <HeaderThemeToggle />
      <HeaderFavorites />
      <HeaderNotifications />
      <HeaderUserDropdown />
    </>
  ) : (
    <div className="flex gap-2 items-center">
      <HeaderThemeToggle />
      <Button
        onClick={() => navigate("/login")}
        variant="secondary"
        className="my-1! py-2! px-4!"
      >
        Login
      </Button>
      <Button
        onClick={() => navigate("/signup")}
        variant="primary"
        className="my-1! py-2! px-4!"
      >
        Signup
      </Button>
    </div>
  );
}
