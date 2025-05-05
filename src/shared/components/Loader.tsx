import { FC } from "react";

const Loader: FC = () => {
  return (
    <div
      className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;