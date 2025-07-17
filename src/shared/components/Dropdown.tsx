import React, { useState, useRef, useEffect } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  className = "",
  placeholder = "Select...",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      setHighlighted((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setHighlighted((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlighted >= 0) {
      onChange(filteredOptions[highlighted].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <button
        type="button"
        className={`w-full placeholder:text-gray-400 py-2 rounded-2xl border focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest outline-none border-gray-300
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}>
        <span className={value ? "" : "text-gray-400"}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <span className="absolute right-3 top-[44px] -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div
          className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in"
          tabIndex={-1}
          onKeyDown={handleKeyDown}>
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-100 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul role="listbox">
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-gray-400">No options</li>
            )}
            {filteredOptions.map((opt, idx) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={value === opt.value}
                className={`px-3 py-2 cursor-pointer hover:bg-primary/10 rounded-lg transition-colors ${
                  highlighted === idx ? "bg-primary/20" : ""
                } ${value === opt.value ? "font-semibold text-primary" : ""}`}
                onMouseEnter={() => setHighlighted(idx)}
                onMouseLeave={() => setHighlighted(-1)}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}>
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
