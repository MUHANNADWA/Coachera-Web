import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Button } from "../../../shared/components/form/Button";
import Input from "../../../shared/components/form/Input";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

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
    <div className="flex items-center justify-center page py-12 px-4 sm:px-6 lg:px-8">
      <div className="consect max-w-md w-full space-y-8 p-10">
        {/* Title */}
        <section className="flex flex-col items-center space-y-3 mb-4">
          <h2 className="text-3xl font-extrabold">Log in to your account</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Do not have an account yet?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </section>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
            prefixIcon={EnvelopeIcon}
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
            prefixIcon={LockClosedIcon}
            suffixIcon={
              <Button
                type="button"
                onClick={togglePassword}
                className="text-gray-500 hover:text-gray-700 px-2 py-1"
                tabIndex={-1}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }>
                {isPasswordVisible ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            }
          />

          <div className="flex items-center justify-between mt-2">
            <div />
            <Link
              to={"/forgot-password"}
              className="text-sm text-primary font-semibold hover:underline">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6">
            <Button full variant="primary" isLoading={isLoading}>
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
