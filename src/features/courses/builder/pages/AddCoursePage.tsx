import { useEffect, useMemo, useReducer, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/form/Button";
import Input from "../../../../shared/components/form/Input";
import Dropdown from "../../../../shared/components/form/Dropdown";
import {
  useCreateCourseMutation,
  useUploadCourseImageMutation,
} from "../../api/coursesApiSlice";
import toastPromise from "../../../../shared/utils/toast";
import { useGetInstructorsQuery } from "../../api/instructorApiSlice";
import { useGetCategoriesQuery } from "../../api/categoriesApiSlice";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Option = { label: string; value: string };

const levelOptions: Array<{ label: Level; value: Level }> = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

const toNumber = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};
const addUnique = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr : [...arr, v]);
const removeValue = <T,>(arr: T[], v: T) => arr.filter((x) => x !== v);

type State = {
  title: string;
  description: string;
  level: Level;
  price: string;
  durationHours: string;
  instructors: string[];
  lastInstructorPick: string;
  categories: string[];
  lastCategoryPickId: string;
  imageFile: File | null;
  imagePreviewUrl: string | null;
};

type Action =
  | { type: "FIELD"; name: keyof State; value: string }
  | { type: "SET_LEVEL"; value: Level }
  | { type: "ADD_INSTRUCTOR"; id: string }
  | { type: "REMOVE_INSTRUCTOR"; id: string }
  | { type: "ADD_CATEGORY_FROM_PICK"; id: string; name: string }
  | { type: "REMOVE_CATEGORY"; name: string }
  | { type: "SET_FILE"; file: File | null }
  | { type: "RESET" };

const initialState: State = {
  title: "",
  description: "",
  level: "Beginner",
  price: "0",
  durationHours: "1",
  instructors: [],
  lastInstructorPick: "",
  categories: [],
  lastCategoryPickId: "",
  imageFile: null,
  imagePreviewUrl: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.name]: action.value } as State;
    case "SET_LEVEL":
      return { ...state, level: action.value };
    case "ADD_INSTRUCTOR":
      return {
        ...state,
        lastInstructorPick: action.id,
        instructors: addUnique(state.instructors, action.id),
      };
    case "REMOVE_INSTRUCTOR":
      return {
        ...state,
        instructors: removeValue(state.instructors, action.id),
      };
    case "ADD_CATEGORY_FROM_PICK":
      return {
        ...state,
        lastCategoryPickId: action.id,
        categories: addUnique(state.categories, action.name),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: removeValue(state.categories, action.name),
      };
    case "SET_FILE": {
      if (state.imagePreviewUrl) URL.revokeObjectURL(state.imagePreviewUrl);
      return {
        ...state,
        imageFile: action.file,
        imagePreviewUrl: action.file ? URL.createObjectURL(action.file) : null,
      };
    }
    case "RESET":
      if (state.imagePreviewUrl) URL.revokeObjectURL(state.imagePreviewUrl);
      return { ...initialState };
    default:
      return state;
  }
}

