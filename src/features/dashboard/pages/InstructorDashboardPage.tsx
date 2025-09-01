import {
  StarIcon,
  UsersIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { useAppHook } from "../../../shared/hooks/useAppHook";
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
        <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
        {hint && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
  title?: string;
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
  const { user } = useAppHook();

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
            Welcome back <p className="inline text-primary">{user?.username}</p>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, manage, and analyze your courses from one place.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} />
        ))}
      </div>

      {/* Content */}
      <Section>
        {/* Instructor courses feed */}
        <CoursesView
          title="My Courses"
          variant="inst"
          instructorId={user?.id}
          showLayoutToggle
        />
      </Section>
    </div>
  );
}
