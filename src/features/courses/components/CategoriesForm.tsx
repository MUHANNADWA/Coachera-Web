// // components/CategoryForm.tsx
// import { useState, useMemo } from "react";
// import * as TablerIcons from "@tabler/icons-react";
// import { Button } from "../../../shared/components/Button";
// import { FixedSizeGrid as Grid } from "react-window";
// import { debounce } from "../../../utils/debounce";

// function pascalToKebab(name: string) {
//   return name
//     .replace(/^Icon/, "")
//     .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
//     .toLowerCase();
// }

// function kebabToPascal(kebab: string) {
//   return (
//     "Icon" +
//     kebab
//       .split("-")
//       .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//       .join("")
//   );
// }

// const ALL_ICONS = Object.keys(TablerIcons)
//   .filter((name) => name.startsWith("Icon"))
//   .map((name) => ({
//     name,
//     kebab: pascalToKebab(name),
//     Component: (TablerIcons as any)[name],
//   }));

// export default function CategoryForm() {
//   const [title, setTitle] = useState("");
//   const [selectedIcon, setSelectedIcon] = useState<string>("");
//   const [search, setSearch] = useState("");

//   // Debounced search handler
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const debouncedSetSearch = useMemo(
//     () => debounce((val: string) => setDebouncedSearch(val), 200),
//     []
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//     debouncedSetSearch(e.target.value);
//   };

//   const filteredIcons = useMemo(
//     () =>
//       ALL_ICONS.filter(({ kebab }) =>
//         kebab.toLowerCase().includes(debouncedSearch.toLowerCase())
//       ),
//     [debouncedSearch]
//   );

//   // Virtualized grid settings
//   const columnCount = 8;
//   const rowCount = Math.ceil(filteredIcons.length / columnCount);
//   const iconSize = 40;

//   const Cell = ({ columnIndex, rowIndex, style }: any) => {
//     const index = rowIndex * columnCount + columnIndex;
//     if (index >= filteredIcons.length) return null;
//     const { kebab, Component } = filteredIcons[index];
//     return (
//       <button
//         key={kebab}
//         type="button"
//         onClick={() => setSelectedIcon(kebab)}
//         className={`p-2 rounded-2xl border flex items-center justify-center hover:bg-gray-100 transition ${
//           selectedIcon === kebab
//             ? "bg-primary-light border-primary"
//             : "border-gray-200"
//         }`}
//         style={style}>
//         <Component size={20} />
//       </button>
//     );
//   };

//   const handleSubmit = () => {
//     const payload = {
//       title,
//       icon: selectedIcon,
//     };
//   };

//   const SelectedPreview =
//     (TablerIcons as any)[kebabToPascal(selectedIcon)] ?? null;

//   return (
//     <div className="max-w-xl space-y-6">
//       <h1 className="text-2xl font-semibold">Create Category</h1>

//       <div className="space-y-4">
//         <label className="block">
//           <span className="text-sm font-medium">Title</span>
//           <input
//             placeholder="Enter category title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>

//         <label className="block">
//           <span className="text-sm font-medium">Search Icon</span>
//           <input
//             placeholder="Search tabler icon"
//             value={search}
//             onChange={handleSearchChange}
//           />
//         </label>

//         {selectedIcon && SelectedPreview && (
//           <div className="flex items-center gap-2">
//             <span className="text-sm">Selected:</span>
//             <SelectedPreview size={28} />
//             <span className="text-sm text-gray-600">{selectedIcon}</span>
//           </div>
//         )}

//         {/* Virtualized icon grid */}
//         <div className=" border rounded-2xl">
//           <Grid
//             columnCount={columnCount}
//             rowCount={rowCount}
//             columnWidth={iconSize}
//             rowHeight={iconSize}
//             height={400}
//             width={columnCount * iconSize}>
//             {Cell}
//           </Grid>
//         </div>

//         <Button onClick={handleSubmit} variant="primary">
//           Create Category
//         </Button>
//       </div>
//     </div>
//   );
// }
