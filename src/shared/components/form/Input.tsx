import { forwardRef } from "react";

interface InputProps {
  name?: string;
  value?: string | number | readonly string[];
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  prefixIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  suffixIcon?: React.ReactNode;
  helperText?: string;
  className?: string;
  error?: string;
  autoFocus?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      value,
      type = "text",
      placeholder = "",
      autoComplete = "off",
      min,
      max,
      step,
      minLength,
      maxLength,
      required = false,
      onChange,
      onKeyDown,
      inputMode,
      className = "",
      prefixIcon: PrefixIcon,
      suffixIcon,
      helperText,
      error,
      autoFocus = false,
    },
    ref
  ) => {
    return (
      <div className={`${type !== "search" && "mb-4"} w-full relative`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={name}
            name={name}
            type={type}
            autoFocus={autoFocus}
            ref={ref}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            min={min}
            max={max}
            step={step}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            onChange={onChange}
            onKeyDown={onKeyDown}
            inputMode={inputMode}
            className={`peer placeholder:text-gray-400 w-full py-2 rounded-2xl transition-colors duration-300 border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest dark:focus:bg-primary-darkest outline-none ${
              PrefixIcon ? "pl-10" : "pl-3"
            } ${suffixIcon ? "pr-10" : "pr-3"}
            } ${error ? "border-danger" : "border-color"} ${className}`}
          />

          {PrefixIcon && (
            <PrefixIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-primary transition-colors duration-150" />
          )}

          {suffixIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {suffixIcon}
            </div>
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

Input.displayName = "Input";

export default Input;
