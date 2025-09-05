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
  PhotoIcon,
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
    handleFileChange,
  } = useRegister();

  return (
    <div className="flex items-center justify-center page py-12 px-4 sm:px-6 lg:px-8">
      <div className="consect max-w-md w-full space-y-8 p-10">
        <div className="flex flex-col items-center space-y-3 mb-4">
          <h2 className="text-3xl font-extrabold">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account{" "}
            <Link
              className="text-primary font-semibold hover:underline"
              to="/login"
            >
              login
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Step 1: credentials */}
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
                  setFormData({ ...formData, confirmPassword: e.target.value })
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

          {/* Step 2: role + optional avatar */}
          {step === "second" && (
            <section className="space-y-6">
              <h3 className="text-lg font-semibold">What best describes you</h3>
              <div className="space-y-4">
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

              {/* Optional avatar upload */}
              <div className="rounded-2xl border border-dashed p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark flex items-center justify-center overflow-hidden">
                    {formData.profileImageUrl ? (
                      <img
                        src={formData.profileImageUrl}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PhotoIcon
                        className="w-7 h-7 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Profile photo (optional)
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, or WEBP up to 5MB
                    </p>
                    <label className="inline-flex mt-2">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="px-3 py-2 rounded-2xl border cursor-pointer text-sm hover:bg-gray-50 dark:hover:bg-dark">
                        Choose file
                      </span>
                    </label>
                  </div>
                </div>
                {isUploading && (
                  <p className="text-xs mt-2 text-gray-500">Uploading...</p>
                )}
              </div>

              <div className="flex gap-4">
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

          {/* Step 3: role-specific */}
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
                    required
                    prefixIcon={IdentificationIcon}
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                    prefixIcon={IdentificationIcon}
                  />
                  <Input
                    label="Birth Date"
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    required
                    prefixIcon={CalendarIcon}
                  />
                  <Input
                    label="Gender"
                    value={formData.gender || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    required
                    prefixIcon={UsersIcon}
                  />
                  <Input
                    label="Education"
                    value={formData.education || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    required
                    prefixIcon={AcademicCapIcon}
                  />
                  <Input
                    label="Phone Number"
                    value={formData.phoneNumber || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    required
                    prefixIcon={PhoneIcon}
                  />
                  <Input
                    label="Address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                    prefixIcon={MapPinIcon}
                  />
                </>
              )}

              {formData.role === UserRole.INSTRUCTOR && (
                <>
                  <Input
                    label="Full Name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    prefixIcon={UserIcon}
                    placeholder="Son Goku"
                  />
                  <Input
                    label="Bio"
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    required
                    prefixIcon={DocumentTextIcon}
                    placeholder="I am Super Sayan hhh"
                  />
                </>
              )}

              {formData.role === UserRole.ORGANIZATION && (
                <>
                  <Input
                    label="Organization Name"
                    value={formData.orgName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, orgName: e.target.value })
                    }
                    required
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
                    required
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
