import { useEffect, useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import {
  useLoginMutation,
  useRegisterMutation,
  useUploadPhotoMutation,
} from "../authApiSlice";
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
    role: "",
    profileImageUrl: "",
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadPhotoMutation();

  const isLoading = isRegisterLoading || isLoginLoading;

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
  }, [navigate, redirect, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const loginFormData = {
      identifier: formData.email,
      password: formData.password,
    };

    await toastPromise(
      (async () => {
        await register(formData);
        return await login(loginFormData).unwrap();
      })(),
      {
        loadingMessage: "Registering...",
        successMessage: "Registered successfully!",
        errorMessage: "Registratring failed",
        onSuccess: (res) => {
          const credentials = res.data;
          dispatch(setCredentials({ ...credentials }));
          navigate(redirect);
        },
      }
    );
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
  };
}
