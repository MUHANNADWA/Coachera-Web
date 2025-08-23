// components/Modal.tsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape + trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        // Focus trap بسيط
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const colorMap = {
    info: "text-primary",
    success: "text-success",
    danger: "text-danger",
    confirm: "text-gray-700 dark:text-gray-100",
  } as const;

  const showActions = variant === "confirm";

  const modal = (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Backdrop يغطي كامل الشاشة */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md mx-4 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-primary-dark bg-white dark:bg-dark"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-2xl"
          autoFocus
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className={`text-xl font-semibold mb-4 ${colorMap[variant]}`}
          >
            {title}
          </h2>
        )}

        {/* Message */}
        <p className="pr-4 text-gray-700 dark:text-gray-300">{message}</p>

        {/* Actions */}
        {showActions ? (
          <div className="mt-6 flex justify-end gap-x-2">
            <Button
              type="button"
              className="m-0!"
              variant="secondary"
              onClick={onCancel || onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="m-0!"
              variant="primary"
              onClick={() => {
                onConfirm && onConfirm();
                onClose();
              }}
            >
              Confirm
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              className="m-0!"
              variant="secondary"
              onClick={onCancel || onClose}
            >
              Ok
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
