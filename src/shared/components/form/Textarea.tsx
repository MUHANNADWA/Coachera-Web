import { forwardRef } from "react";

interface TextareaProps {
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  className?: string;
  helperText?: string;
  error?: string;
  rows?: number;
  autoFocus?: boolean;
  prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name,
      value,
      label,
      placeholder = "",
      required = false,
      onChange,
      onKeyDown,
      className = "",
      helperText,
      error,
      rows = 4,
      autoFocus = false,
      prefixIcon: PrefixIcon,
      disabled = false,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className="mb-4 w-full relative">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            id={name}
            name={name}
            ref={ref}
            autoFocus={autoFocus}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            onKeyDown={onKeyDown}
            rows={rows}
            disabled={disabled}
            onBlur={onBlur}
            className={`peer w-full py-2 px-3 resize-none rounded-2xl transition-colors duration-300 border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest dark:focus:bg-primary-darkest outline-none
            ${PrefixIcon ? "pl-10" : ""}
            ${error ? "border-danger" : "border-color"} ${className}`}
          />

          {PrefixIcon && (
            <PrefixIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400 peer-focus:text-primary transition-colors duration-150" />
          )}
        </div>

        {error ? (
          <p className="mt-1 text-xs text-danger">{error}</p>
        ) : (
          helperText && (
            <p className="mt-1 text-xs text-gray-500">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
