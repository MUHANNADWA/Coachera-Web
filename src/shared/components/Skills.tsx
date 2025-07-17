import { Skill } from "../types/types";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

interface SkillsProps {
  skills: Skill[];
  variant?: "default" | "compact" | "detailed";
  maxDisplay?: number;
  showCount?: boolean;
  className?: string;
}

export default function Skills({
  skills,
  variant = "default",
  maxDisplay,
  showCount = false,
  className = "",
}: SkillsProps) {
  const displaySkills = maxDisplay ? skills.slice(0, maxDisplay) : skills;
  const remainingCount = maxDisplay ? skills.length - maxDisplay : 0;

  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "flex flex-wrap gap-1.5";
      case "detailed":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";
      default:
        return "flex flex-wrap gap-2";
    }
  };

  const getSkillClasses = () => {
    switch (variant) {
      case "compact":
        return "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1";
      case "detailed":
        return "flex items-center gap-2 px-4 py-3 text-sm font-medium bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50";
      default:
        return "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary text-white rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1";
    }
  };

  if (!skills || skills.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <AcademicCapIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
        <p className="text-sm">No skills available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showCount && (
        <div className="flex items-center gap-2 mb-3">
          <AcademicCapIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-gray-700">
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <ul className={getVariantClasses()} role="list" aria-label="Skills list">
        {displaySkills.map((skill: Skill) => (
          <li key={skill.id} role="listitem">
            <button
              type="button"
              className={getSkillClasses()}
              aria-label={`Skill: ${skill.name}`}>
              {variant === "detailed" && (
                <AcademicCapIcon className="w-4 h-4" />
              )}
              <span className="truncate">{skill.name}</span>
            </button>
          </li>
        ))}

        {remainingCount > 0 && (
          <li role="listitem">
            <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-600 rounded-full">
              +{remainingCount} more
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
