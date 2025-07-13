import { useState } from "react";
import {
  PlayCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../../shared/components/Button";
import { Course, Material, Module } from "../../../shared/types/types";

type CourseModulesProps = {
  course: Course;
};

export function CourseModules({ course }: CourseModulesProps) {
  const modules = course.modules;

  const allSections = modules.flatMap((m) => m.sections);
  const allMaterials = allSections.flatMap((s) => s.materials);

  const countByType = (type: Material["type"]) =>
    allMaterials.filter((m) => m.type === type).length;

  return (
    <div className="consect p-8 mb-8 space-y-6">
      <p className="text-xl font-semibold">{course.title}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm text-gray-700 mt-4">
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

      {modules.map((mod) => (
        <ModuleCard key={mod.id} module={mod} />
      ))}
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      <span className="font-medium">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const [expanded, setExpanded] = useState(false);

  const groupMaterials = (materials: Material[], type: Material["type"]) =>
    materials.filter((m) => m.type === type);

  const renderList = (
    materials: Material[],
    label: string,
    Icon: React.ElementType
  ) =>
    materials.length > 0 && (
      <div className="mt-4">
        <h4 className="flex items-center font-medium text-gray-700 mb-2">
          <Icon className="h-5 w-5 mr-2" />
          {label} • {materials.length} items • {totalDuration(materials)}{" "}
          minutes
        </h4>
        <ul className="ml-7 space-y-2 text-sm text-gray-700 list-disc">
          {materials.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-gray-500">{item.duration} min</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{module.title}</h2>
          <p className="text-sm text-gray-500">
            Module • {module.sections.length} section
            {module.sections.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => setExpanded(!expanded)}
          className="text-primary text-sm font-medium hover:underline">
          {expanded ? "Hide details" : "Show module details"}
        </Button>
      </div>

      {expanded && (
        <div className="mt-6 space-y-6">
          {module.sections.map((section) => {
            const videos = groupMaterials(section.materials, "VIDEO");
            const articles = groupMaterials(section.materials, "ARTICLE");
            const quizzes = groupMaterials(section.materials, "QUIZ");

            return (
              <div key={section.id}>
                <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                {renderList(videos, "Videos", PlayCircleIcon)}
                {renderList(articles, "Articles", DocumentTextIcon)}
                {renderList(quizzes, "Quizzes", ClipboardDocumentListIcon)}
              </div>
            );
          })}
        </div>
      )}
      <hr className="mt-6" />
    </div>
  );
}

function totalDuration(materials: Material[]): number {
  return materials.reduce(
    (sum, item) => sum + parseInt(item.duration || "0"),
    0
  );
}
