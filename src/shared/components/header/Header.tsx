import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
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
  const { location, navigate, token } = useAppHook();
  const isHomePage = location.pathname === "/";
  const headerRef = useRef(null);

  return (
    <header
      ref={headerRef}
      className={`top-0 z-50 ${
        isHomePage ? "text-white" : "border-b border-gray-300"
      }`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <HeaderLogo variant={isHomePage ? "white" : "primary"} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 font-semibold m-4">
            <Link to="/learn/1/1" className="header-element">
              Learn
            </Link>
            <Link to={COURSES_URL} className="header-element">
              Courses
            </Link>
            <Link to={CATEGORIES_URL} className="header-element">
              Categories
            </Link>
            <Link to="/prices" className="header-element">
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
          <div className="hidden lg:flex lg:items-center">
            {token ? (
              <>
                <Button className="">Teach on coachera</Button>
                <HeaderFavorites />
                <HeaderNotifications />
                <HeaderUserDropdown />
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant={isHomePage ? "secondaryInverted" : "secondary"}>
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant={isHomePage ? "primaryInverted" : "primary"}>
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 space-y-4 font-medium">
            <HeaderUserDropdown />
            <nav className="flex flex-col items-start space-y-2">
              <Link to="/learn/1/1" onClick={() => setMenuOpen(false)}>
                Learn
              </Link>
              <Link to={COURSES_URL} onClick={() => setMenuOpen(false)}>
                Courses
              </Link>
              <Link to={COURSES_URL} onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
              <Link to="/prices" onClick={() => setMenuOpen(false)}>
                Prices
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
