import { IconHeart } from "@tabler/icons-react";
import { Button } from "../Button";

export function HeaderFavorites() {
  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button>
        <IconHeart className="px-2 w-8 h-8" />
      </Button>

      {/* Dropdown */}
      <div className="dropdown">
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 1
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 2
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 3
        </Button>
      </div>
    </div>
  );
}
