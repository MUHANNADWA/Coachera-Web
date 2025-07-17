import { useAppHook } from "../../hooks/useAppHook";
import { Button } from "../Button";
import { HeaderFavorites } from "./HeaderFavorites";
import HeaderNotifications from "./HeaderNotifications";
import { HeaderUserDropdown } from "./HeaderUserDropdown";

type HeaderUserMenuProps = {
  navigate: (path: string) => void;
};

export default function HeaderUserMenu({ navigate }: HeaderUserMenuProps) {
  const { token } = useAppHook();
  return token ? (
    <>
      <Button className="px-4 py-2">Teach on coachera</Button>
      <HeaderFavorites />
      <HeaderNotifications />
      <HeaderUserDropdown />
    </>
  ) : (
    <div className="flex gap-2">
      <Button
        onClick={() => navigate("/login")}
        variant="secondary"
        className="my-1! py-2! px-4!">
        Login
      </Button>
      <Button
        onClick={() => navigate("/signup")}
        variant="primary"
        className="my-1! py-2! px-4!">
        Signup
      </Button>
    </div>
  );
}
