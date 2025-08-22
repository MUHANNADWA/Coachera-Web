import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../../shared/components/form/Button";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Input from "../../../shared/components/form/Input";
import { useAppHook } from "../../../shared/hooks/useAppHook";

// Module API hooks
import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useGetModulesByCourseQuery,
} from "../slices/ModuleApiSlice";

// Section API hooks
import {
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  // useGetSectionsQuery,
} from "../slices/SectionApiSlice";

// Component for draggable items
const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const AddCoursePage =({ courseId }: {courseId: number}) => {
  const { navigate } = useAppHook();

  const { data: fetchedModules = [], refetch } = useGetModulesByCourseQuery(courseId);
  
  // Module API mutations
  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

  // Section API mutations
  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  const [modules, setModules] = useState([
    {
      id: "m1",
      name: "Module 1",
      sections: [
        {
          id: "s1",
          name: "Section 1",
          lessons: [{ id: "l1", name: "Lesson 1" }],
        },
      ],
    },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  // reorder helper
  const handleDragEnd = (
    event: any,
    level: "module" | "section" | "lesson",
    mIndex?: number,
    sIndex?: number
  ) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const newModules = [...modules];

      if (level === "module") {
        const oldIndex = newModules.findIndex((m) => m.id === active.id);
        const newIndex = newModules.findIndex((m) => m.id === over.id);
        setModules(arrayMove(newModules, oldIndex, newIndex));
      }

      if (level === "section" && mIndex !== undefined) {
        const sections = newModules[mIndex].sections;
        const oldIndex = sections.findIndex((s) => s.id === active.id);
        const newIndex = sections.findIndex((s) => s.id === over.id);
        newModules[mIndex].sections = arrayMove(sections, oldIndex, newIndex);
        setModules(newModules);
      }

      if (level === "lesson" && mIndex !== undefined && sIndex !== undefined) {
        const lessons = newModules[mIndex].sections[sIndex].lessons;
        const oldIndex = lessons.findIndex((l) => l.id === active.id);
        const newIndex = lessons.findIndex((l) => l.id === over.id);
        newModules[mIndex].sections[sIndex].lessons = arrayMove(
          lessons,
          oldIndex,
          newIndex
        );
        setModules(newModules);
      }
    }
  };

  // Helpers to add/remove
  const addModule = async () => {
    const newModule =
      {
        id: `m${Date.now()}`,
        name: `Module ${modules.length + 1}`,
        sections: [],
      };
    setModules([...modules, newModule]);
    await createModule({ courseId, data: newModule });
    refetch();
  };

  const removeModule = async (moduleId: number) => {

    setModules(modules.filter((_, i) => i !== moduleId));

    if (!moduleId) return;
    await deleteModule(moduleId);
    refetch();
  };

  const addSection = async (moduleId: number) => {
    // Screen Stuff
    const newModules = [...modules];
    newModules[moduleId].sections.push({ 
      id: `s${Date.now()}`,
      name: `Section ${newModules[moduleId].sections.length + 1}`,
      lessons: [],});
      setModules(newModules);

    // DB Stuff
    const newSection = {
      title: `Section`,
      orderIndex: 1,
      materials: [],
    };

    await createSection({ moduleId, data: newSection });
    refetch();
  };

  const removeSectionHandler = async (moduleId: number, sectionId: number) => {

    // screen stuff
    const newModules = [...modules];
    newModules[moduleId].sections = newModules[moduleId].sections.filter(
      (_, i) => i !== sectionId
    );

    // db stuff
    setModules(newModules);
    await deleteSection({ moduleId, sectionId });
    refetch();
  };
  
  const updateSectionHandler = async (
    moduleId: number,
    sectionId: number,
    newTitle: string
  ) => {
    await updateSection({
      moduleId,
      sectionId,
      data: { title: newTitle, orderIndex: 1, materials: [] },
    });
    refetch();
  };

  const addLesson = (mIndex: number, sIndex: number) => {
    const newModules = [...modules];
    newModules[mIndex].sections[sIndex].lessons.push({
      id: `l${Date.now()}`,
      name: `Lesson ${newModules[mIndex].sections[sIndex].lessons.length + 1}`,
    });
    setModules(newModules);
  };

  const removeLesson = (mIndex: number, sIndex: number, lIndex: number) => {
    const newModules = [...modules];
    newModules[mIndex].sections[sIndex].lessons = newModules[mIndex].sections[
      sIndex
    ].lessons.filter((_, i) => i !== lIndex);
    setModules(newModules);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => handleDragEnd(e, "module")}
      >
        <SortableContext
          items={modules.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          {modules.map((module, mIndex) => (
            <SortableItem key={module.id} id={module.id}>
              <div className="consect p-4 mb-6 bg-gray-50 rounded-lg shadow">
                <div className="flex justify-between items-center mb-3">
                  <Input
                    type="text"
                    value={module.name}
                    onChange={(e) => {
                      const newModules = [...modules];
                      newModules[mIndex].name = e.target.value;
                      setModules(newModules);
                    }}
                    className="text-lg font-semibold border-b px-2 py-1 focus:outline-none w-full"
                  />
                  <Button
                    onClick={() => removeModule(mIndex)}
                    className="ml-3 text-danger hover:text-danger/50"
                  >
                    <TrashIcon className="w-6" />
                  </Button>
                </div>

                {/* Sections */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(e) => handleDragEnd(e, "section", mIndex)}
                >
                  <SortableContext
                    items={module.sections.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {module.sections.map((section, sIndex) => (
                      <SortableItem key={section.id} id={section.id}>
                        <div className="consect ml-6 p-3 mb-3 bg-white rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <Input
                              type="text"
                              value={section.name}
                              onChange={(e) => {
                                const newModules = [...modules];
                                newModules[mIndex].sections[sIndex].name =
                                  e.target.value;
                                setModules(newModules);
                              }}
                              className="font-medium border-b px-2 py-1 focus:outline-none w-full"
                            />
                            <Button
                              onClick={() => removeSectionHandler(mIndex, sIndex)}
                              className="ml-3 text-danger hover:text-danger/50"
                            >
                              <TrashIcon className="w-6" />
                            </Button>
                          </div>

                          {/* Lessons */}
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) =>
                              handleDragEnd(e, "lesson", mIndex, sIndex)
                            }
                          >
                            <SortableContext
                              items={section.lessons.map((l) => l.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {section.lessons.map((lesson, lIndex) => (
                                <SortableItem key={lesson.id} id={lesson.id}>
                                  <div className="ml-6 flex items-center mb-2">
                                    <Input
                                      type="text"
                                      value={lesson.name}
                                      onChange={(e) => {
                                        const newModules = [...modules];
                                        newModules[mIndex].sections[
                                          sIndex
                                        ].lessons[lIndex].name = e.target.value;
                                        setModules(newModules);
                                      }}
                                      className="border-b px-2 py-1 focus:outline-none w-full"
                                    />
                                    <Button
                                      onClick={() =>
                                        navigate(`/manage-lesson/${lesson.id}`)
                                      }
                                      className="ml-3 text-secondary hover:text-secondary/50"
                                    >
                                      <PencilSquareIcon className="w-6" />
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        removeLesson(mIndex, sIndex, lIndex)
                                      }
                                      className="ml-3 text-danger hover:text-danger/50"
                                    >
                                      <TrashIcon className="w-6" />
                                    </Button>
                                  </div>
                                </SortableItem>
                              ))}
                            </SortableContext>
                          </DndContext>

                          <Button
                            onClick={() => addLesson(mIndex, sIndex)}
                            variant="primary"
                            className="items-center mt-2"
                          >
                            <PlusCircleIcon className="w-6 mr-1" /> Add Lesson
                          </Button>
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>

                <Button
                  onClick={() => addSection(mIndex)}
                  className="items-center mt-2"
                  variant="secondary"
                >
                  <PlusCircleIcon className="w-6 mr-1" /> Add Section
                </Button>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button onClick={addModule} className="items-center" variant="primary">
        <PlusCircleIcon className="w-6 mr-2" /> Add Module
      </Button>
    </div>
  );
};

export default AddCoursePage;
