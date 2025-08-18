import { useEffect, useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useRegisterMutation, useUploadPhotoMutation } from "../authApiSlice";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import toastPromise from "../../../utils/toast";
import { setCredentials } from "../authSlice";

export default function useRegister() {
  const { navigate, dispatch, token } = useAppHook();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [step, setStep] = useState<"first" | "second">("first");

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
    if (token) {
      navigate(redirect);
    }
  }, [navigate, redirect, token]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    formData.password = formData.password.trim();
    formData.confirmPassword = formData.confirmPassword.trim();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setStep("second");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toastPromise(register(formData), {
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await toast.promise(
      (async () => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const res = await uploadImage(formDataUpload).unwrap();

        setFormData((prev) => ({
          ...prev,
          profileImageUrl: res.data,
        }));
      })(),
      {
        loading: "Uploading...",
        success: "Upload successful!",
        error: "Upload failed",
      }
    );
  };

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
  };
}
