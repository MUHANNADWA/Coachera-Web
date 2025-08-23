import CoursesView from "../../../../shared/components/CoursesView";

export default function OrgDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold dark:text-white text-center">
          My Orgazniztion Courses
        </h1>
        {/* My Org Courses */}
        <CoursesView variant="org" orgId={1} />
      </div>
    </div>
  );
}
