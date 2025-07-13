import { useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import {
  ENTITY_TYPES,
  SORT_DIRECTION_FIELDS,
  SORT_FIELDS,
} from "../utils/Utils";
import SidebarHeader from "./SidebarHeader";

interface CoursesSidebarProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  entityType?: string;
  setEntityType?: React.Dispatch<React.SetStateAction<string>>;
}

export default function FiltersSidebar(props: CoursesSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Sidebar
      className={
        collapsed
          ? "w-12 max-sm:bg-transparent max-sm:h-15"
          : "w-70 max-sm:pr-8 max-sm:w-screen"
      }>
      <SidebarHeader
        label="Filters"
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      {/* Course Content */}
      {!collapsed && (
        <>
          <Input
            label="Result Per Page"
            inputMode="numeric"
            type="number"
            value={props.size}
            min={5}
            max={100}
            step={5}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              if (newSize >= 1 && newSize <= 100) {
                props.setSize(newSize);
                props.setPage(0);
              }
            }}
          />

          <Select
            label="Sort By"
            value={props.sortBy}
            options={SORT_FIELDS}
            onChange={(e) => {
              props.setSortBy(e.target.value);
              props.setPage(0);
            }}></Select>

          <Select
            label="Sort Direction"
            value={props.sortDirection}
            options={SORT_DIRECTION_FIELDS}
            onChange={(e) => {
              props.setSortDirection(e.target.value as "asc" | "desc");
              props.setPage(0);
            }}></Select>

          {props.entityType && (
            <Select
              label="Type"
              value={props.entityType}
              options={ENTITY_TYPES}
              onChange={(e) => {
                props.setEntityType!(e.target.value);
                props.setPage(0);
              }}></Select>
          )}
        </>
      )}
    </Sidebar>
  );
}
