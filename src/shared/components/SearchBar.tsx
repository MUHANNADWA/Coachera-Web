import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="relative max-w-xs w-full">
      <form action={`/search/${query}`} method="get">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search for anything..."
          prefixIcon={IconSearch}
          className={className}
          suffixIcon={
            <kbd className="h-5 w-5 px-2 py-1.5 text-xs text-gray-400 bg-gray-100 rounded hidden sm:inline">
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