export default function AddCoursePage() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    title,
    description,
    level,
    price,
    durationHours,
    instructors,
    lastInstructorPick,
    categories,
    lastCategoryPickId,
    imageFile,
    imagePreviewUrl,
  } = state;

  const { data: instructorsData, isLoading: loadingInstructors } =
    useGetInstructorsQuery({});
  const { data: categoriesData, isLoading: loadingCategories } =
    useGetCategoriesQuery({
      page: 0,
      size: 50,
      sortBy: "id",
      sortDirection: "desc",
    });

  const instructorOptions: Option[] = useMemo(
    () =>
      instructorsData?.data?.map((ins: any) => ({
        label: ins.name ?? ins.fullName ?? `#${ins.id}`,
        value: String(ins.id),
      })) ?? [],
    [instructorsData]
  );

  const [localCategories, setLocalCategories] = useState<Option[]>([]);
  const categoryOptions: Option[] = useMemo(
    () => [
      ...(categoriesData?.data?.content?.map((cat: any) => ({
        label: cat.name ?? `#${cat.id}`,
        value: cat.name,
      })) ?? []),
      ...localCategories,
    ],
    [categoriesData, localCategories]
  );

  const [createCourse, { isLoading: creating }] = useCreateCourseMutation();
  const [uploadCourseImage, { isLoading: uploading }] =
    useUploadCourseImageMutation();

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Title is required";
    if ((description ?? "").trim().length < 20)
      e.description = "Description must be at least 20 characters";
    if (instructors.length === 0)
      e.instructors = "At least one instructor is required";
    const p = toNumber(price);
    if (!Number.isFinite(p) || p < 0) e.price = "Price must be >= 0";
    const d = toNumber(durationHours);
    if (!Number.isFinite(d) || d <= 0) e.duration = "Duration must be > 0";
    return e;
  }, [title, description, instructors.length, price, durationHours]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleInstructorPick = (id: string) => {
    dispatch({ type: "ADD_INSTRUCTOR", id });
  };

  const handleCategoryPick = (pickedId: string) => {
    dispatch({ type: "ADD_CATEGORY_FROM_PICK", id: pickedId, name: pickedId });
  };

  const onSubmit = useCallback(async () => {
    if (hasErrors) return;

    const doCreate = async () => {
      let uploadedUrl: string | undefined;

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const uploaded: any = await uploadCourseImage(fd).unwrap();
        uploadedUrl =
          uploaded?.data?.url ??
          uploaded?.data?.path ??
          uploaded?.url ??
          uploaded?.path ??
          uploaded?.data ??
          undefined;
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        level,
        price: toNumber(price),
        durationHours: toNumber(durationHours),
        instructors,
        categories,
        image: uploadedUrl,
      };

      await createCourse(payload).unwrap();
      dispatch({ type: "RESET" });
      navigate("/");
    };

    await toastPromise(doCreate(), {
      loadingMessage: imageFile ? "Uploading image..." : "Creating course...",
      successMessage: "Course created successfully",
      errorMessage: "Failed to create course",
    });
  }, [
    hasErrors,
    imageFile,
    uploadCourseImage,
    title,
    description,
    level,
    price,
    durationHours,
    instructors,
    categories,
    createCourse,
    navigate,
  ]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  const isBusy = creating || uploading;

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
            onChange={(e) =>
              dispatch({ type: "FIELD", name: "title", value: e.target.value })
            }
            placeholder="e.g. React for Beginners"
            required
          />

          <div>
            <Dropdown
              label="Assign Instructor"
              value={lastInstructorPick}
              options={instructorOptions}
              onChange={handleInstructorPick}
              placeholder={
                loadingInstructors ? "Loading..." : "Select instructor"
              }
              disabled={loadingInstructors}
            />
            {instructors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {instructors.map((id) => {
                  const label =
                    instructorOptions.find((o) => o.value === id)?.label ?? id;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-lightest border-2 border-primary dark:bg-primary-darkest dark:text-gray-300 text-sm"
                    >
                      {label}
                      <Button
                        type="button"
                        className="text-xs opacity-70 hover:opacity-100"
                        onClick={() =>
                          dispatch({ type: "REMOVE_INSTRUCTOR", id })
                        }
                      >
                        ✕
                      </Button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <Dropdown
              label="Level"
              value={level}
              options={levelOptions}
              onChange={(v: string) =>
                dispatch({ type: "FIELD", name: "level", value: v })
              }
              placeholder="Select level"
            />
          </div>

          <Input
            label="Price"
            name="price"
            type="number"
            step={0.01}
            min={0}
            value={price}
            onChange={(e) =>
              dispatch({ type: "FIELD", name: "price", value: e.target.value })
            }
            placeholder="0 = Free"
          />

          <Input
            label="Duration (hours)"
            name="durationHours"
            type="number"
            min={1}
            value={durationHours}
            onChange={(e) =>
              dispatch({
                type: "FIELD",
                name: "durationHours",
                value: e.target.value,
              })
            }
            placeholder="e.g. 12"
          />

          <div>
            <Dropdown
              label="Assign Category"
              value={lastCategoryPickId}
              options={categoryOptions}
              allowCreate
              onCreateOption={(name) => {
                setLocalCategories((prev) => [
                  ...prev,
                  { label: name, value: name },
                ]);
                return name;
              }}
              onChange={handleCategoryPick}
              placeholder={loadingCategories ? "Loading..." : "Select category"}
              disabled={loadingCategories}
            />
            {categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-lightest border-2 border-primary dark:bg-primary-darkest dark:text-gray-300 text-sm"
                  >
                    {name}
                    <button
                      type="button"
                      className="text-xs opacity-70 hover:opacity-100"
                      onClick={() =>
                        dispatch({ type: "REMOVE_CATEGORY", name })
                      }
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) =>
              dispatch({
                type: "FIELD",
                name: "description",
                value: e.target.value,
              })
            }
            rows={6}
            className="w-full placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white p-3 rounded-2xl transition-colors duration-300 border-2 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-primary-lightest dark:focus:bg-primary-darkest outline-none border-color"
            placeholder="Explain what students will learn, prerequisites, and who this course is for..."
          />
        </div>

        <div className="mt-4 grid md:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                dispatch({
                  type: "SET_FILE",
                  file: e.target.files?.[0] ?? null,
                })
              }
              className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-2xl file:border-2 file:cursor-pointer file:bg-white dark:file:bg-gray-900 file:border-color dark:file:border-gray-700 hover:file:bg-gray-50 dark:hover:file:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-500">
              Recommended: 1200x630px JPG/PNG.
            </p>
          </div>

          {imagePreviewUrl && (
            <div className="justify-self-end">
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-36 h-24 object-cover rounded-xl border-2 border-gray-200 dark:border-primary-dark"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            onClick={() => dispatch({ type: "RESET" })}
            variant="secondary"
            disabled={isBusy}
          >
            Reset
          </Button>
          <Button
            onClick={onSubmit}
            variant="primary"
            disabled={isBusy || hasErrors}
          >
            Create Course
          </Button>
        </div>
      </section>
    </div>
  );
}
