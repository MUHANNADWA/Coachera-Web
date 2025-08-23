import CoursesView from "../../../shared/components/CoursesView";

export default function InstructorDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        {/* Popular Courses */}
        <CoursesView variant="inst" instructorId={1} />
      </div>
    </div>
  );
}
