import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { Button } from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const {
    formData,
    setFormData,
    isPasswordVisible,
    setPasswordVisibility,
    isConfirmPasswordVisible,
    setConfirmPasswordVisibility,
    isUploading,
    isLoading,
    handleSubmit,
  } = useRegister();

  return (
    <div className="min-h-full-s flex items-center justify-center bg-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center space-y-3 mb-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-primary font-semibold hover:underline"
              to="/login">
              login
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="johndoe"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            prefixIcon={UserIcon}
            className="mt-1 block w-full"
          />

          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="johndoe@example.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            prefixIcon={EnvelopeIcon}
            className="mt-1 block w-full"
          />

          <Input
            label="Password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="new-password"
            placeholder="********"
            required
            minLength={8}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            prefixIcon={LockClosedIcon}
            helperText="Password must be at least 8 characters"
            className="mt-1 block w-full pr-10"
            suffixIcon={
              <Button
                onClick={() => setPasswordVisibility((prev) => !prev)}
                className="text-gray-500 hover:text-primary"
                type="button">
                {isPasswordVisible ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            }
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            autoComplete="new-password"
            placeholder="********"
            required
            minLength={8}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            prefixIcon={LockClosedIcon}
            helperText="Please re-enter your password"
            className="mt-1 block w-full pr-10"
            suffixIcon={
              <Button
                onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
                className="text-gray-500 hover:text-primary"
                type="button">
                {isConfirmPasswordVisible ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            }
          />

          {/* Submit */}
          <Button full variant="primary" isLoading={isLoading || isUploading}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
