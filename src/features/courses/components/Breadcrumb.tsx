import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="px-3 py-3 hidden lg:block">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                {index > 0 && ">"}
                <Link
                  to={item.path ?? "#"}
                  className="pl-2 text-sm font-medium min-w-8 max-w-32 truncate hover:text-gray-700">
                  {" "}
                  {item.label}{" "}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
