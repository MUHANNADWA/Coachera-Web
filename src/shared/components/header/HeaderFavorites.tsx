import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button";

export function HeaderFavorites() {
  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button>
        <HeartIcon className="px-2 w-9 h-9" />
      </Button>

      {/* Dropdown */}
      <div className="dropdown">
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700 dark:text-gray-300">
          Notification 1
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700 dark:text-gray-300">
          Notification 2
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700 dark:text-gray-300">
          Notification 3
        </Button>
      </div>
    </div>
  );
}
