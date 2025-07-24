import { forwardRef } from "react";

interface CheckboxProps {
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  autoFocus?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      label,
      checked,
      onChange,
      className = "",
      error,
      helperText,
      required = false,
      autoFocus = false,
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="inline-flex items-center space-x-2">
          <input
            ref={ref}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            required={required}
            autoFocus={autoFocus}
            className={`h-5 w-5 rounded-2xl border-2 accent-primary transition-colors duration-200
            ${error ? "border-danger" : "border-gray-300"}
            ${className}`}
          />
          {label && (
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {label}
            </span>
          )}
        </label>

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

Checkbox.displayName = "Checkbox";

export default Checkbox;
