import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "../../../shared/components/form/Button";

export default function SidebarHeader(props: {
  collapsed: boolean;
  toggleCollapse: () => void;
  label: string;
}) {
  return (
    <header
      className={`flex items-center justify-between transition-all duration-300 ${
        !props.collapsed ? "pb-6" : "ml-[-20px]"
      }`}>
      {!props.collapsed && <h1 className="text-xl font-bold">{props.label}</h1>}
      <Button onClick={props.toggleCollapse}>
        <Bars3Icon className="h-6 w-6 hover:text-primary z-5" />
        <span
          className={
            props.collapsed
              ? "hidden max-sm:block consect h-10 w-10 inset-0 absolute -top-2 -left-2"
              : ""
          }></span>
      </Button>
    </header>
  );
}
