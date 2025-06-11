import { ReactNode, useState } from "react";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type MessageVariant = "info" | "success" | "warning" | "danger" | "dark";

interface MessageProps {
  variant?: MessageVariant;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const Message = ({
  variant = "info",
  children,
  dismissible = false,
  onDismiss,
  className = "",
}: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Variant style mappings
  const variantStyles: Record<MessageVariant, string> = {
    info: "bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-900/30 dark:text-blue-900 dark:border-blue-800",
    success:
      "bg-green-50 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-900 dark:border-green-800",
    warning:
      "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-900 dark:border-yellow-800",
    danger:
      "bg-red-50 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-900 dark:border-red-800",
    dark: "bg-gray-800 text-white border-gray-900 dark:bg-gray-900 dark:border-gray-700",
  };

  // Icon mappings
  const iconMap: Record<MessageVariant, React.ElementType> = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon,
    dark: InformationCircleIcon,
  };

  // Icon colors
  const variantIconColors: Record<MessageVariant, string> = {
    info: "text-blue-500 dark:text-blue-900",
    success: "text-green-500 dark:text-green-900",
    warning: "text-yellow-500 dark:text-yellow-900",
    danger: "text-red-500 dark:text-red-900",
    dark: "text-gray-400 dark:text-gray-300",
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const Icon = iconMap[variant];

  return (
    <div
      className={`relative p-4 mb-4 rounded-lg border ${variantStyles[variant]} ${className} transition-all duration-200`}
      role="alert">
      <div className="flex items-start">
        <Icon
          className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${variantIconColors[variant]}`}
        />
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={`ml-2 p-1 rounded-full hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantIconColors[variant]} focus:ring-current`}
            aria-label="Dismiss">
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
