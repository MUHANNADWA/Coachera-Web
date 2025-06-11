import { Course } from "../../../shared/types/types";
import { CurrentMaterial } from "../types";
import { getBreadcrumbs } from "../utils/Utils";
import Breadcrumb from "./Breadcrumb";

interface CourseHeaderProps {
  course: Course;
  currentMaterial: CurrentMaterial;
  prevExists: boolean;
  handlePrev: () => void;
  nextExists: boolean;
  handleNext: () => void;
}

export default function CourseHeader(props: CourseHeaderProps) {
  return (
    <header className="flex items-center justify-between my-4">
      <button
        onClick={props.handlePrev}
        disabled={!props.prevExists}
        className="cursor-pointer disabled:text-gray-400 px-6 py-3 hover:text-primary">
        {"< Previous"}
      </button>

      <Breadcrumb
        items={getBreadcrumbs(props.course, props.currentMaterial!.materialId)}
      />

      <button
        onClick={props.handleNext}
        disabled={!props.nextExists}
        className="cursor-pointer disabled:text-gray-400 px-6 py-3 hover:text-primary">
        {"Next >"}
      </button>
    </header>
  );
}
