// shared/components/SearchBar.tsx
import { useState, useRef, useEffect } from "react";
import Input from "./form/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAppHook } from "../hooks/useAppHook";

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useAppHook();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSlash = e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey;
      const isInputFocused =
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
      if (isSlash && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}&type=courses&pg=0`);
  };

  return (
    <div className="relative max-w-xs w-full">
      <form
        onSubmit={handleSubmit}
        method="get"
        role="search"
        aria-label="Search"
      >
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search for anything..."
          prefixIcon={MagnifyingGlassIcon}
          className={className}
          suffixIcon={
            <kbd className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-primary-light/60 dark:bg-primary-dark/60 rounded-lg hidden sm:inline">
              /
            </kbd>
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search input"
        />
      </form>
    </div>
  );
}
