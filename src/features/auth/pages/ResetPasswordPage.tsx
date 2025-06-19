import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useResetPassword } from "../hooks/useResetPassword";
import { Button } from "../../../shared/components/Button";

export default function ResetPasswordPage() {
  const {
    isPasswordVisible,
    setPasswordVisibility,
    isConfirmPasswordVisible,
    setConfirmPasswordVisibility,
    formData,
    setFormData,
    handleReset,
  } = useResetPassword();

  return (
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleReset}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
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
            <Button
              type="button"
              onClick={() => setPasswordVisibility((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              tabIndex={-1}>
              {isPasswordVisible ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 6 characters
          </p>
        </div>

        {/* New Password Confirmation*/}
        <div>
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
              type="button"
              onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              tabIndex={-1}>
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
        <Button full variant="primary">Confirm</Button>
      </form>
    </div>
  );
}
