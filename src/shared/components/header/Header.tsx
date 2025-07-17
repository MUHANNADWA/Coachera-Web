import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderUserMenu from "./HeaderUserMenu";
import SearchBar from "../SearchBar";
import { Button } from "../Button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header
      className="sticky w-full top-0 z-50 border-b border-gray-300 backdrop-blur bg-white/70 transition-shadow"
      role="banner"
      aria-label="Main header">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <HeaderLogo />
          <nav className="hidden lg:flex" aria-label="Primary navigation">
            <HeaderNav currentPath={location.pathname} />
          </nav>
        </div>
        <div className="hidden md:block flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <HeaderUserMenu navigate={navigate} />
        </div>
        <Button
          className="lg:hidden text-gray-700"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}>
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      </div>
      <HeaderMobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPath={location.pathname}
      />
    </header>
  );
}
