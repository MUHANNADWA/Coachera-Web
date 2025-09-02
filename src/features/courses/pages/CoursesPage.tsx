import CoursesView from "../../../shared/components/CoursesView";

export default function CoursesPage() {
  return (
    <section className="mx-auto px-24 py-10 dark:bg-dark">
      <CoursesView variant="all" layout="grid" />
    </section>
  );
}
