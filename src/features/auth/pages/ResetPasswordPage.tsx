import { useResetPassword } from "../hooks/useResetPassword";
import { Button } from "../../../shared/components/form/Button";
import Input from "../../../shared/components/form/Input";
import {
  EyeSlashIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

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
    <div className="page flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleReset}
        className="max-w-md w-full space-y-8 p-8 consect">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <Input
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
              helperText="Password must be at least 8 characters"
              prefixIcon={LockClosedIcon}
              className="mt-1 block w-full pr-10"
              suffixIcon={
                <Button
                  type="button"
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                  className="text-gray-500 hover:text-primary"
                  tabIndex={-1}>
                  {isPasswordVisible ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </Button>
              }
            />
          </div>
        </div>

        {/* New Password Confirmation*/}
        <div>
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
              helperText="Please re-enter your password"
              prefixIcon={LockClosedIcon}
              className="mt-1 block w-full pr-10"
              suffixIcon={
                <Button
                  type="button"
                  onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
                  className="text-gray-500 hover:text-primary"
                  tabIndex={-1}>
                  {isConfirmPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </Button>
              }
            />
          </div>
        </div>
        <Button full variant="primary">
          Confirm
        </Button>
      </form>
    </div>
  );
}
