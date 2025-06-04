import { Bars3Icon } from "@heroicons/react/24/outline";
import { Module } from "../../../shared/types/types";
import { CurrentMaterial } from "../types";
import { toggleCourseSidebar } from "../courseSidebarSlice";
import { useState } from "react";
import getMateialIcon from "../utils/MaterialIcon";
import { useAppHook } from "../../../shared/hooks/useAppHook";

interface CourseSidebarProps {
  module: Module;
  currentMaterial: CurrentMaterial;
  setCurrentMaterial: (currentMaterial: CurrentMaterial) => void;
}

export default function CourseSidebar({
  module,
  currentMaterial,
  setCurrentMaterial,
}: CourseSidebarProps) {
  const { dispatch, courseSidebarCollapsed } = useAppHook();

  const toggleCollapse = () => dispatch(toggleCourseSidebar());

  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(
    new Set()
  );
  const toggleSectionCollapse = (sectionId: number) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
      return newSet;
    });
  };

  const isCurrentMaterial = (sectionId: number, materialId: number) =>
    sectionId === currentMaterial.sectionId &&
    materialId === currentMaterial.materialId;

  return (
    <aside
      className={`h-full pl-8 pr-4 py-4 top-0 left-0 shadow-sm transition-all duration-300 overflow-x-hidden overflow-y-auto ${
        courseSidebarCollapsed ? "w-12" : "w-70"
      }`}
    >
      <header
        className={`flex items-center justify-between transition-all duration-300 ${
          !courseSidebarCollapsed ? "p-4" : "ml-[-20px]"
        }`}
      >
        {!courseSidebarCollapsed && (
          <h1 className="font-bold">{module.title}</h1>
        )}
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </header>

      {/* Course Content */}
      {!courseSidebarCollapsed &&
        module.sections.map((section) => (
          <section key={section.id}>
            <button
              onClick={() => toggleSectionCollapse(section.id)}
              className="cursor-pointer w-full"
            >
              <h4 className="hover:bg-primary-light font-semibold p-2">
                <hr />
                {section.title}
                <hr />
              </h4>
            </button>

            {!collapsedSections.has(section.id) && (
              <ul>
                {section.materials.map((material) => (
                  <li
                    key={material.id}
                    className={`p-4 cursor-pointer hover:bg-primary-light ${
                      isCurrentMaterial(section.id, material.id)
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentMaterial({
                        sectionId: section.id,
                        materialId: material.id,
                      })
                    }
                  >
                    <div className="flex items-center relative">
                      <div
                        className={`w-4 h-4 flex items-center justify-center mr-5 before:absolute before:top-[3] before:left-[-10] before:w-7 before:h-7 before:rounded-lg [&>*:first-child]:z-45 ${
                          isCurrentMaterial(section.id, material.id)
                            ? "before:bg-blue-500 text-white"
                            : "before:bg-gray-200 text-gray-600"
                        }`}
                      >
                        {getMateialIcon(material.type)}
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isCurrentMaterial(section.id, material.id)
                              ? "font-medium text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          {material.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {material.duration}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
    </aside>
  );
}
