import CoursesView from "../../../shared/components/CoursesView";

export default function CoursesPage() {
  return (
    <section className="max-w-8xl mx-auto px-4 py-10 dark:bg-dark">
      <CoursesView variant="all" layout="grid" />
    </section>
  );
}
