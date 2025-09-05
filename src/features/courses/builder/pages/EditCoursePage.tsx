import {
  PlusCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../../shared/components/form/Button";
import SortableItem from "../dnd/SortableItem";
import { useDndSensors } from "../dnd/useDndSensors";
import ModuleCard from "../components/ModuleCard";
import { reorderModules } from "../utils/reorder";
import { useGetCourseDetailsQuery } from "../../api/coursesApiSlice";
import {
  useCreateModuleMutation,
  useDeleteModuleMutation,
} from "../../api/moduleApiSlice";
import {
  useCreateSectionMutation,
  useDeleteSectionMutation,
} from "../../api/sectionApiSlice";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useParams } from "react-router-dom";
import Loader from "../../../../shared/components/Loader";
import Message from "../../../../shared/components/Message";
import { Module, Section } from "../../../../shared/types/types";

/** Normalize server course -> builder shape */
function normalizeCourseToModules(course: any): Module[] {
  const modules = course?.modules ?? [];
  return (modules as any[]).map((m, mIdx) => ({
    id: m.id ?? mIdx,
    title: m.title ?? m.name ?? `Module ${mIdx + 1}`,
    sections: (m.sections ?? []).map((s: any, sIdx: number) => ({
      id: s.id ?? sIdx,
      title: s.title ?? s.name ?? `Section ${sIdx + 1}`,
      materials: s.materials ?? s.lessons ?? [],
    })),
  }));
}

export default function EditCoursePage() {
  const sensors = useDndSensors();
  const { id: courseIdParam } = useParams<{ id: string }>();
  const courseId = Number(courseIdParam);

  const {
    data: courseResp,
    isLoading,
    isFetching,
    error,
    refetch: refetchCourse,
  } = useGetCourseDetailsQuery(courseId, {
    skip: Number.isNaN(courseId),
    refetchOnMountOrArgChange: true,
  });

  const serverCourse = useMemo(
    () => (courseResp?.data ?? courseResp) as any,
    [courseResp]
  );

  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    if (!serverCourse) return;
    setModules(normalizeCourseToModules(serverCourse));
  }, [serverCourse]);

  const [createModule] = useCreateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();
  const [createSection] = useCreateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  const onModulesDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderModules(modules, String(active.id), String(over.id));
    setModules(next);
  };

  // Modules
  const addModuleHandler = async () => {
    const orderIndex = modules.length;
    const tmp: Module = {
      id: Date.now(),
      title: `Module ${orderIndex + 1}`,
      sections: [],
    };
    setModules((prev) => [...prev, tmp]);

    try {
      const created: any = await createModule({
        courseId,
        data: { title: tmp.title, orderIndex },
      }).unwrap();
      const real = created?.data ?? created;
      setModules((prev) =>
        prev.map((m) => (m.id === tmp.id ? { ...m, id: real.id ?? m.id } : m))
      );
    } finally {
      await refetchCourse();
    }
  };

  const removeModuleHandler = async (moduleId: number) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
    try {
      await deleteModule(Number(moduleId)).unwrap();
    } finally {
      await refetchCourse();
    }
  };

  const updateModuleLocal = (moduleId: number, patch: Partial<Module>) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, ...patch } : m))
    );
  };

  // Sections
  const addSectionHandler = async (moduleId: number) => {
    const orderIndex =
      modules.find((m) => m.id === moduleId)?.sections.length ?? 0;

    const nextSection: Section = {
      id: Date.now(),
      title: "Section",
      materials: [],
    };

    setModules((prev) =>
      prev.map((m) =>
        m.id !== moduleId ? m : { ...m, sections: [...m.sections, nextSection] }
      )
    );

    try {
      const created: any = await createSection({
        title: nextSection.title,
        orderIndex,
        moduleId, // included as required
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
      await refetchCourse();
    }
  };

  // 🔧 Remove section by sectionId only (moduleId is derived)
  const removeSectionHandler = async (sectionId: number) => {
    const parent = modules.find((m) =>
      m.sections.some((s) => s.id === sectionId)
    );
    if (!parent) return;

    setModules((prev) =>
      prev.map((m) =>
        m.id !== parent.id
          ? m
          : { ...m, sections: m.sections.filter((s) => s.id !== sectionId) }
      )
    );

    try {
      await deleteSection(sectionId);
    } finally {
      await refetchCourse();
    }
  };

  const updateSectionLocal = (
    moduleId: number,
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
    moduleId: number,
    sections: Section[]
  ) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, sections } : m))
    );
  };

  if (isLoading || isFetching) return <Loader logo />;
  if (error) {
    const msg = (error as any)?.data?.message ?? "Failed to load course";
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Message variant="danger">{msg}</Message>
      </div>
    );
  }
  if (!serverCourse) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Message variant="warning">Course not found.</Message>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <RectangleStackIcon className="w-6 h-6 text-primary" />
          Edit Course —{" "}
          <span className="text-primary">{serverCourse.title}</span>
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Modules: {modules.length}
        </span>
      </div>

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
                onChangeTitle={(title) =>
                  updateModuleLocal(module.id, { title })
                }
                onRemove={() => removeModuleHandler(module.id)}
                onAddSection={() => addSectionHandler(module.id)}
                onUpdateSection={(sIndex, nextSection) =>
                  updateSectionLocal(module.id, sIndex, nextSection)
                }
                onRemoveSection={(sIndex) => {
                  const sec = module.sections[sIndex];
                  if (!sec) return;
                  // 🟢 now only pass sectionId
                  removeSectionHandler(sec.id as number);
                }}
                onReorderSections={(next) =>
                  reorderSectionsPersist(module.id, next)
                }
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <div className="mt-4">
        <Button
          onClick={addModuleHandler}
          className="items-center"
          variant="primary"
        >
          <PlusCircleIcon className="w-6 mr-2" />
          Add Module
        </Button>
      </div>
    </div>
  );
}
