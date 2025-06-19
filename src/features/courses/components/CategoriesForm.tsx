// components/CategoryForm.tsx
import { useState, useMemo } from "react";
import * as TablerIcons from "@tabler/icons-react";
import { Button } from "../../../shared/components/Button";

function pascalToKebab(name: string) {
  return name
    .replace(/^Icon/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function kebabToPascal(kebab: string) {
  return (
    "Icon" +
    kebab
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("")
  );
}

const ALL_ICONS = Object.keys(TablerIcons)
  .filter((name) => name.startsWith("Icon"))
  .map((name) => ({
    name,
    kebab: pascalToKebab(name),
    Component: (TablerIcons as any)[name],
  }));

export default function CategoryForm() {
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(
    () =>
      ALL_ICONS.filter(({ kebab }) =>
        kebab.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleSubmit = () => {
    const payload = {
      title,
      icon: selectedIcon,
    };
    console.log("Submit:", payload);
  };

  const SelectedPreview =
    (TablerIcons as any)[kebabToPascal(selectedIcon)] ?? null;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Create Category</h1>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Title</span>
          <input
            placeholder="Enter category title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Search Icon</span>
          <input
            placeholder="Search tabler icon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {selectedIcon && SelectedPreview && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Selected:</span>
            <SelectedPreview size={28} />
            <span className="text-sm text-gray-600">{selectedIcon}</span>
          </div>
        )}

        <div className="max-h-[400px] overflow-y-scroll grid grid-cols-8 gap-2 p-2 border rounded-md">
          {filteredIcons.map(({ kebab, Component }) => (
            <button
              key={kebab}
              type="button"
              onClick={() => setSelectedIcon(kebab)}
              className={`p-2 rounded border flex items-center justify-center hover:bg-gray-100 transition ${
                selectedIcon === kebab
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-200"
              }`}>
              <Component size={20} />
            </button>
          ))}
        </div>

        <Button onClick={handleSubmit} variant="primary">
          Create Category
        </Button>
      </div>
    </div>
  );
}
