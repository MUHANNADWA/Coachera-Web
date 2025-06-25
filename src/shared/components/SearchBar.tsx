import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
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
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for courses..."
          className="search-input focus:outline focus:outline-primary w-full px-10 py-2 rounded-lg border border-gray-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
      <kbd className="h-5 px-1.5 text-xs text-gray-400 absolute right-3 top-2.5 bg-gray-100 rounded hidden sm:inline group-focus-within:hidden">
        /
      </kbd>
    </div>
  );
}
