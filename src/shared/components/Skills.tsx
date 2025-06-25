import { Skill } from "../types/types";
import { Button } from "./Button";

interface SkillProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillProps) {
  return (
    <ul className="space-y-2">
      {skills.map((skill: Skill) => (
        <Button className="px-3 py-1 m-1 inline-block bg-primary hover:bg-primary text-white rounded text-sm">
          {skill.name}
        </Button>
      ))}
    </ul>
  );
}
