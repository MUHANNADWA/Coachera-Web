import { ReactNode, forwardRef } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

// forwardRef to allow ref to be passed from parent
const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <aside
        ref={ref}
        {...props}
        className={`bg-white max-sm:absolute max-sm:h-15 max-sm:top-2.5 block h-full pl-8 pr-4 py-4 top-0 left-0 max-sm:shadow-none shadow-sm transition-all duration-300 overflow-x-hidden overflow-y-auto z-45 ${className}`}>
        {children}
      </aside>
    );
  }
);

export default Sidebar;
