import { useState } from "react";
import {
  PlayCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../../shared/components/Button";
import { Material, Module } from "../../../shared/types/types";

type CourseModulesProps = {
  modules: Module[];
};

export function CourseModules({ modules }: CourseModulesProps) {
  return (
    <div className="space-y-6 border rounded-lg shadow p-6 bg-white">
      {modules.map((mod) => (
        <ModuleCard key={mod.id} module={mod} />
      ))}
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
          className="text-blue-600 text-sm font-medium hover:underline">
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
  return materials.reduce((sum, item) => sum + parseInt(item.duration), 0);
}
