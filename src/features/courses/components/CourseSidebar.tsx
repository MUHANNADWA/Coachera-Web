import { Module } from "../../../shared/types/types";
import { CurrentMaterial } from "../types";
import { getMaterialIcon } from "../utils/Utils";
import { Button } from "../../../shared/components/form/Button";
import useCourseSidebar from "../hooks/useCourseSidebar";
import Sidebar from "../../../shared/components/Sidebar";
import SidebarHeader from "./SidebarHeader";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

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
        courseSidebarCollapsed
          ? `max-sm:h-15! max-sm:bg-transparent w-14`
          : `w-70 max-sm:w-full`
      }
    >
      <SidebarHeader
        label={module.title}
        collapsed={courseSidebarCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Course Content */}
      {!courseSidebarCollapsed &&
        module.sections.map((section) => (
          <section key={section.id}>
            <Button
              className="flex items-center"
              full
              onClick={() => toggleSectionCollapse(section.id)}
            >
              <h4 className="font-semibold p-2 rounded-2xl">{section.title}</h4>
              {collapsedSections.has(section.id) ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronUpIcon className="w-4 h-4" />
              )}
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
                    className={`cursor-pointer transition-colors rounded-2xl hover:bg-primary-light dark:hover:bg-primary-dark p-4 justify-start ${
                      isCurrentMaterial(section.id, material.id) &&
                      "bg-blue-50 dark:bg-primary-darkest border-l-4 border-l-primary"
                    }`}
                    onClick={() => {
                      setCurrentMaterial({
                        sectionId: section.id,
                        materialId: material.id,
                      });
                      window.innerWidth <= 768 && toggleCollapse();
                    }}
                  >
                    <div className="flex items-center relative">
                      <div
                        className={`w-4 h-4 flex items-center justify-center mr-5 before:absolute before:top-[3] before:left-[-10] before:w-7 before:h-7 before:rounded-2xl [&>*:first-child]:z-45 ${
                          isCurrentMaterial(section.id, material.id)
                            ? "before:bg-primary text-white dark:text-primary-darkest"
                            : "before:bg-gray-200 dark:before:bg-primary-darkest text-gray-600 dark:text-primary/70"
                        }`}
                      >
                        {getMaterialIcon(material.type)}
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isCurrentMaterial(section.id, material.id)
                              ? "font-semibold text-primary"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {material.title}
                        </p>
                        <p className="text-xs text-gray-500 flex justify-self-start">
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
