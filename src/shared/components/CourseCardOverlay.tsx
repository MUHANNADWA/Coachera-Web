// shared/components/CourseCardOverlay.tsx
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./form/Button";
import { Course } from "../types/types";

type Mode = "none" | "org" | "inst";

export function AddCourseCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card group min-w-[300px] h-full flex items-center justify-center p-6 border-dashed border-2 border-primary/30 hover:border-primary"
      aria-label="Add a new course"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="rounded-full p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <PlusIcon className="w-7 h-7 text-primary" />
        </span>
        <span className="text-primary font-semibold">Add Course</span>
      </div>
    </button>
  );
}

export function CourseCardWithOverlay({
  course,
  children,
  mode = "none",
  onEdit,
  onDelete,
}: {
  course: Course;
  children: React.ReactNode;
  mode?: Mode;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
}) {
  const showEdit = mode === "inst";
  const showDelete = mode === "org";

  return (
    <div className="relative">
      {children}

      {(showEdit || showDelete) && (
        <div className="absolute top-2 right-2 flex gap-1">
          {showEdit && (
            <Button
              type="button"
              variant="secondary"
              className="m-0! p-2! rounded-full!"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(course);
              }}
              aria-label="Edit course"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </Button>
          )}
          {showDelete && (
            <Button
              type="button"
              variant="secondary"
              className="m-0! p-2! rounded-full!"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(course);
              }}
              aria-label="Delete course"
            >
              <TrashIcon className="w-5 h-5 text-danger" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
