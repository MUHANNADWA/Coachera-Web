// @ts-nocheck
import { useEffect, useRef, useState } from "react";
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
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Input from "../../../shared/components/form/Input";
import Modal from "../../../shared/components/Modal";

import {
  useGetMeQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "../../students/api/studentsApiSlice";
import toastPromise from "../../../shared/utils/toast";

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
  const { navigate, user } = useAppHook();

  const { data: me, isLoading } = useGetMeQuery({});
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    newPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    education: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (me) {
      setForm({
        username: user?.username || "",
        email: user?.email || "",
        newPassword: "",
        firstName: me.data.firstName || "",
        lastName: me.data.lastName || "",
        birthDate: me.data.birthDate || "",
        gender: me.data.gender || "",
        education: me.data.education || "",
        phoneNumber: me.data.phoneNumber || "",
        address: me.data.address || "",
      });
    }
  }, [me]);

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const initialPhoto = me?.profileImage || PROFILE_IMAGE;
  const [photoPreview, setPhotoPreview] = useState<string>(initialPhoto);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      firstName: form.firstName,
      lastName: form.lastName,
      birthDate: form.birthDate,
      gender: form.gender,
      education: form.education,
      phoneNumber: form.phoneNumber,
      address: form.address,
    };

    await toastPromise(updateStudent(data).unwrap(), {
      loadingMessage: "Saving changes...",
      successMessage: "Profile updated successfully!",
      errorMessage: "Failed to update profile",
      onSuccess: () => navigate("/profile"),
    });
  };

  const openCloseModal = () => setIsCloseModalOpen(true);
  const closeCloseModal = () => setIsCloseModalOpen(false);

  const handleCloseAccount = async () => {
    await toastPromise(deleteStudent(me.id).unwrap(), {
      loadingMessage: "Closing your account...",
      successMessage: "Account closed successfully",
      errorMessage: "Failed to close account",
      onSuccess: () => navigate("/goodbye"),
    });
    setIsCloseModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 dark:bg-dark">
      <main className="flex-1 flex flex-col py-8">
        <article className="consect p-4 mb-4 text-center bg-white dark:bg-dark rounded-lg">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">
            Edit profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add information about yourself
          </p>
        </article>

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Profile Photo */}
          <section className="consect p-6 bg-white dark:bg-dark rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Profile Photo
            </h2>
            <div className="flex items-start gap-4">
              <img
                src={photoPreview}
                alt="Current profile"
                className="h-24 w-24 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
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
                <p className="w-full text-xs text-gray-500 dark:text-gray-400">
                  JPG/PNG preferred, less than 2MB.
                </p>
              </div>
            </div>
          </section>

          {/* Account Information */}
          <section className="consect p-6 bg-white dark:bg-dark rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Account Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Username"
                name="username"
                type="text"
                value={form.username}
                prefixIcon={UserIcon}
                onChange={onChange("username")}
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                prefixIcon={EnvelopeIcon}
                onChange={onChange("email")}
              />
              <Input
                label="New Password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                value={form.newPassword}
                prefixIcon={LockClosedIcon}
                suffixIcon={
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisibility((prev) => !prev);
                    }}
                    type="button"
                    className="text-gray-500 hover:text-primary"
                  >
                    {isPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                }
                onChange={onChange("newPassword")}
              />
            </div>
          </section>

          {/* Student Info */}
          <section className="consect p-6 bg-white dark:bg-dark rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              Student Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={form.firstName}
                prefixIcon={UserIcon}
                onChange={onChange("firstName")}
              />
              <Input
                label="Last Name"
                value={form.lastName}
                prefixIcon={UserIcon}
                onChange={onChange("lastName")}
              />
              <Input
                label="Birth Date"
                type="date"
                value={form.birthDate}
                prefixIcon={CalendarIcon}
                onChange={onChange("birthDate")}
              />
              <Input
                label="Gender"
                value={form.gender}
                prefixIcon={UsersIcon}
                onChange={onChange("gender")}
              />
              <Input
                label="Education"
                value={form.education}
                prefixIcon={BookOpenIcon}
                onChange={onChange("education")}
              />
              <Input
                label="Phone Number"
                value={form.phoneNumber}
                prefixIcon={PhoneIcon}
                onChange={onChange("phoneNumber")}
              />
              <Input
                label="Address"
                value={form.address}
                prefixIcon={MapPinIcon}
                onChange={onChange("address")}
                className="sm:col-span-2"
              />
            </div>
          </section>

          {/* Actions */}
          <section className="consect p-6 bg-white dark:bg-dark rounded-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="danger"
                onClick={openCloseModal}
                className="inline-flex items-center gap-2"
              >
                <UserMinusIcon className="w-5 h-5" />
                Close Account
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/profile")}
                  className="inline-flex items-center gap-2"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  View Profile
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="inline-flex items-center gap-2"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </section>
        </form>
      </main>

      {/* Close Account Modal */}
      <Modal
        isOpen={isCloseModalOpen}
        onClose={closeCloseModal}
        title="Close Account"
        message="Are you sure you want to close your account? This action cannot be undone."
        variant="confirm"
        onConfirm={handleCloseAccount}
        onCancel={closeCloseModal}
      />
    </div>
  );
}
