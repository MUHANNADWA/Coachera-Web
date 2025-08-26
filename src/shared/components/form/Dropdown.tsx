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

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Clear search when menu closes and reset highlight
  useEffect(() => {
    if (!open) setSearch("");
    if (open) setHighlighted(-1);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus the search input when opening
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Scroll the highlighted option into view
  useEffect(() => {
    const el = listItemRefs.current[highlighted];
    if (el && panelRef.current) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selected = options.find((o) => o.value === value);
  const selectedLabel = selected?.label ?? "";

  const closeMenu = () => {
    setOpen(false);
    // return focus to button for accessibility
    buttonRef.current?.focus({ preventScroll: true });
  };

  // Keyboard handling on the whole root (when open)
  const onKeyDownRoot = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (highlighted >= 0) {
        e.preventDefault();
        onChange(filteredOptions[highlighted].value);
        closeMenu();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "Tab") {
      // Let Tab close the menu naturally
      closeMenu();
    }
  };

  // Keyboard handling on the button (open with arrow down)
  const onKeyDownButton = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
      // set highlight to first visible option
      setHighlighted(0);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onKeyDown={onKeyDownRoot}
    >
      {label && (
        <label className="block mb-1 text-sm font-medium text-prborder-primary-dark dark:text-gray-300">
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        type="button"
        onPointerDown={(e) => e.stopPropagation()} // prevent parent handlers
        className={`bg-white dark:bg-dark dark:text-white w-full placeholder:text-gray-400 dark:placeholder:text-gray-600 py-2 rounded-2xl border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest dark:focus:bg-primary-darkest outline-none border-color dark:border-primary-dark pr-9 pl-3 text-left transition-colors duration-300
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => (!disabled ? setOpen((o) => !o) : null)}
        onKeyDown={onKeyDownButton}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="dropdown-listbox"
        aria-label={label || "Dropdown"}
        disabled={disabled}
      >
        <span className={value ? "" : "text-gray-400 dark:text-gray-600"}>
          {selectedLabel || placeholder}
        </span>

        {/* Chevron */}
        <span className="absolute right-3 top-11 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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
          ref={panelRef}
          className="absolute mt-1 w-full bg-white dark:bg-dark border-2 border-gray-200 dark:border-primary-dark rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in z-20"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <input
            ref={inputRef}
            type="text"
            className="w-full px-3 py-2 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-dark text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search options"
            onPointerDown={(e) => e.stopPropagation()}
          />

          <ul
            id="dropdown-listbox"
            role="listbox"
            aria-activedescendant={
              highlighted >= 0 ? `dropdown-opt-${highlighted}` : undefined
            }
          >
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-gray-400 dark:text-gray-500 select-none">
                No options
              </li>
            )}

            {filteredOptions.map((opt, idx) => {
              const isActive = highlighted === idx;
              const isSelected = value === opt.value;

              return (
                <li
                  id={`dropdown-opt-${idx}`}
                  key={opt.value}
                  // @ts-ignore
                  ref={(el) => (listItemRefs.current[idx] = el)}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    "px-3 py-2 cursor-pointer rounded-lg transition-colors",
                    "text-gray-800 dark:text-white",
                    isActive
                      ? "bg-primary/20 dark:bg-primary/25"
                      : "hover:bg-primary/10 dark:hover:bg-gray-800",
                    isSelected ? "font-semibold text-primary" : "",
                  ].join(" ")}
                  onMouseEnter={() => setHighlighted(idx)}
                  onMouseLeave={() => setHighlighted(-1)}
                  onClick={() => {
                    onChange(opt.value);
                    closeMenu();
                  }}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
