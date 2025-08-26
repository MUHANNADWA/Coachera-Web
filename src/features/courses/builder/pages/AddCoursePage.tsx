// // features/courses/builder/pages/AddCoursePage.tsx
// import { PlusCircleIcon } from "@heroicons/react/24/outline";
// import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
// import { useEffect, useMemo, useState } from "react";
// import { Button } from "../../../../shared/components/form/Button";
// import SortableItem from "../dnd/SortableItem";
// import { useDndSensors } from "../dnd/useDndSensors";
// import ModuleCard from "../components/ModuleCard";
// import { Module, Section } from "../types";
// import { reorderModules } from "../utils/reorder";

// // API hooks (adjust relative paths to your slices)
// import {
//   useCreateModuleMutation,
//   // useUpdateModuleMutation,
//   useDeleteModuleMutation,
//   useGetModulesByCourseQuery,
// } from "../../apiSlices/moduleApiSlice";
// import {
//   useCreateSectionMutation,
//   // useUpdateSectionMutation,
//   useDeleteSectionMutation,
// } from "../../apiSlices/sectionApiSlice";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// export default function AddCoursePage() {
//   const sensors = useDndSensors();
//   // Fetch from server
//   const courseId = 1;

//   const { data: fetchedModulesResponse, refetch } =
//     useGetModulesByCourseQuery(courseId);

//   // Normalize fetched data to local state
//   const fetchedModules: Module[] = useMemo(() => {
//     // Expecting something like [{ id, name, sections: [{ id, name, lessons: [...] }] }]
//     const list =
//       (fetchedModulesResponse as any)?.data ?? fetchedModulesResponse ?? [];
//     return Array.isArray(list) ? list : [];
//   }, [fetchedModulesResponse]);

//   const [modules, setModules] = useState<Module[]>([]);

//   useEffect(() => {
//     if (fetchedModules && fetchedModules.length >= 0) {
//       setModules(fetchedModules);
//     }
//   }, [fetchedModules]);

//   // Mutations
//   const [createModule] = useCreateModuleMutation();
//   // const [updateModule] = useUpdateModuleMutation();
//   const [deleteModule] = useDeleteModuleMutation();

//   const [createSection] = useCreateSectionMutation();
//   // const [updateSection] = useUpdateSectionMutation();
//   const [deleteSection] = useDeleteSectionMutation();

//   // DnD reorder (modules level)
//   const onModulesDragEnd = async (e: DragEndEvent) => {
//     const { active, over } = e;
//     if (!over || active.id === over.id) return;
//     const next = reorderModules(modules, String(active.id), String(over.id));
//     setModules(next);

//     // Optional: persist order to server (send orderIndex per module)
//     // await Promise.all(
//     //   next.map((m, idx) => updateModule({ id: m.id, data: { name: m.name, orderIndex: idx } }))
//     // );
//   };

//   // Actions: Module
//   const addModuleHandler = async () => {
//     const tmp: Module = {
//       id: `m_${Date.now()}`,
//       name: `Module ${modules.length + 1}`,
//       sections: [],
//     };
//     setModules((prev) => [...prev, tmp]);

//     try {
//       // Create on server
//       const created: any = await createModule({
//         courseId,
//         data: { name: tmp.name },
//       }).unwrap();
//       const real = created?.data ?? created;
//       // Replace temp id with real id if returned
//       setModules((prev) =>
//         prev.map((m) => (m.id === tmp.id ? { ...m, id: real.id ?? m.id } : m))
//       );
//     } finally {
//       refetch();
//     }
//   };

//   const removeModuleHandler = async (moduleId: string | number) => {
//     setModules((prev) => prev.filter((m) => m.id !== moduleId));
//     try {
//       await deleteModule(moduleId as any).unwrap();
//     } finally {
//       refetch();
//     }
//   };

//   const updateModuleLocal = (
//     moduleId: string | number,
//     patch: Partial<Module>
//   ) => {
//     setModules((prev) =>
//       prev.map((m) => (m.id === moduleId ? { ...m, ...patch } : m))
//     );
//   };

