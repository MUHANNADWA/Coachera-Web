import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/form/Button";
import Input from "../../../../shared/components/form/Input";
import Dropdown from "../../../../shared/components/form/Dropdown"; // make sure path is correct
import {
  useCreateCourseMutation,
  useUploadCourseImageMutation,
} from "../../api/coursesApiSlice";
import toastPromise from "../../../../shared/utils/toast";
import { useGetInstructorsQuery } from "../../api/instructorApiSlice";

type Level = "Beginner" | "Intermediate" | "Advanced";

const levelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

export default function AddCoursePage() {
  const navigate = useNavigate();

  const { data: instructorsData, isLoading: loadingInstructors } =
    useGetInstructorsQuery({});

  const instructorOptions =
    instructorsData?.data?.map((ins: any) => ({
      label: ins.name,   // 👈 adjust key depending on API response (e.g. ins.fullName)
      value: ins.id,
    })) || [];


  // Form state
  const [title, setTitle] = useState("");
  const [instructorId, setInstructorId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<Level>("Beginner");
  const [price, setPrice] = useState<string>("0");
  const [durationHours, setDurationHours] = useState<string>("1");
  const [categoriesInput, setCategoriesInput] = useState<string>("");
  // const [language, setLanguage] = useState<string>("English");
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
    instructor: instructorId === "" ? "Instructor is required" : "",
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
        instructorId, 
        description: description.trim(),
        level,
        price: Number(price),
        durationHours: Number(durationHours),
        categories: categoriesInput
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        // language: language.trim() || undefined,
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
          <div>
            <Dropdown
              label="Assign Instructor"
              value={instructorId}
              options={instructorOptions}
              onChange={(v) => setInstructorId(v)}
              placeholder={loadingInstructors ? "Loading..." : "Select instructor"}
              disabled={loadingInstructors}
            />
            {errors.instructor && (
              <p className="mt-1 text-xs text-danger">{errors.instructor}</p>
            )}
          </div>


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
