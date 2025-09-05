import {
  UsersIcon,
  PlusCircleIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useAppHook } from "../../../../shared/hooks/useAppHook";
import { Button } from "../../../../shared/components/form/Button";
import CoursesView from "../../../../shared/components/CoursesView";

/** Small KPI card */
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

export default function OrgDashboardPage() {
  const { navigate, user } = useAppHook();

  // Mock KPIs (plug your org analytics here)
  const kpis = [
    {
      title: "Total Courses",
      value: 24,
      icon: BookOpenIcon,
      hint: "+3 this quarter",
    },
    {
      title: "Members",
      value: 1_280,
      icon: UsersIcon,
      hint: "+4% vs last month",
    },
    {
      title: "Active Learners",
      value: 740,
      icon: BuildingOfficeIcon,
      hint: "Last 30 days",
    },
    {
      title: "Spend (30d)",
      value: "$12,300",
      icon: BanknotesIcon,
      hint: "-$500 vs prev 30d",
    },
  ];

  return (
    <div className="max-w-7xl container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6 text-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            Organization Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your organization’s courses, members, and performance.
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
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} />
        ))}
      </div>

      {/* Org courses feed */}
      <CoursesView
        variant="my_org"
        title="My Courses"
        orgId={user?.id}
        showLayoutToggle
      />
    </div>
  );
}
