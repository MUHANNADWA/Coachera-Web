import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Loader from "../../../shared/components/Loader";
import { useAppHook } from "../../../shared/hooks/useAppHook";

export function useUtils() {
  const { theme } = useAppHook();

  const toastOptions = {
    success: {
      icon: <CheckCircleIcon className="text-success h-12 w-12" />,
      className: "border-2 border-success",
    },
    error: {
      icon: <XCircleIcon className="text-danger h-12 w-12" />,
      className: "border-2 border-danger",
    },
    loading: {
      icon: <Loader className="text-primary" />,
      className: "border-2 border-primary",
    },
    style: {
      borderRadius: "15px",
      padding: "10px",
      fontSize: "16px",
      boxShadow: "none",
      backgroundColor: theme === "dark" ? "var(--color-dark)" : "white",
      color: theme !== "dark" ? "var(--color-dark)" : "white",
    },
  };

  return { toastOptions };
}
