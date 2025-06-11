import { useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useForgotPasswordMutation } from "../authApiSlice";
import toastPromise from "../../../utils/toast";

export function useForgotPassword() {
  const { navigate } = useAppHook();
  const [sendOTP, { isLoading }] = useForgotPasswordMutation();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toastPromise(sendOTP(email).unwrap(), {
      loadingMessage: "Sending OTP...",
      successMessage: "OTP sent successfully!",
      errorMessage: "OTP sending failed",
      onSuccess: (_res) => {
        navigate(`/otp-verification`, {
          state: { email: email },
        });
      },
    });
  };

  return {
    email,
    setEmail,
    isLoading,
    handleSubmit,
  };
}
