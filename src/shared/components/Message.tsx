import { ReactNode, useEffect, useState } from "react";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./form/Button";

/**
 * Variants supported by the Message component.
 */
type MessageVariant = "info" | "success" | "warning" | "danger" | "dark";

interface MessageProps {
  variant?: MessageVariant;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  /**
   * When true, the alert will be announced politely by screen readers.
   * Defaults to true for non-dark variants.
   */
  ariaLive?: "off" | "polite" | "assertive";
}

const Message = ({
  variant = "info",
  children,
  dismissible = false,
  onDismiss,
  className = "",
  ariaLive,
}: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // --- Styles (light & dark) with proper contrast ---
  // We avoid too-dark text on dark bg, and prefer subtle surfaces.
  const variantStyles: Record<MessageVariant, string> = {
    info:
      // light        // text           // border          // dark surface + text + border
      "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-800",
    success:
      "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-100 dark:border-green-800",
    warning:
      "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-800",
    danger:
      "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-100 dark:border-red-800",
    dark:
      // neutral surface designed for dark mode too
      "bg-gray-900 text-gray-100 border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800",
  };

  // Icons per variant
  const iconMap: Record<MessageVariant, React.ElementType> = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon,
    dark: InformationCircleIcon,
  };

  // Icon color inherits currentColor with a gentle accent per variant in light,
  // and a brighter accent in dark for contrast.
  const variantIconColors: Record<MessageVariant, string> = {
    info: "text-blue-600 dark:text-blue-300",
    success: "text-green-600 dark:text-green-300",
    warning: "text-yellow-600 dark:text-yellow-300",
    danger: "text-red-600 dark:text-red-300",
    dark: "text-gray-400 dark:text-gray-300",
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  useEffect(() => {
    // Reset visibility if parent re-mounts with different content
    setIsVisible(true);
  }, [children, variant]);

  if (!isVisible) return null;

  const Icon = iconMap[variant];
  // Default aria-live: polite for alerts (except purely decorative dark).
  const live = ariaLive ?? (variant === "dark" ? "off" : "polite");

  return (
    <div
      className={[
        "relative p-4 mb-4 rounded-2xl border",
        "transition-all duration-200",
        "focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-primary/40",
        variantStyles[variant],
        className,
      ].join(" ")}
      role="alert"
      aria-live={live}
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className={`mt-0.5 inline-flex`}>
          <Icon className={`h-5 w-5 ${variantIconColors[variant]}`} />
        </span>

        <div className="flex-1 leading-relaxed">{children}</div>

        {dismissible && (
          <Button
            type="button"
            onClick={handleDismiss}
            className={[
              "ml-2 p-1 rounded-2xl",
              "hover:bg-black/5 dark:hover:bg-white/5",
              "focus:outline-none focus:ring-2 focus:ring-primary/40",
              variantIconColors[variant],
            ].join(" ")}
            aria-label="Dismiss"
            title="Dismiss"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Message;
