import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "./form/Button";

type ModalVariant = "info" | "confirm" | "success" | "danger";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  variant?: ModalVariant;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  variant = "info",
  onConfirm,
  onCancel,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const colorMap = {
    info: "text-primary",
    success: "text-success",
    danger: "text-danger",
    confirm: "text-gray-700",
  };

  const showActions = variant === "confirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="consect border-primary rounded-2xl w-full max-w-md mx-4 relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-7 right-6 text-gray-400 hover:text-gray-600">
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        {title && (
          <h2 className={`text-xl font-semibold mb-4 ${colorMap[variant]}`}>
            {title}
          </h2>
        )}

        {/* Message */}
        <p className="pr-4 text-gray-700 dark:text-gray-300">{message}</p>

        {/* Confirm buttons */}
        {showActions ? (
          <div className="mt-6 flex justify-end gap-x-2">
            <Button
              className="m-0!"
              variant="secondary"
              onClick={onCancel || onClose}>
              Cancel
            </Button>
            <Button className="m-0!" variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex justify-end">
            <Button
              className="m-0!"
              variant="secondary"
              onClick={onCancel || onClose}>
              Ok
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
