import { Skill } from "../types/types";

interface SkillProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillProps) {
  return (
    <ul className="space-y-2">
      {skills.map((skill: Skill) => (
        <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">
          {skill.name}
        </li>
      ))}
    </ul>
  );
}
