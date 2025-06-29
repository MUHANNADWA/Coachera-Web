import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Button } from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { IconEye, IconEyeOff, IconLock, IconMail } from "@tabler/icons-react";

export default function LoginPage() {
  const {
    formData,
    setFormData,
    isPasswordVisible,
    togglePassword,
    isLoading,
    handleSubmit,
  } = useLogin();

  return (
    <div className="h-full-s flex items-center justify-center bg-gradient-to-tr from-[#0f766e] via-[#0e9488] to-[#22d3ee] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Do not have an account yet? <Link to="/signup">Register</Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <Input
              label="Email address or username"
              name="identifier"
              autoComplete="username"
              placeholder="@johndoe or johndoe@example.com"
              required
              value={formData.identifier}
              onChange={(e) =>
                setFormData({ ...formData, identifier: e.target.value })
              }
              className="mt-1 block w-full"
              prefixIcon={IconMail}
            />

            <Input
              label="Password"
              name="password"
              placeholder="********"
              value={formData.password}
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              prefixIcon={IconLock}
              suffixIcon={
                <Button
                  type="button"
                  onClick={togglePassword}
                  className="text-gray-500 hover:text-gray-700">
                  {isPasswordVisible ? (
                    <IconEyeOff className="h-5 w-5" />
                  ) : (
                    <IconEye className="h-5 w-5" />
                  )}
                </Button>
              }
            />
          </div>

          <div className="flex items-center justify-end">
            <Link to={"/forgot-password"} className="text-sm">
              Forgot your password?
            </Link>
          </div>

          <div>
            <Button full variant="primary" isLoading={isLoading}>
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
