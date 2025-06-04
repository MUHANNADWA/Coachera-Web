import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLoginMutation } from "../usersApiSlice";
import { setCredentials } from "../authSlice";
import toastPromise from "../../../utils/toast";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Email address or username
              </label>
              <input
                id="identifier"
                name="identifier"
                autoComplete="username"
                placeholder="@johndoe or johndoe@example.com"
                required
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
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
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              onSubmit={handleSubmit}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loging in..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
