import CoursesSection from "../../../shared/components/CoursesSection";
import { Button } from "../../../shared/components/form/Button";
import { useAppHook } from "../../../shared/hooks/useAppHook";

export default function TeachPage() {
  const { navigate } = useAppHook();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        {/* Popular Courses */}
        <CoursesSection variant="popular" />

        <Button variant="primary" onClick={() => navigate("/add-course")}>
          add course
        </Button>
      </div>
    </div>
  );
}
