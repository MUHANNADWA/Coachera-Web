import toast from "react-hot-toast";
import { useAppHook } from "./useAppHook";

export const useRequiresAuth = () => {
  const { user, navigate } = useAppHook();

  return (action: () => void | Promise<void>) => {
    if (!user) {
      toast.error("You must be logged in to do this action");
      navigate("/login");
      return;
    }

    action();
  };
};
