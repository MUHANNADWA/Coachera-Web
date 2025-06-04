import toast from "react-hot-toast";

type ToastPromiseOptions<T> = {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (res: T) => void;
};

export default function toastPromise<T>(
  promise: Promise<T>,
  options: ToastPromiseOptions<T> = {}
): Promise<T> {
  const {
    loadingMessage = "Loading...",
    successMessage = "Success!",
    errorMessage = "Something went wrong.",
    onSuccess,
  } = options;

  return toast.promise(promise, {
    loading: loadingMessage,
    success: (res) => {
      console.log(res);
      onSuccess?.(res);
      return (
        (res as any)?.data?.message ?? (res as any)?.message ?? successMessage
      );
    },
    error: (err) => {
      console.error(err);
      return (err?.data?.message || err?.message) ?? errorMessage;
    },
  });
}
