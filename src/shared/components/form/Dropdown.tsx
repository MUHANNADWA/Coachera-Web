import React, { useState, useRef, useEffect, useMemo } from "react";

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

  /** Enable creating a new option from the search text */
  allowCreate?: boolean; // default: false
  /** Callback when user chooses to create a new option.
   *  If you return the newly created option's value, the dropdown will select it automatically. */
  onCreateOption?: (label: string) => string | void;
  /** Customize the create-row label. Defaults to: Create "text" */
  getCreateLabel?: (text: string) => string;
}

type ListItem =
  | { kind: "create"; label: string }
  | { kind: "option"; option: DropdownOption };

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  className = "",
  placeholder = "Select...",
  disabled = false,
  allowCreate = false,
  onCreateOption,
  getCreateLabel = (t) => `Create "${t}"`,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState<number>(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Reset search/highlight when menu toggles
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

  // Focus the search when opening
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Scroll highlighted into view
  useEffect(() => {
    const el = listItemRefs.current[highlighted];
    if (el && panelRef.current) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  const lower = search.trim().toLowerCase();

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.label.toLowerCase().includes(lower)),
    [options, lower]
  );

  const selected = options.find((o) => o.value === value);
  const selectedLabel = selected?.label ?? "";

  const existsExact = useMemo(
    () => options.some((o) => o.label.toLowerCase() === lower) || lower === "",
    [options, lower]
  );

  const canCreate = allowCreate && !existsExact && search.trim().length > 0;

  // Build the list rendered (optionally prepending a "create" row)
  const list: ListItem[] = useMemo(() => {
    const base: ListItem[] = filteredOptions.map((o) => ({
      kind: "option",
      option: o,
    }));
    return canCreate
      ? [{ kind: "create", label: search.trim() }, ...base]
      : base;
  }, [filteredOptions, canCreate, search]);

  const closeMenu = () => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  };

  const selectByIndex = (idx: number) => {
    const item = list[idx];
    if (!item) return;
    if (item.kind === "option") {
      onChange(item.option.value);
      closeMenu();
    } else if (item.kind === "create" && allowCreate && onCreateOption) {
      const createdValue = onCreateOption(item.label);
      // If onCreateOption returns a value, select it automatically
      if (typeof createdValue === "string") {
        onChange(createdValue);
      }
      closeMenu();
    }
  };

  // Keyboard handling on root
  const onKeyDownRoot = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) => (prev < list.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (highlighted >= 0) {
        e.preventDefault();
        selectByIndex(highlighted);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "Tab") {
      closeMenu();
    }
  };

  // Keyboard handling on the button (open + preselect first row)
  const onKeyDownButton = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
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
        onPointerDown={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-dark dark:text-white w-full placeholder:text-gray-400 dark:placeholder:text-gray-600 py-2 rounded-2xl border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest dark:focus:bg-primary-darkest outline-none border-color dark:border-primary-dark pr-9 pl-3 text-left transition-colors duration-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
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
            onKeyDown={(e) => {
              // Quick create on Enter when nothing highlighted
              if (
                e.key === "Enter" &&
                allowCreate &&
                !existsExact &&
                search.trim()
              ) {
                e.preventDefault();
                if (onCreateOption) {
                  const createdValue = onCreateOption(search.trim());
                  if (typeof createdValue === "string") onChange(createdValue);
                }
                closeMenu();
              }
            }}
          />

          <ul
            id="dropdown-listbox"
            role="listbox"
            aria-activedescendant={
              highlighted >= 0 ? `dropdown-opt-${highlighted}` : undefined
            }
          >
            {/* Create row (if allowed + needed) is already included in list */}
            {list.length === 0 && (
              <li className="px-3 py-2 text-gray-400 dark:text-gray-500 select-none">
                No options
              </li>
            )}

            {list.map((item, idx) => {
              const isActive = highlighted === idx;

              if (item.kind === "create") {
                return (
                  <li
                    id={`dropdown-opt-${idx}`}
                    key="__create__"
                    // @ts-ignore
                    ref={(el) => (listItemRefs.current[idx] = el)}
                    role="option"
                    aria-selected={false}
                    className={[
                      "px-3 py-2 cursor-pointer rounded-lg transition-colors",
                      "text-gray-800 dark:text-white",
                      isActive
                        ? "bg-primary/20 dark:bg-primary/25"
                        : "hover:bg-primary/10 dark:hover:bg-gray-800",
                      "font-medium text-primary",
                    ].join(" ")}
                    onMouseEnter={() => setHighlighted(idx)}
                    onMouseLeave={() => setHighlighted(-1)}
                    onClick={() => {
                      if (onCreateOption) {
                        const createdValue = onCreateOption(item.label);
                        if (typeof createdValue === "string")
                          onChange(createdValue);
                      }
                      closeMenu();
                    }}
                  >
                    {getCreateLabel(item.label)}
                  </li>
                );
              }

              const isSelected = value === item.option.value;
              return (
                <li
                  id={`dropdown-opt-${idx}`}
                  key={item.option.value}
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
                    onChange(item.option.value);
                    closeMenu();
                  }}
                >
                  {item.option.label}
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
