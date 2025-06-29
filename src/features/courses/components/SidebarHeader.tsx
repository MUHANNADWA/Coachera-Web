import { IconMenu4 } from "@tabler/icons-react";
import { Button } from "../../../shared/components/Button";

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
      <Button
        onClick={props.toggleCollapse}
        className="text-gray-500 hover:text-gray-700">
        <IconMenu4 className="h-6 w-6" />
      </Button>
    </header>
  );
}
