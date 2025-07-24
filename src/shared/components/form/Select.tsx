import { forwardRef } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  name?: string;
  value?: string | number;
  label?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options: Option[];
  className?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      name,
      value,
      required = false,
      onChange,
      options,
      className = "",
      error,
      helperText,
      disabled = false,
    },
    ref
  ) => {
    return (
      <div className="mb-4 w-full">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={name}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-2 px-3 rounded-2xl border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest outline-none ${
            error ? "border-danger" : "border-color"
          } ${className}`}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

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

Select.displayName = "Select";

export default Select;
