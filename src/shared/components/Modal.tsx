import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "./form/Button";

type ModalVariant = "info" | "confirm" | "success" | "danger";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "primaryInverted"
  | "dangerInverted";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  variant?: ModalVariant;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  // new props:
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: ButtonVariant;
  closeOnConfirm?: boolean; // default: true (auto-close after confirm finishes)
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  variant = "info",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonVariant = "primary",
  closeOnConfirm = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  // Close on Escape + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
      if (e.key === "Tab" && dialogRef.current) {
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
  }, [isOpen, onClose, busy]);

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

  const handleConfirm = async () => {
    if (!onConfirm) {
      if (closeOnConfirm) onClose();
      return;
    }
    try {
      const ret = onConfirm();
      if (ret && typeof (ret as Promise<void>).then === "function") {
        setBusy(true);
        await ret;
      }
      if (closeOnConfirm) onClose();
    } catch (e) {
      // keep modal open to let caller show a toast/error if needed
    } finally {
      setBusy(false);
    }
  };

  const modal = (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => !busy && onClose()}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md mx-4 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-primary-dark bg-white dark:bg-dark"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => !busy && onClose()}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-2xl"
          autoFocus
          disabled={busy}
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
              disabled={busy}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              className="m-0!"
              variant={confirmButtonVariant}
              onClick={handleConfirm}
              disabled={busy}
            >
              {busy ? "Please wait..." : confirmText}
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              className="m-0!"
              variant="secondary"
              onClick={onCancel || onClose}
              disabled={busy}
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
