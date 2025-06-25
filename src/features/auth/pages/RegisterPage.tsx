import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { Button } from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";

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
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9/12 w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account? <Link to="/login">login</Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* Username & Email */}
            <div className="flex">
              <div className="fill-available mr-4">
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
                  prefixIcon={IconUser}
                  className="mt-1 block w-full"
                />
              </div>

              <div className="fill-available ml-4">
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
                  prefixIcon={IconMail}
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            {/* Password & Role */}
            <div className="flex">
              <div className="fill-available mr-4 relative">
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
                  prefixIcon={IconLock}
                  helperText="Password must be at least 8 characters"
                  className="mt-1 block w-full pr-10"
                  suffixIcon={
                    <Button
                      onClick={() => setPasswordVisibility((prev) => !prev)}
                      className="text-gray-500 hover:text-primary"
                      type="button">
                      {isPasswordVisible ? (
                        <IconEyeOff className="h-5 w-5" />
                      ) : (
                        <IconEye className="h-5 w-5" />
                      )}
                    </Button>
                  }
                />
              </div>

              {/* Password Confirmation */}
              <div className="fill-available ml-4">
                <div className="relative">
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
                    prefixIcon={IconLock}
                    helperText="Please re-enter your password"
                    className="mt-1 block w-full pr-10"
                    suffixIcon={
                      <Button
                        onClick={() =>
                          setConfirmPasswordVisibility((prev) => !prev)
                        }
                        className="text-gray-500 hover:text-primary"
                        type="button">
                        {isConfirmPasswordVisible ? (
                          <IconEyeOff className="h-5 w-5" />
                        ) : (
                          <IconEye className="h-5 w-5" />
                        )}
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button full variant="primary" isLoading={isLoading || isUploading}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
