import { useState, useCallback } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import Input from "../../../shared/components/form/Input";
import Dropdown from "../../../shared/components/form/Dropdown";
import {
  ENTITY_TYPES,
  SORT_DIRECTION_FIELDS,
  SORT_FIELDS,
} from "../utils/Utils";
import SidebarHeader from "./SidebarHeader";

interface FiltersSidebarProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  entityType?: string;
  setEntityType?: React.Dispatch<React.SetStateAction<string>>;
  onReset?: () => void;
  className?: string;
}

export default function FiltersSidebar({
  setPage,
  size,
  setSize,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  entityType,
  setEntityType,
  className = "",
}: FiltersSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = Number(e.target.value);
      if (newSize >= 5 && newSize <= 100) {
        setSize(newSize);
        setPage(0);
        setIsDirty(true);
      }
    },
    [setSize, setPage]
  );

  const hasActiveFilters =
    isDirty ||
    size !== 10 ||
    sortBy !== "createdAt" ||
    sortDirection !== "desc" ||
    entityType !== "courses";

  return (
    <Sidebar
      className={
        collapsed
          ? `max-sm:h-15! max-sm:bg-transparent w-14 ${className}`
          : `w-70 max-sm:w-full ${className}`
      }
    >
      <SidebarHeader
        label="Filters"
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      {!collapsed && (
        <div className="space-y-8">
          {/* Active Filters Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-2">
              {size !== 10 && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  {size} per page
                  <button
                    onClick={() => {
                      setSize(10);
                      setIsDirty(true);
                    }}
                    className="ml-1 text-primary hover:text-danger"
                  >
                    ×
                  </button>
                </span>
              )}
              {sortBy !== "createdAt" && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  Sort: {sortBy}
                  <button
                    onClick={() => {
                      setSortBy("createdAt");
                      setIsDirty(true);
                    }}
                    className="ml-1 text-primary hover:text-danger"
                  >
                    ×
                  </button>
                </span>
              )}
              {sortDirection !== "desc" && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  {sortDirection}
                  <button
                    onClick={() => {
                      setSortDirection("desc");
                      setIsDirty(true);
                    }}
                    className="ml-1 text-primary hover:text-danger"
                  >
                    ×
                  </button>
                </span>
              )}
              {entityType && entityType !== "courses" && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  {entityType}
                  <button
                    onClick={() => {
                      setEntityType && setEntityType("courses");
                      setIsDirty(true);
                    }}
                    className="ml-1 text-primary hover:text-danger"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Filters Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Input
                label="Results Per Page"
                inputMode="numeric"
                type="number"
                value={size}
                min={5}
                max={100}
                step={5}
                onChange={handleSizeChange}
                className="w-full"
                aria-describedby="size-help"
              />
              <p id="size-help" className="text-xs text-gray-400 mt-1">
                Choose between 5 and 100 results per page
              </p>
            </div>
            <div>
              <Dropdown
                label="Sort By"
                value={sortBy}
                options={SORT_FIELDS}
                onChange={(val) => {
                  setSortBy(val);
                  setPage(0);
                  setIsDirty(true);
                }}
                className="w-full"
              />
            </div>
            <div>
              <Dropdown
                label="Sort Direction"
                value={sortDirection}
                options={SORT_DIRECTION_FIELDS}
                onChange={(val) => {
                  setSortDirection(val as "asc" | "desc");
                  setPage(0);
                  setIsDirty(true);
                }}
                className="w-full"
              />
            </div>
            {entityType && setEntityType && (
              <div>
                <Dropdown
                  label="Content Type"
                  value={entityType}
                  options={ENTITY_TYPES}
                  onChange={(val) => {
                    setEntityType(val);
                    setPage(0);
                    setIsDirty(true);
                  }}
                  className="w-full"
                />
              </div>
            )}
          </form>
        </div>
      )}
    </Sidebar>
  );
}
