import { useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useResetPasswordMutation } from "../api/authApiSlice";
import toastPromise from "../../../shared/utils/toast";

export function useResetPassword() {
  const { navigate, location } = useAppHook();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPassword = formData.password;
    const email = location.state?.email;
    const otp = location.state?.otp;

    await toastPromise(resetPassword({ email, otp, newPassword }).unwrap(), {
      loadingMessage: "Resetting password...",
      successMessage: "password resetted successfully!",
      errorMessage: "password resetting failed",
      onSuccess: (_res) => navigate("/login"),
    });
  };

  return {
    isPasswordVisible,
    setPasswordVisibility,
    isConfirmPasswordVisible,
    setConfirmPasswordVisibility,
    formData,
    setFormData,
    isLoading,
    handleReset,
  };
}
