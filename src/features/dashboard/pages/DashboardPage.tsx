import RichTextEditor from "../../../shared/components/RichTextEditor";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <RichTextEditor />
      </div>
    </div>
  );
}