//   // Actions: Section
//   const addSectionHandler = async (moduleId: string | number) => {
//     const nextSection: Section = {
//       id: `s_${Date.now()}`,
//       name: "Section",
//       lessons: [],
//     };
//     updateModuleLocal(moduleId, {
//       sections: [
//         ...(modules.find((m) => m.id === moduleId)?.sections ?? []),
//         nextSection,
//       ],
//     });

//     try {
//       const created: any = await createSection({
//         moduleId,
//         data: { title: nextSection.name, orderIndex: 0, materials: [] },
//       }).unwrap();
//       const real = created?.data ?? created;
//       setModules((prev) =>
//         prev.map((m) =>
//           m.id !== moduleId
//             ? m
//             : {
//                 ...m,
//                 sections: m.sections.map((s) =>
//                   s.id === nextSection.id ? { ...s, id: real.id ?? s.id } : s
//                 ),
//               }
//         )
//       );
//     } finally {
//       refetch();
//     }
//   };

//   const removeSectionHandler = async (
//     moduleId: string | number,
//     sectionId: string | number
//   ) => {
//     setModules((prev) =>
//       prev.map((m) =>
//         m.id !== moduleId
//           ? m
//           : { ...m, sections: m.sections.filter((s) => s.id !== sectionId) }
//       )
//     );
//     try {
//       await deleteSection({ moduleId, sectionId }).unwrap();
//     } finally {
//       refetch();
//     }
//   };

//   const updateSectionLocal = (
//     moduleId: string | number,
//     index: number,
//     next: Section
//   ) => {
//     setModules((prev) =>
//       prev.map((m) =>
//         m.id !== moduleId
//           ? m
//           : {
//               ...m,
//               sections: m.sections.map((s, i) => (i === index ? next : s)),
//             }
//       )
//     );
//   };

//   const reorderSectionsPersist = async (
//     moduleId: string | number,
//     sections: Section[]
//   ) => {
//     setModules((prev) =>
//       prev.map((m) => (m.id === moduleId ? { ...m, sections } : m))
//     );
//     // Optional: persist orderIndex of sections
//     // await Promise.all(
//     //   sections.map((s, idx) =>
//     //     updateSection({ moduleId, sectionId: s.id, data: { title: s.name, orderIndex: idx, materials: [] } })
//     //   )
//     // );
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={onModulesDragEnd}
//       >
//         <SortableContext
//           items={modules.map((m) => String(m.id))}
//           strategy={verticalListSortingStrategy}
//         >
//           {modules.map((module) => (
//             <SortableItem key={module.id} id={module.id}>
//               <ModuleCard
//                 module={module}
//                 onChangeName={(name) => {
//                   updateModuleLocal(module.id, { name });
//                   // Optionally persist name change
//                   // updateModule({ id: module.id, data: { name } });
//                 }}
//                 onRemove={() => removeModuleHandler(module.id)}
//                 onAddSection={() => addSectionHandler(module.id)}
//                 onUpdateSection={(sIndex, nextSection) =>
//                   updateSectionLocal(module.id, sIndex, nextSection)
//                 }
//                 onRemoveSection={(sIndex) => {
//                   const sec = module.sections[sIndex];
//                   if (!sec) return;
//                   removeSectionHandler(module.id, sec.id);
//                 }}
//                 onReorderSections={(next) =>
//                   reorderSectionsPersist(module.id, next)
//                 }
//               />
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>

//       <Button
//         onClick={addModuleHandler}
//         className="items-center"
//         variant="primary"
//       >
//         <PlusCircleIcon className="w-6 mr-2" /> Add Module
//       </Button>
//     </div>
//   );
// }
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/form/Button";
import Input from "../../../../shared/components/form/Input";
import Dropdown from "../../../../shared/components/form/Dropdown"; // make sure path is correct
import {
  useCreateCourseMutation,
  useUploadCourseImageMutation,
} from "../../apiSlices/coursesApiSlice";
import toastPromise from "../../../../utils/toast";

type Level = "Beginner" | "Intermediate" | "Advanced";

const levelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

