import { useState } from "react";
import {
  PlayCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
type Item = { title: string; duration: string };

type Module = {
  title: string;
  duration: string;
  description: string;
  videos: Item[];
  readings: Item[];
  assignments: Item[];
  prompts: Item[];
};

type CourseModulesProps = {
  modules: Module[];
};

export function CourseModules({ modules }: CourseModulesProps) {
  return (
    <div className="space-y-6 border rounded-lg shadow p-6 bg-white">
      {modules.map((mod, index) => (
        <ModuleCard key={index} {...mod} />
      ))}
    </div>
  );
}

function ModuleCard({
  title,
  duration,
  description,
  videos,
  readings,
  assignments,
  prompts,
}: Module) {
  const [expanded, setExpanded] = useState(false);

  const renderList = (items: Item[], label: string, Icon: any) =>
    items.length > 0 && (
      <div className="mt-4">
        <h4 className="flex items-center font-medium text-gray-700 mb-2">
          <Icon className="h-5 w-5 mr-2" />
          {label} • {items.length} items • {totalDuration(items)} minutes
        </h4>
        <ul className="ml-7 space-y-2 text-sm text-gray-700 list-disc">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-gray-500">{item.duration} min</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">Module • {duration}</p>
          {expanded && <p className="mt-3 text-gray-700">{description}</p>}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-sm font-medium hover:underline">
          {expanded ? "Hide details" : "Show module details"}
        </button>
      </div>

      {expanded && (
        <div className="mt-6">
          {renderList(videos, "Videos", PlayCircleIcon)}
          {renderList(readings, "Readings", DocumentTextIcon)}
          {renderList(assignments, "Assignments", ClipboardDocumentListIcon)}
          {renderList(prompts, "Discussion Prompts", ChatBubbleOvalLeftIcon)}
        </div>
      )}
      <hr />
    </div>
  );
}

function totalDuration(items: Item[]): number {
  return items.reduce((sum, item) => sum + parseInt(item.duration), 0);
}
