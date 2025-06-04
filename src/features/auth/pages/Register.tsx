import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  useLoginMutation,
  useRegisterMutation,
  useUploadPhotoMutation,
} from "../usersApiSlice";
import { setCredentials } from "../authSlice";
import toast from "react-hot-toast";
import toastPromise from "../../../utils/toast";
import { useAppHook } from "../../../shared/hooks/useAppHook";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    profileImageUrl: "",
  });

  const { navigate, dispatch, token } = useAppHook();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const loginFormData = {
      identifier: formData.email,
      password: formData.password,
    };

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

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

  return (
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9/12 w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              log in to existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* Username & Email */}
            <div className="flex">
              <div className="w-[-webkit-fill-available] mr-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="johndoe"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="w-[-webkit-fill-available] ml-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="johndoe@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Password & Role */}
            <div className="flex">
              <div className="w-[-webkit-fill-available] mr-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="********"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                />
                {/* Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters
                </p>
              </div>

              <div className="w-[-webkit-fill-available] ml-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            </div>

            {/* Password Confirmation */}
            <div className="flex">
              <div className="w-[-webkit-fill-available] mr-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Please re-enter your password
                </p>
              </div>

              {/* Profile Image URL */}
              <div
                className={
                  !formData.profileImageUrl
                    ? "w-[-webkit-fill-available] ml-4"
                    : `w-[calc(80%-2rem)] mr-4 ml-4`
                }
              >
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  required
                  onDragOver={() => handleFileChange}
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
                />
                {isUploading ? (
                  <p className="text-xs text-blue-500 mt-1">Uploading...</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    Choose a file or drag it here
                  </p>
                )}
              </div>
              {formData.profileImageUrl && (
                <img
                  src={formData.profileImageUrl}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-full"
                />
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                Terms and Conditions
              </Link>
            </label>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
