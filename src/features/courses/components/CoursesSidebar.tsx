import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CoursesSidebarProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function CoursesSidebar(props: CoursesSidebarProps) {
  const SORT_FIELDS = [
    { value: "title", label: "Title" },
    { value: "createdAt", label: "Time Created" },
    { value: "updatedAt", label: "Time Updated" },
    { value: "durationHours", label: "Duration Hours" },
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <aside
      className={`h-full pl-8 pr-4 py-4 top-0 left-0 shadow-sm transition-all duration-300 overflow-x-hidden overflow-y-auto ${
        collapsed ? "w-12" : "w-70"
      }`}>
      <header
        className={`flex items-center justify-between transition-all duration-300 ${
          !collapsed ? "p-4" : "ml-[-20px]"
        }`}>
        {!collapsed && <h1 className=" text-xl font-bold">Filters</h1>}
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </header>

      {/* Course Content */}
      {!collapsed && (
        <>
          <div>
            <label className="w-full">
              <h4 className="text-center font-semibold p-2">
                <hr />
                Results at page
                <hr />
              </h4>
            </label>

            <select
              className="w-full px-3 py-2 rounded"
              value={props.size}
              onChange={(e) => {
                props.setSize(Number(e.target.value));
                props.setPage(0);
              }}>
              {[3, 6, 9, 12].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="w-full">
              <h4 className="text-center font-semibold p-2">
                <hr />
                Sort By
                <hr />
              </h4>
            </label>
            <select
              className="w-full px-3 py-2 rounded"
              value={props.sortBy}
              onChange={(e) => {
                props.setSortBy(e.target.value);
                props.setPage(0);
              }}>
              {SORT_FIELDS.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="w-full">
              <h4 className="text-center font-semibold p-2">
                <hr />
                Sort Direction
                <hr />
              </h4>
            </label>
            <select
              className="w-full px-3 py-2 rounded"
              value={props.sortDirection}
              onChange={(e) => {
                props.setSortDirection(e.target.value as "asc" | "desc");
                props.setPage(0);
              }}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </>
      )}
    </aside>
  );
}
