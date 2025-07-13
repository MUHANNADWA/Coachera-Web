import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CATEGORIES_URL, COURSES_URL } from "../../../constants/constants";
import SearchBar from "../SearchBar";
import { useAppHook } from "../../hooks/useAppHook";
import HeaderLogo from "./HeaderLogo";
import HeaderNotifications from "./HeaderNotifications";
import { Button } from "../Button";
import { HeaderFavorites } from "./HeaderFavorites";
import { HeaderUserDropdown } from "./HeaderUserDropdown";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navigate, token } = useAppHook();

  const isActive = (path: string) => window.location.pathname.startsWith(path);

  return (
    <header className="sticky w-full bg-white/80 top-0 z-50 border-b border-gray-200 backdrop-blur">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo with separation */}
          <div className="pr-4 border-r border-gray-200 flex items-center">
            <HeaderLogo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 font-semibold m-4">
            <Link
              to="/learn/1/1"
              className={`header-element ${
                isActive("/learn") && "active-header-element"
              }`}>
              Learn
            </Link>
            <Link
              to={COURSES_URL}
              className={`header-element ${
                isActive("/courses") && "active-header-element"
              }`}>
              Courses
            </Link>
            <Link
              to={CATEGORIES_URL}
              className={`header-element ${
                isActive("/categories") && "active-header-element"
              }`}>
              Categories
            </Link>
            <Link
              to="/prices"
              className={`header-element ${
                isActive("/prices") && "active-header-element"
              }`}>
              Prices
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:block ml-4 mr-2">
            <SearchBar />
          </div>

          {/* Burger Icon */}
          <Button
            className="lg:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </Button>

          {/* Desktop User */}
          <div className="hidden lg:flex lg:items-center gap-2 ml-4">
            {token ? (
              <>
                <Button>Teach on coachera</Button>
                <HeaderFavorites />
                <HeaderNotifications />
                <HeaderUserDropdown />
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant="secondary"
                  className="my-0">
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="primary"
                  className="my-0">
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu with backdrop and slide-in */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setMenuOpen(false)}></div>
            <div className="fixed top-0 right-0 w-72 h-full bg-white z-50 shadow-2xl p-6 flex flex-col gap-6 animate-slide-in">
              <div className="flex justify-end mb-2">
                <Button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700">
                  <XMarkIcon className="w-6 h-6" />
                </Button>
              </div>
              <HeaderUserDropdown />
              <nav className="bg-white flex flex-col items-start space-y-4 text-lg font-medium">
                <Link
                  to="/learn/1/1"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-2 py-2 rounded-2xl hover:bg-primary/10 hover:text-primary transition">
                  Learn
                </Link>
                <Link
                  to={COURSES_URL}
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-2 py-2 rounded-2xl hover:bg-primary/10 hover:text-primary transition">
                  Courses
                </Link>
                <Link
                  to={CATEGORIES_URL}
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-2 py-2 rounded-2xl hover:bg-primary/10 hover:text-primary transition">
                  Categories
                </Link>
                <Link
                  to="/prices"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-2 py-2 rounded-2xl hover:bg-primary/10 hover:text-primary transition">
                  Prices
                </Link>
              </nav>
              <div className="flex flex-col gap-2 mt-4">
                {token ? (
                  <Button
                    className="border-primary text-primary border-2 font-semibold hover:bg-primary hover:text-white transition w-full bg-transparent"
                    variant="secondary">
                    Teach on coachera
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/login");
                      }}
                      variant="secondary">
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/signup");
                      }}
                      variant="primary">
                      Signup
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
