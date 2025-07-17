import { useState } from "react";
import {
  PlayCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  ListBulletIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Course, Material, Module } from "../../../shared/types/types";

interface CourseModulesProps {
  course: Course;
}

export function CourseModules({ course }: CourseModulesProps) {
  const modules = course.modules;
  const allSections = modules.flatMap((m) => m.sections);
  const allMaterials = allSections.flatMap((s) => s.materials);

  const countByType = (type: Material["type"]): number =>
    allMaterials.filter((m) => m.type === type).length;

  return (
    <section className="consect p-8 mb-8 space-y-8">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <RectangleStackIcon className="w-6 h-6 text-primary" />
          Course Content
        </h2>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm text-gray-700">
        <SummaryItem
          icon={RectangleStackIcon}
          label="Modules"
          value={modules.length}
        />
        <SummaryItem
          icon={ListBulletIcon}
          label="Sections"
          value={allSections.length}
        />
        <SummaryItem
          icon={PlayCircleIcon}
          label="Videos"
          value={countByType("VIDEO")}
        />
        <SummaryItem
          icon={DocumentTextIcon}
          label="Articles"
          value={countByType("ARTICLE")}
        />
        <SummaryItem
          icon={ClipboardDocumentListIcon}
          label="Quizzes"
          value={countByType("QUIZ")}
        />
      </div>

      <ul className="space-y-6">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </ul>
    </section>
  );
}

interface SummaryItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
}
function SummaryItem({ icon: Icon, label, value }: SummaryItemProps) {
  return (
    <div className="consect flex items-center gap-2 px-3 py-2">
      <Icon className="h-5 w-5 text-primary" />
      <span className="font-semibold text-gray-900">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

interface ModuleCardProps {
  module: Module;
}
function ModuleCard({ module }: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false);

  const groupMaterials = (
    materials: Material[],
    type: Material["type"]
  ): Material[] => materials.filter((m) => m.type === type);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  return (
    <li className="consect">
      <header
        className="flex justify-between items-center px-6 py-4 cursor-pointer select-none group"
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        aria-controls={`module-sections-${module.id}`}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggle(e);
        }}>
        <div>
          <h3 className="text-xl font-semibold text-primary-dark flex items-center gap-2">
            <RectangleStackIcon className="w-5 h-5 text-primary" />
            {module.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Module • {module.sections.length} section
            {module.sections.length > 1 ? "s" : ""}
          </p>
        </div>
        <span className="ml-4">
          {expanded ? (
            <ChevronDownIcon className="w-6 h-6 text-primary transition-transform duration-200" />
          ) : (
            <ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-transform duration-200" />
          )}
        </span>
      </header>

      <div
        id={`module-sections-${module.id}`}
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[1000px] py-4 px-6" : "max-h-0 p-0"
        }`}
        aria-hidden={!expanded}>
        {expanded && (
          <div className="space-y-6">
            {module.sections.map((section) => {
              const videos = groupMaterials(section.materials, "VIDEO");
              const articles = groupMaterials(section.materials, "ARTICLE");
              const quizzes = groupMaterials(section.materials, "QUIZ");

              return (
                <section key={section.id} className="mb-4">
                  <h4 className="font-semibold text-lg mb-2 text-primary-dark flex items-center gap-2">
                    <ListBulletIcon className="w-4 h-4 text-primary" />
                    {section.title}
                  </h4>
                  <MaterialList
                    materials={videos}
                    label="Videos"
                    Icon={PlayCircleIcon}
                  />
                  <MaterialList
                    materials={articles}
                    label="Articles"
                    Icon={DocumentTextIcon}
                  />
                  <MaterialList
                    materials={quizzes}
                    label="Quizzes"
                    Icon={ClipboardDocumentListIcon}
                  />
                </section>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
}

interface MaterialListProps {
  materials: Material[];
  label: string;
  Icon: React.ElementType;
}
function MaterialList({ materials, label, Icon }: MaterialListProps) {
  if (!materials.length) return null;
  return (
    <div className="mb-2">
      <h5 className="flex items-center font-medium text-gray-700 mb-1 text-sm">
        <Icon className="h-4 w-4 mr-1 text-primary" />
        {label} • {materials.length} item{materials.length > 1 ? "s" : ""} •{" "}
        {totalDuration(materials)} min
      </h5>
      <ul className="ml-7 space-y-1 text-sm text-gray-700 list-disc">
        {materials.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.title}</span>
            <span className="text-gray-500 text-xs">{item.duration} min</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function totalDuration(materials: Material[]): number {
  return materials.reduce(
    (sum, item) => sum + parseInt(item.duration || "0"),
    0
  );
}
