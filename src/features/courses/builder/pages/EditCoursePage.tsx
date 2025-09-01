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
import { Module, Section } from "../types";
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

/** Normalize server course -> builder shape */
function normalizeCourseToModules(course: any): Module[] {
  const modules = course?.modules ?? [];
  return (modules as any[]).map((m, mIdx) => ({
    id: m.id ?? `m_${mIdx}`,
    name: m.title ?? m.name ?? `Module ${mIdx + 1}`,
    sections: (m.sections ?? []).map((s: any, sIdx: number) => ({
      id: s.id ?? `s_${mIdx}_${sIdx}`,
      name: s.title ?? s.name ?? `Section ${sIdx + 1}`,
      // keep lessons/materials raw for the editor
      lessons: s.lessons ?? s.materials ?? [],
    })),
  }));
}

export default function EditCoursePage() {
  const sensors = useDndSensors();
  const { id: courseIdParam } = useParams<{ id: string }>();
  const courseId = Number(courseIdParam);

  // fetch course
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

  // local state mirrors server
  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    if (!serverCourse) return;
    setModules(normalizeCourseToModules(serverCourse));
  }, [serverCourse]);

  // mutations
  const [createModule] = useCreateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();
  const [createSection] = useCreateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  // reorder modules (local)
  const onModulesDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const next = reorderModules(modules, String(active.id), String(over.id));
    setModules(next);
    // TODO: persist orderIndex if API available, then refetch
  };

  // module actions
  const addModuleHandler = async () => {
    const tmp: Module = {
      id: `m_${Date.now()}`,
      name: `Module ${modules.length + 1}`,
      sections: [],
    };
    setModules((prev) => [...prev, tmp]);

    try {
      const created: any = await createModule({
        courseId,
        data: { name: tmp.name },
      }).unwrap();
      const real = created?.data ?? created;
      setModules((prev) =>
        prev.map((m) => (m.id === tmp.id ? { ...m, id: real.id ?? m.id } : m))
      );
    } finally {
      await refetchCourse();
    }
  };

  const removeModuleHandler = async (moduleId: string | number) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
    try {
      await deleteModule(Number(moduleId)).unwrap();
    } finally {
      await refetchCourse();
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

  // section actions
  const addSectionHandler = async (moduleId: string | number) => {
    const nextSection: Section = {
      id: `s_${Date.now()}`,
      name: "Section",
      lessons: [],
    };

    setModules((prev) =>
      prev.map((m) =>
        m.id !== moduleId ? m : { ...m, sections: [...m.sections, nextSection] }
      )
    );

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
      await refetchCourse();
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
      await refetchCourse();
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
    // TODO: persist orderIndex if API available
  };

  // UI states
  if (isLoading || isFetching) return <Loader logo />;
  if (error) {
    // @ts-ignore
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
                onChangeName={(name) => {
                  updateModuleLocal(module.id, { name });
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
