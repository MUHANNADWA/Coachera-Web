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
    navigate(`/search/${query}`);
  };

  return (
    <div className="relative max-w-xs w-full">
      <form onSubmit={handleSubmit} method="get">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search for anything..."
          prefixIcon={MagnifyingGlassIcon}
          className={className}
          suffixIcon={
            <kbd className="h-5 w-5 px-3 py-1.5 text-xs text-gray-500 bg-primary-light dark:bg-primary-dark rounded-lg hidden sm:inline">
              /
            </kbd>
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
