// features/auth/pages/RegisterPage.tsx
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { Button } from "../../../shared/components/form/Button";
import Input from "../../../shared/components/form/Input";
import Checkbox from "../../../shared/components/form/Checkbox";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  AcademicCapIcon,
  MapPinIcon,
  UsersIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { UserRole } from "../types";

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
    handleNext,
    step,
    setStep,
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
          {/* Step 1 */}
          {step === "first" && (
            <section className="space-y-4">
              <Input
                label="Username"
                name="username"
                type="text"
                placeholder="johndoe"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                prefixIcon={UserIcon}
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                prefixIcon={EnvelopeIcon}
              />
              <Input
                label="Password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="********"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                prefixIcon={LockClosedIcon}
                suffixIcon={
                  <Button
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                    type="button"
                    className="text-gray-500 hover:text-primary"
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
                suffixIcon={
                  <Button
                    onClick={() =>
                      setConfirmPasswordVisibility((prev) => !prev)
                    }
                    type="button"
                    className="text-gray-500 hover:text-primary"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                }
              />

              <Button full variant="primary" onClick={handleNext}>
                Next
              </Button>
            </section>
          )}

          {/* Step 2 */}
          {step === "second" && (
            <section>
              <h3 className="text-lg font-semibold">
                What best describes you?
              </h3>
              <div className="mt-4 space-y-6">
                <Checkbox
                  label="I am a student"
                  checked={formData.role === UserRole.STUDENT}
                  onChange={() =>
                    setFormData({ ...formData, role: UserRole.STUDENT })
                  }
                />
                <Checkbox
                  label="I am an instructor"
                  checked={formData.role === UserRole.INSTRUCTOR}
                  onChange={() =>
                    setFormData({ ...formData, role: UserRole.INSTRUCTOR })
                  }
                />
                <Checkbox
                  label="I am an organization"
                  checked={formData.role === UserRole.ORGANIZATION}
                  onChange={() =>
                    setFormData({ ...formData, role: UserRole.ORGANIZATION })
                  }
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setStep("first")}
                  type="button"
                >
                  {"<"}
                </Button>
                <Button
                  full
                  variant="primary"
                  disabled={!formData.role}
                  onClick={() => setStep("third")}
                >
                  Next
                </Button>
              </div>
            </section>
          )}

          {/* Step 3 (role-specific) */}
          {step === "third" && (
            <section className="space-y-4">
              {formData.role === UserRole.STUDENT && (
                <>
                  <Input
                    label="First Name"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    prefixIcon={IdentificationIcon}
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    prefixIcon={IdentificationIcon}
                  />
                  <Input
                    label="Birth Date"
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    prefixIcon={CalendarIcon}
                  />
                  <Input
                    label="Gender"
                    value={formData.gender || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    prefixIcon={UsersIcon}
                  />
                  <Input
                    label="Education"
                    value={formData.education || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    prefixIcon={AcademicCapIcon}
                  />
                  <Input
                    label="Phone Number"
                    value={formData.phoneNumber || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    prefixIcon={PhoneIcon}
                  />
                  <Input
                    label="Address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    prefixIcon={MapPinIcon}
                  />
                </>
              )}

              {formData.role === UserRole.INSTRUCTOR && (
                <Input
                  label="Bio"
                  value={formData.bio || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  prefixIcon={DocumentTextIcon}
                />
              )}

              {formData.role === UserRole.ORGANIZATION && (
                <>
                  <Input
                    label="Organization Name"
                    value={formData.orgName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, orgName: e.target.value })
                    }
                    prefixIcon={BuildingOfficeIcon}
                  />
                  <Input
                    label="Description"
                    value={formData.orgDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orgDescription: e.target.value,
                      })
                    }
                    prefixIcon={DocumentTextIcon}
                  />
                </>
              )}

              <div className="flex gap-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setStep("second")}
                  type="button"
                >
                  {"<"}
                </Button>
                <Button
                  full
                  variant="primary"
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
