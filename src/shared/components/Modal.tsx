import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "./Button";

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
    success: "text-green-600",
    danger: "text-red-600",
    confirm: "text-gray-700",
  };

  const showActions = variant === "confirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        {title && (
          <h2 className={`text-xl font-semibold mb-4 ${colorMap[variant]}`}>
            {title}
          </h2>
        )}

        {/* Message */}
        <p className="text-gray-700">{message}</p>

        {/* Confirm buttons */}
        {showActions ? (
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="secondary" onClick={onCancel || onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="secondary" onClick={onCancel || onClose}>
              Ok
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
