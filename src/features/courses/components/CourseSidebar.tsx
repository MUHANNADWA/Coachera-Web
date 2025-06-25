import { Bars3Icon } from "@heroicons/react/24/outline";
import { Module } from "../../../shared/types/types";
import { CurrentMaterial } from "../types";
import { getMaterialIcon } from "../utils/Utils";
import { Button } from "../../../shared/components/Button";
import useCourseSidebar from "../hooks/useCourseSidebar";
import Sidebar from "../../../shared/components/Sidebar";

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
  const {
    toggleCollapse,
    sidebarRef,
    materialRefs,
    collapsedSections,
    toggleSectionCollapse,
    isCurrentMaterial,
    courseSidebarCollapsed,
  } = useCourseSidebar(currentMaterial);

  return (
    <Sidebar
      ref={sidebarRef}
      className={
        courseSidebarCollapsed ? "w-12" : "w-70 max-sm:w-full max-sm:h-full"
      }>
      <header
        className={`flex items-center justify-between transition-all duration-300 ${
          !courseSidebarCollapsed ? "p-4" : "ml-[-20px]"
        }`}>
        {!courseSidebarCollapsed && (
          <h1 className="font-bold">{module.title}</h1>
        )}
        <Button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700">
          <Bars3Icon className="h-6 w-6" />
        </Button>
      </header>

      {/* Course Content */}
      {!courseSidebarCollapsed &&
        module.sections.map((section) => (
          <section key={section.id}>
            <Button full onClick={() => toggleSectionCollapse(section.id)}>
              <h4 className="hover:bg-primary-light font-semibold p-2 w-full">
                <hr />
                {section.title}
                <hr />
              </h4>
            </Button>

            {!collapsedSections.has(section.id) && (
              <ul>
                {section.materials.map((material) => (
                  <li
                    key={material.id}
                    ref={(el) => {
                      materialRefs.current.set(
                        `${section.id}-${material.id}`,
                        el
                      );
                    }}
                    className={`p-4 cursor-pointer rounded hover:bg-primary-light ${
                      isCurrentMaterial(section.id, material.id) &&
                      "bg-blue-50 border-l-4 border-l-blue-500"
                    }`}
                    onClick={() => {
                      setCurrentMaterial({
                        sectionId: section.id,
                        materialId: material.id,
                      });
                      window.innerWidth <= 768 && toggleCollapse();
                    }}>
                    <div className="flex items-center relative">
                      <div
                        className={`w-4 h-4 flex items-center justify-center mr-5 before:absolute before:top-[3] before:left-[-10] before:w-7 before:h-7 before:rounded-lg [&>*:first-child]:z-45 ${
                          isCurrentMaterial(section.id, material.id)
                            ? "before:bg-blue-500 text-white"
                            : "before:bg-gray-200 text-gray-600"
                        }`}>
                        {getMaterialIcon(material.type)}
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isCurrentMaterial(section.id, material.id)
                              ? "font-medium text-primary"
                              : "text-gray-700"
                          }`}>
                          {material.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {material.duration ?? "0:00"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
    </Sidebar>
  );
}
