import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { Button } from "../../../shared/components/form/Button";
import Input from "../../../shared/components/form/Input";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Checkbox from "../../../shared/components/form/Checkbox";

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
    step,
    setStep,
    handleNext,
  } = useRegister();

  return (
    <div className="flex items-center justify-center page py-12 px-4 sm:px-6 lg:px-8">
      <div className="consect max-w-md w-full space-y-8 p-10">
        <div className="flex flex-col items-center space-y-3 mb-4">
          <h2 className="text-3xl font-extrabold">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              className="text-primary font-semibold hover:underline"
              to="/login"
            >
              login
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {step === "first" && (
            <section>
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
                    type="button"
                  >
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
                    onClick={() =>
                      setConfirmPasswordVisibility((prev) => !prev)
                    }
                    className="text-gray-500 hover:text-primary"
                    type="button"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                }
              />

              {/* Next Step */}
              <Button
                full
                variant="primary"
                onClick={handleNext}
                disabled={
                  !(
                    formData.email &&
                    formData.username &&
                    formData.password &&
                    formData.confirmPassword
                  )
                }
              >
                Next
              </Button>
            </section>
          )}
          {step === "second" && (
            <section>
              <h3 className="text-lg font-semibold">
                What best describes you?
              </h3>

              <div className="mt-4 space-y-6">
                <div>
                  <Checkbox
                    label="I am a student"
                    checked={formData.role === "student"}
                    onChange={() =>
                      setFormData({ ...formData, role: "student" })
                    }
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                    You want to enroll in courses and learn from instructors.
                  </p>
                </div>

                <div>
                  <Checkbox
                    label="I am a teacher"
                    checked={formData.role === "teacher"}
                    onChange={() =>
                      setFormData({ ...formData, role: "teacher" })
                    }
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                    You want to create and manage educational content.
                  </p>
                </div>

                <div>
                  <Checkbox
                    label="I am an organization"
                    checked={formData.role === "organization"}
                    onChange={() =>
                      setFormData({ ...formData, role: "organization" })
                    }
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                    You represent an institution offering multiple courses or
                    managing instructors.
                  </p>
                </div>
              </div>

              {/* Create Account */}
              <div className="flex gap-4 items-center">
                <Button
                  variant="secondary"
                  className="px-4! py-[10px]!"
                  onClick={() => setStep("first")}
                >
                  {"<"}
                </Button>

                <Button
                  full
                  variant="primary"
                  disabled={!formData.role}
                  isLoading={isLoading || isUploading}
                >
                  Create Account
                </Button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
