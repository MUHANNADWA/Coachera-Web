import { useEffect, useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useLocation } from "react-router-dom";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../api/authApiSlice";
import toastPromise from "../../../shared/utils/toast";

export function useLogin() {
  const { navigate, dispatch, token } = useAppHook();
  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
  }, [navigate, redirect, token]);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePassword = () => setPasswordVisibility((prev) => !prev);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    await toastPromise(login(formData).unwrap(), {
      loadingMessage: "Logging in...",
      successMessage: "Logged in successfully!",
      errorMessage: "Login failed",
      onSuccess: (res) => {
        dispatch(setCredentials(res.data));
        navigate(redirect);
      },
    });
  };

  return {
    formData,
    setFormData,
    isPasswordVisible,
    togglePassword,
    isLoading,
    handleSubmit,
  };
}
