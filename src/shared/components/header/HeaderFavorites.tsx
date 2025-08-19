import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button";
import { useAppHook } from "../../hooks/useAppHook";

export function HeaderFavorites() {
  const { navigate } = useAppHook();

  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button onClick={() => navigate("/profile#wishlist")}>
        <HeartIcon className="px-2 w-9 h-9" />
      </Button>
    </div>
  );
}
