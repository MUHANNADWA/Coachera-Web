import { useCallback, useMemo, useRef, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { Button } from "../../../shared/components/form/Button";
import { PROFILE_IMAGE } from "../../../constants/constants";
import {
  BookOpenIcon,
  CalendarIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  UserMinusIcon,
  UsersIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Input from "../../../shared/components/form/Input";
import SidebarHeader from "../../courses/components/SidebarHeader";
import { profileSidebar } from "../../courses/utils/Utils";

type FormState = {
  username: string;
  email: string;
  newPassword: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  education: string;
  phoneNumber: string;
  address: string;
};

export default function EditProfilePage() {
  const { user, navigate } = useAppHook();

  const [form, setForm] = useState<FormState>({
    username: user?.username || "",
    email: user?.email || "",
    newPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    education: "",
    phoneNumber: "",
    address: "",
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile photo (preview + file)
  const initialPhoto = user?.profileImage || PROFILE_IMAGE;
  const [photoPreview, setPhotoPreview] = useState<string>(initialPhoto);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const sidebarItems = useMemo(() => profileSidebar, []);

  const onChange =
    (name: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
    };

  const handlePhotoPick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handlePhotoRemove = () => {
    setPhotoFile(null);
    setPhotoPreview(initialPhoto);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setForm({
      username: user?.username || "",
      email: user?.email || "",
      newPassword: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      education: "",
      phoneNumber: "",
      address: "",
    });
    handlePhotoRemove();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;
    try {
      setIsSaving(true);

      // TODO: Upload profile photo if a new file is selected
      // if (photoFile) {
      //   const formData = new FormData();
      //   formData.append("file", photoFile);
      //   const { url } = await uploadAvatar(formData).unwrap();
      //   // Use url in the update below
      // }

      // TODO: Execute account and student updates
      // await updateAccount({ username: form.username, email: form.email, newPassword: form.newPassword, profileImage: urlOrExisting });
      // await updateStudent({ firstName: form.firstName, lastName: form.lastName, birthDate: form.birthDate, gender: form.gender, education: form.education, phoneNumber: form.phoneNumber, address: form.address });

      // toast.success("Profile updated");
    } catch (err) {
      // toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page flex">
      {/* Sidebar */}
      <Sidebar
        className={
          collapsed
            ? "max-sm:h-15! max-sm:bg-transparent w-14"
            : "w-72 max-sm:w-full"
        }
      >
        <SidebarHeader
          label="Profile"
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
        />

        {!collapsed && (
          <div>
            <div className="text-center space-y-2 mb-8">
              <img
                src={photoPreview}
                alt="profile"
                className="h-24 w-24 justify-center mx-auto rounded-full object-cover"
              />
              <h2 className="font-semibold text-lg truncate">
                {user?.username}
              </h2>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
              {sidebarItems.map(({ label, icon: Icon, link }) => (
                <Button
                  full
                  key={label}
                  onClick={() => {
                    navigate(link);
                    if (window.innerWidth <= 768) toggleCollapse();
                  }}
                  className="group flex items-center justify-start gap-2 px-3 py-2"
                  type="button"
                >
                  <Icon className="h-4 w-4 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100" />
                  {label}
                </Button>
              ))}

              <Button
                full
                key="Close account"
                onClick={() => {}}
                className="group flex items-center justify-start gap-2 px-3 py-2 text-danger hover:bg-red-50"
                type="button"
              >
                <UserMinusIcon className="h-4 w-4 text-red-400 group-hover:text-danger" />
                Close account
              </Button>
            </nav>
          </div>
        )}
      </Sidebar>

      {/* Content */}
      <main className="flex-1 flex flex-col py-8 ml-8 pr-8 max-lg:ml-0 max-lg:pr-0">
        <article className="consect p-4 mb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">Edit profile</h1>
          <p className="text-sm text-gray-500">
            Add information about yourself
          </p>
        </article>

        {/* Unified form with separate sections */}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Section 1: Profile photo */}
          <section className="consect p-6">
            <h2 className="text-xl font-semibold mb-3">Profile Photo</h2>
            <div className="flex items-start gap-4">
              <img
                src={photoPreview}
                alt="Current profile"
                className="h-24 w-24 rounded-full object-cover ring-1 ring-gray-100 dark:ring-gray-800"
              />
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="primary"
                  onClick={handlePhotoPick}
                  className="inline-flex items-center gap-2"
                >
                  <PhotoIcon className="w-5 h-5" />
                  Change Photo
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePhotoRemove}
                  className="inline-flex items-center gap-2"
                >
                  <TrashIcon className="w-5 h-5" />
                  Remove
                </Button>
                <p className="w-full text-xs text-gray-500">
                  JPG/PNG preferred, less than 2MB. A preview will be shown
                  before saving.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Account information */}
          <section className="consect p-6">
            <h2 className="text-xl font-semibold mb-3">Account Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                value={form.username}
                prefixIcon={UserIcon}
                onChange={onChange("username")}
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                prefixIcon={EnvelopeIcon}
                onChange={onChange("email")}
              />
              <Input
                label="New Password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="********"
                minLength={8}
                value={form.newPassword}
                prefixIcon={LockClosedIcon}
                suffixIcon={
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisibility((prev) => !prev);
                    }}
                    className="text-gray-500 hover:text-primary"
                    type="button"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {isPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                }
                onChange={onChange("newPassword")}
              />
            </div>
          </section>

          {/* Section 3: Student information */}
          <section className="consect p-6">
            <h2 className="text-xl font-semibold mb-3">Student Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
                prefixIcon={UserIcon}
                value={form.firstName}
                onChange={onChange("firstName")}
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                type="text"
                name="lastName"
                prefixIcon={UserIcon}
                value={form.lastName}
                onChange={onChange("lastName")}
              />
              <Input
                label="Birth Date"
                name="birthDate"
                type="date"
                value={form.birthDate}
                prefixIcon={CalendarIcon}
                onChange={onChange("birthDate")}
              />
              <Input
                label="Gender"
                name="gender"
                type="text"
                placeholder="Male / Female"
                value={form.gender}
                prefixIcon={UsersIcon}
                onChange={onChange("gender")}
              />
              <Input
                label="Education"
                name="education"
                type="text"
                placeholder="e.g. Bachelor of Science"
                value={form.education}
                prefixIcon={BookOpenIcon}
                onChange={onChange("education")}
              />
              <Input
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="+1 234 567 890"
                value={form.phoneNumber}
                prefixIcon={PhoneIcon}
                onChange={onChange("phoneNumber")}
              />
              <Input
                label="Address"
                name="address"
                type="text"
                placeholder="Street, City, Country"
                value={form.address}
                prefixIcon={MapPinIcon}
                onChange={onChange("address")}
                className="sm:col-span-2"
              />
            </div>
          </section>

          {/* Section 4: Form actions */}
          <section className="consect p-6">
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="secondary" onClick={resetForm}>
                Reset
              </Button>
              <Button type="submit" variant="primary" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