export default function AddCoursePage() {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<Level>("Beginner");
  const [price, setPrice] = useState<string>("0");
  const [durationHours, setDurationHours] = useState<string>("1");
  const [categoriesInput, setCategoriesInput] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : ""),
    [imageFile]
  );

  // API mutations
  const [createCourse, { isLoading: creating }] = useCreateCourseMutation();
  const [uploadCourseImage, { isLoading: uploading }] =
    useUploadCourseImageMutation();

  // Simple validation
  const errors = {
    title: title.trim() === "" ? "Title is required" : "",
    description:
      description.trim().length < 20
        ? "Description must be at least 20 characters"
        : "",
    price:
      Number.isNaN(Number(price)) || Number(price) < 0
        ? "Price must be a number >= 0"
        : "",
    duration:
      Number.isNaN(Number(durationHours)) || Number(durationHours) <= 0
        ? "Duration must be a number > 0"
        : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const onSubmit = async (goToBuilder: boolean) => {
    if (hasErrors) return;

    const doCreate = async () => {
      let uploadedUrl: string | undefined = undefined;

      // Upload image if provided
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const uploaded: any = await uploadCourseImage(fd).unwrap();
        uploadedUrl =
          uploaded?.data?.url ||
          uploaded?.data?.path ||
          uploaded?.url ||
          uploaded?.path ||
          uploaded?.data ||
          undefined;
      }

      // Build payload — adjust keys to your backend DTO
      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
        level,
        price: Number(price),
        durationHours: Number(durationHours),
        categories: categoriesInput
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        language: language.trim() || undefined,
        image: uploadedUrl, // or keep undefined if no image
      };

      const created: any = await createCourse(payload).unwrap();
      const createdData = created?.data ?? created;
      const newId = createdData?.id;

      // Navigate to edit builder view
      if (goToBuilder && newId) {
        navigate("/edit-course", { state: { courseId: newId } });
      }
    };

    await toastPromise(doCreate(), {
      loadingMessage: uploading ? "Uploading image..." : "Creating course...",
      successMessage: "Course created successfully",
      errorMessage: "Failed to create course",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Add New Course</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill the course information below, then create it.
        </p>
      </header>

      <section className="rounded-2xl border-2 border-gray-200 dark:border-primary-dark bg-white dark:bg-dark p-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. React for Beginners"
            required
            error={errors.title}
          />
          <Input
            label="Subtitle"
            name="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Optional short tagline"
          />

          {/* Level Dropdown */}
          <div>
            <Dropdown
              label="Level"
              value={level}
              options={levelOptions}
              onChange={(v) => setLevel(v as Level)}
              placeholder="Select level"
            />
          </div>

          <Input
            label="Language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g. English"
          />

          <Input
            label="Price"
            name="price"
            type="number"
            step={0.01}
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0 = Free"
            error={errors.price}
          />
          <Input
            label="Duration (hours)"
            name="durationHours"
            type="number"
            min={1}
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
            placeholder="e.g. 12"
            error={errors.duration}
          />

          <Input
            label="Categories (comma separated)"
            name="categories"
            value={categoriesInput}
            onChange={(e) => setCategoriesInput(e.target.value)}
            placeholder="e.g. Web, React, Frontend"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className={`w-full placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white p-3 rounded-2xl transition-colors duration-300 border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest dark:focus:bg-primary-darkest outline-none border-color`}
            placeholder="Explain what students will learn, prerequisites, and who this course is for..."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-danger">{errors.description}</p>
          )}
        </div>

        {/* Image upload */}
        <div className="mt-4 grid md:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-2xl file:border-2 file:cursor-pointer file:bg-white dark:file:bg-gray-900 file:border-color dark:file:border-gray-700 hover:file:bg-gray-50 dark:hover:file:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-500">
              Recommended: 1200x630px JPG/PNG.
            </p>
          </div>

          {imagePreview && (
            <div className="justify-self-end">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-36 h-24 object-cover rounded-xl border-2 border-gray-200 dark:border-primary-dark"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            onClick={() => onSubmit(false)}
            variant="secondary"
            disabled={creating || uploading || hasErrors}
          >
            Save Draft
          </Button>
          <Button
            onClick={() => onSubmit(true)}
            variant="primary"
            disabled={creating || uploading || hasErrors}
          >
            Create & Open Builder
          </Button>
        </div>
      </section>
    </div>
  );
}
