import { Link } from "react-router-dom";
import { CATEGORIES_URL, COURSES_URL } from "../../../constants/constants";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Courses", path: COURSES_URL },
  { title: "Categories", path: CATEGORIES_URL },
  { title: "Profile", path: "/profile" },
];

type HeaderNavProps = {
  currentPath: string;
};

export default function HeaderNav({ currentPath }: HeaderNavProps) {
  return (
    <ul className="flex items-center gap-6">
      {navLinks.map((link) => {
        const isActive =
          link.path === "/"
            ? currentPath === "/"
            : currentPath.startsWith(link.path);
        return (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`px-3 py-2 rounded-lg transition-colors font-semibold hover:bg-primary/10 hover:text-primary ${
                isActive ? "bg-primary/10 text-primary" : "text-gray-700"
              }`}
              aria-current={isActive ? "page" : undefined}>
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
