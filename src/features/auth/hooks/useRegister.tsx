// features/auth/hooks/useRegister.ts
import { useEffect, useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useRegisterMutation, useUploadPhotoMutation } from "../authApiSlice";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import toastPromise from "../../../utils/toast";
import { setCredentials } from "../authSlice";
import { UserRole } from "../types";

type Step = "first" | "second" | "third";

export interface RegisterFormData {
  // step 1
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  // step 2
  role: UserRole | ""; // empty until selected

  // optional avatar
  profileImageUrl?: string;

  // step 3 (student)
  firstName?: string;
  lastName?: string;
  birthDate?: string; // yyyy-mm-dd
  gender?: string;
  education?: string;
  phoneNumber?: string;
  address?: string;

  // step 3 (instructor)
  bio?: string;

  // step 3 (organization)
  orgName?: string;
  orgDescription?: string;
}

export default function useRegister() {
  const { navigate, dispatch, token } = useAppHook();

  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // user picks on step 2
  });

  const [step, setStep] = useState<Step>("first");

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadPhotoMutation();

  const isLoading = isRegisterLoading;

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (token) navigate(redirect);
  }, [navigate, redirect, token]);

  // step 1 -> step 2
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const pwd = formData.password.trim();
    const confirm = formData.confirmPassword.trim();

    if (pwd.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (pwd !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      password: pwd,
      confirmPassword: confirm,
    }));
    setStep("second");
  };

  // final submit (from step 3)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
      profileImageUrl: formData.profileImageUrl,
    };

    // attach role-specific details
    if (formData.role === UserRole.STUDENT) {
      payload.details = {
        firstName: formData.firstName?.trim(),
        lastName: formData.lastName?.trim(),
        birthDate: formData.birthDate,
        gender: formData.gender?.trim(),
        education: formData.education?.trim(),
        phoneNumber: formData.phoneNumber?.trim(),
        address: formData.address?.trim(),
      };
    } else if (formData.role === UserRole.INSTRUCTOR) {
      payload.details = { bio: formData.bio?.trim() };
    } else if (formData.role === UserRole.ORGANIZATION) {
      payload.details = {
        orgName: formData.orgName?.trim(),
        orgDescription: formData.orgDescription?.trim(),
      };
    }

    console.log(payload);

    await toastPromise(register(payload), {
      loadingMessage: "Registering...",
      successMessage: "Registered successfully!",
      errorMessage: "Registering failed",
      onSuccess: async (res: any) => {
        const credentials = res.data;
        dispatch(setCredentials({ ...credentials }));
        navigate("/login");
      },
    });
  };

  // avatar upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await toast.promise(
      (async () => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const res = await uploadImage(formDataUpload).unwrap();
        setFormData((prev) => ({ ...prev, profileImageUrl: res.data }));
      })(),
      {
        loading: "Uploading...",
        success: "Upload successful!",
        error: "Upload failed",
      }
    );
  };

  const goToFirst = () => setStep("first");
  const goToSecond = () => setStep("second");
  const goToThird = () => setStep("third");

  return {
    formData,
    setFormData,

    isPasswordVisible,
    setPasswordVisibility,
    isConfirmPasswordVisible,
    setConfirmPasswordVisibility,

    isUploading,
    isLoading,

    handleSubmit,
    handleFileChange,
    handleNext,

    step,
    setStep,
    goToFirst,
    goToSecond,
    goToThird,
  };
}
