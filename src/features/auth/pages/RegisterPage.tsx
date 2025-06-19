import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useRegister from "../hooks/useRegister";
import { Button } from "../../../shared/components/Button";

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
    handleFileChange,
  } = useRegister();

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
              className="font-medium text-blue-600 hover:text-blue-500">
              log in to existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* Username & Email */}
            <div className="flex">
              <div className="fill-available mr-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700">
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

              <div className="fill-available ml-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
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
              <div className="fill-available mr-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                />
                {/* Toggle Icon */}

                <Button
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  type="button">
                  {isPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </Button>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters
                </p>
              </div>

              <div className="fill-available ml-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                  />
                  <Button
                    onClick={() =>
                      setConfirmPasswordVisibility((prev) => !prev)
                    }
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    type="button">
                    {isConfirmPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Please re-enter your password
                </p>
              </div>
            </div>

            {/* Password Confirmation */}
            <div className="flex">
              {/* Profile Image URL */}
              <div
                className={
                  !formData.profileImageUrl
                    ? "fill-available"
                    : `w-[calc(80%-2rem)] mr-4`
                }>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700">
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

          {/* Submit */}
          <div>
            <Button full variant="primary" isLoading={isLoading || isUploading}>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
