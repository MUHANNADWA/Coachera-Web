import { Button } from "../../../shared/components/form/Button";
import { useAppHook } from "../../../shared/hooks/useAppHook";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { navigate } = useAppHook();

  return (
    <div className="px-3 py-3 hidden lg:block">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                {index > 0 && ">"}
                <Button
                  onClick={() => navigate(item.path ?? "#")}
                  className="ml-2 min-w-8 max-w-40 truncate hover:text-primary hover:underline hover:bg-transparent!"
                >
                  {" "}
                  {item.label}{" "}
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
