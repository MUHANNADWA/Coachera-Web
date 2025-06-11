import { useEffect, useRef, useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import toast from "react-hot-toast";
import { useValidateOtpMutation } from "../authApiSlice";
import toastPromise from "../../../utils/toast";

export default function useOtpVerification() {
  const { location, navigate } = useAppHook();
  const [validate, { isLoading }] = useValidateOtpMutation();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [expired, setExpired] = useState(false);
  const [timer, setTimer] = useState({ minute: 4, second: 59 });
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (expired) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const totalSeconds = prev.minute * 60 + prev.second - 1;

        if (totalSeconds <= 0) {
          clearInterval(interval);
          setExpired(true);
          return { minute: 0, second: 0 };
        }

        return {
          minute: Math.floor(totalSeconds / 60),
          second: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expired]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Verifying OTP:", code);

    await toastPromise(validate({ email, otp: code }).unwrap(), {
      loadingMessage: "Logging in...",
      successMessage: "Logged in successfully!",
      errorMessage: "Login failed",
      onSuccess: (_res) => {
        navigate("/reset-password", {
          state: { email: email, otp: code },
        });
      },
    });
  };

  const handleResend = () => {
    console.log("Resending OTP...");
    setOtp(Array(6).fill(""));
    setExpired(false);
    setTimer({ minute: 4, second: 59 });
    inputsRef.current[0]?.focus();
    // Resend OTP API here
  };

  const formatTime = (num: number) => num.toString().padStart(2, "0");
  const email = location.state?.email;

  return {
    otp,
    expired,
    email,
    timer,
    inputsRef,
    handleChange,
    handleKeyDown,
    handleResend,
    handleSubmit,
    formatTime,
  };
}
