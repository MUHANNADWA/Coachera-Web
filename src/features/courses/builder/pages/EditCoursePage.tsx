import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../../shared/components/form/Button";
import SortableItem from "../dnd/SortableItem";
import { useDndSensors } from "../dnd/useDndSensors";
import ModuleCard from "../components/ModuleCard";
import { Curriculum, Lesson, Module, Section } from "../types";
import { reorderModules } from "../utils/reorder";
import { useAppHook } from "../../../../shared/hooks/useAppHook";

import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useGetModulesByCourseQuery,
} from "../../apiSlices/moduleApiSlice";
import {
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} from "../../apiSlices/sectionApiSlice";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function EditCoursePage() {
  const sensors = useDndSensors();
  const { navigate, location } = useAppHook();

  const courseId = location.state.courseId;

  // Fetch from server
  const {
    data: fetchedModulesResponse,
    isFetching,
    refetch,
  } = useGetModulesByCourseQuery(courseId);

  // Normalize fetched data to local state
  const fetchedModules: Module[] = useMemo(() => {
    // Expecting something like [{ id, name, sections: [{ id, name, lessons: [...] }] }]
    const list =
      (fetchedModulesResponse as any)?.data ?? fetchedModulesResponse ?? [];
    return Array.isArray(list) ? list : [];
  }, [fetchedModulesResponse]);

  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    if (fetchedModules && fetchedModules.length >= 0) {
      setModules(fetchedModules);
    }
  }, [fetchedModules]);

  // Mutations
  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  // DnD reorder (modules level)
  const onModulesDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderModules(modules, String(active.id), String(over.id));
    setModules(next);

    // Optional: persist order to server (send orderIndex per module)
    // await Promise.all(
    //   next.map((m, idx) => updateModule({ id: m.id, data: { name: m.name, orderIndex: idx } }))
    // );
  };

  // Actions: Module
  const addModuleHandler = async () => {
    const tmp: Module = {
      id: `m_${Date.now()}`,
      name: `Module ${modules.length + 1}`,
      sections: [],
    };
    setModules((prev) => [...prev, tmp]);

    try {
      // Create on server
      const created: any = await createModule({
        courseId,
        data: { name: tmp.name },
      }).unwrap();
      const real = created?.data ?? created;
      // Replace temp id with real id if returned
      setModules((prev) =>
        prev.map((m) => (m.id === tmp.id ? { ...m, id: real.id ?? m.id } : m))
      );
    } finally {
      refetch();
    }
  };

  const removeModuleHandler = async (moduleId: string | number) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
    try {
      await deleteModule(moduleId as any).unwrap();
    } finally {
      refetch();
    }
  };

  const updateModuleLocal = (
    moduleId: string | number,
    patch: Partial<Module>
  ) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, ...patch } : m))
    );
  };

  // Actions: Section
  const addSectionHandler = async (moduleId: string | number) => {
    const nextSection: Section = {
      id: `s_${Date.now()}`,
      name: "Section",
      lessons: [],
    };
    updateModuleLocal(moduleId, {
      sections: [
        ...(modules.find((m) => m.id === moduleId)?.sections ?? []),
        nextSection,
      ],
    });

    try {
      const created: any = await createSection({
        moduleId,
        data: { title: nextSection.name, orderIndex: 0, materials: [] },
      }).unwrap();
      const real = created?.data ?? created;
      setModules((prev) =>
        prev.map((m) =>
          m.id !== moduleId
            ? m
            : {
                ...m,
                sections: m.sections.map((s) =>
                  s.id === nextSection.id ? { ...s, id: real.id ?? s.id } : s
                ),
              }
        )
      );
    } finally {
      refetch();
    }
  };

  const removeSectionHandler = async (
    moduleId: string | number,
    sectionId: string | number
  ) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id !== moduleId
          ? m
          : { ...m, sections: m.sections.filter((s) => s.id !== sectionId) }
      )
    );
    try {
      await deleteSection({ moduleId, sectionId }).unwrap();
    } finally {
      refetch();
    }
  };

  const updateSectionLocal = (
    moduleId: string | number,
    index: number,
    next: Section
  ) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id !== moduleId
          ? m
          : {
              ...m,
              sections: m.sections.map((s, i) => (i === index ? next : s)),
            }
      )
    );
  };

  const reorderSectionsPersist = async (
    moduleId: string | number,
    sections: Section[]
  ) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, sections } : m))
    );
    // Optional: persist orderIndex of sections
    // await Promise.all(
    //   sections.map((s, idx) =>
    //     updateSection({ moduleId, sectionId: s.id, data: { title: s.name, orderIndex: idx, materials: [] } })
    //   )
    // );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onModulesDragEnd}
      >
        <SortableContext
          items={modules.map((m) => String(m.id))}
          strategy={verticalListSortingStrategy}
        >
          {modules.map((module) => (
            <SortableItem key={module.id} id={module.id}>
              <ModuleCard
                module={module}
                onChangeName={(name) => {
                  updateModuleLocal(module.id, { name });
                  // Optionally persist name change
                  // updateModule({ id: module.id, data: { name } });
                }}
                onRemove={() => removeModuleHandler(module.id)}
                onAddSection={() => addSectionHandler(module.id)}
                onUpdateSection={(sIndex, nextSection) =>
                  updateSectionLocal(module.id, sIndex, nextSection)
                }
                onRemoveSection={(sIndex) => {
                  const sec = module.sections[sIndex];
                  if (!sec) return;
                  removeSectionHandler(module.id, sec.id);
                }}
                onReorderSections={(next) =>
                  reorderSectionsPersist(module.id, next)
                }
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button
        onClick={addModuleHandler}
        className="items-center"
        variant="primary"
      >
        <PlusCircleIcon className="w-6 mr-2" /> Add Module
      </Button>
    </div>
  );
}
