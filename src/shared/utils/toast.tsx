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
    success: (response) => {
      const res = response as any;

      const message =
        res?.data?.message ??
        res?.message ??
        res?.error?.data?.message ??
        res?.error?.message ??
        errorMessage;

      const status =
        res?.status ??
        res?.data?.status ??
        res?.error?.data?.status ??
        res?.error?.status;

      if (!(status >= 200 && status < 300)) {
        throw new Error(message);
      }
      onSuccess?.(response);
      return message ?? successMessage;
    },
    error: (err) => {
      return (err?.data?.message || err?.message) ?? errorMessage;
    },
  });
}
