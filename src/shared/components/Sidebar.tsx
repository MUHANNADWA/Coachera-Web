import { ReactNode, forwardRef } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <aside
        ref={ref}
        {...props}
        className={`bg-white border-r border-gray-200 sticky top-20.5 h-full-s block pl-8 pr-4 py-4 left-0 transition-all duration-300 overflow-y-auto z-45
        max-sm:top-15.5 max-sm:left-0 max-sm:h-full max-sm:border-none max-sm:fixed ${className}`}>
        {children}
      </aside>
    );
  }
);

export default Sidebar;
