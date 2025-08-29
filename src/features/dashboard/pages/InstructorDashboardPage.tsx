import {
  PlusCircleIcon,
  WrenchScrewdriverIcon,
  BellAlertIcon,
  ChartBarIcon,
  StarIcon,
  UsersIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { Button } from "../../../shared/components/form/Button";
import CoursesView from "../../../shared/components/CoursesView";

function KpiCard({
  title,
  value,
  icon: Icon,
  hint,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  hint?: string;
}) {
  return (
    <div className="consect p-5 rounded-2xl flex items-start gap-4">
      <div className="bg-primary/10 text-primary rounded-xl p-3">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {hint && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

/** Section wrapper with header actions */
function Section({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

export default function InstructorDashboardPage() {
  const { navigate, user } = useAppHook();
  const [tab, setTab] = useState<"courses" | "analytics">("courses");

  // These can come from your analytics API later
  const kpis = [
    {
      title: "Total Courses",
      value: 12,
      icon: BookOpenIcon,
      hint: "+2 this month",
    },
    {
      title: "Active Students",
      value: 540,
      icon: UsersIcon,
      hint: "+8% vs last month",
    },
    {
      title: "Avg Rating",
      value: "4.7",
      icon: StarIcon,
      hint: "Based on 1,240 reviews",
    },
    {
      title: "Revenue (30d)",
      value: "$6,420",
      icon: BanknotesIcon,
      hint: "+$820 vs prev 30d",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            Welcome back
            {(user as any)?.details?.firstName
              ? `, ${(user as any).details.firstName}`
              : ""}{" "}
            👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, manage, and analyze your courses from one place.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate("/add-course")}
            className="flex items-center gap-2"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add Course
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/manage-lesson/1")}
            className="flex items-center gap-2"
          >
            <WrenchScrewdriverIcon className="w-5 h-5" />
            Manage Lessons
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/notifications")}
            className="flex items-center gap-2"
          >
            <BellAlertIcon className="w-5 h-5" />
            Notifications
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} />
        ))}
      </div>

      {/* Tabs */}
      <div className="consect rounded-2xl p-2 inline-flex mb-6">
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            tab === "courses"
              ? "bg-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-dark"
          }`}
          onClick={() => setTab("courses")}
          type="button"
        >
          My Courses
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            tab === "analytics"
              ? "bg-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-dark"
          }`}
          onClick={() => setTab("analytics")}
          type="button"
        >
          Analytics
        </button>
      </div>

      {/* Content */}
      {tab === "courses" ? (
        <Section
          title="Instructor Courses"
          actions={
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate("/edit-course")}
                className="flex items-center gap-2"
              >
                <WrenchScrewdriverIcon className="w-5 h-5" />
                Edit Course
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/add-course")}
                className="flex items-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add Course
              </Button>
            </div>
          }
        >
          {/* Instructor courses feed */}
          <CoursesView
            variant="inst"
            instructorId={user?.id}
            showLayoutToggle
          />
        </Section>
      ) : (
        <Section
          title="Performance Overview"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5" />
                Export
              </Button>
            </div>
          }
        >
          <div className="consect rounded-2xl p-6">
            {/* You can inject charts here later */}
            <p className="text-gray-600 dark:text-gray-400">
              Add your analytics charts (enrollments, completion rate, earnings)
              here.
            </p>
          </div>
        </Section>
      )}
    </div>
  );
}
