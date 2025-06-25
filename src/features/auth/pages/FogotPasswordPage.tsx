import { IconMail } from "@tabler/icons-react";
import { Button } from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { email, setEmail, isLoading, handleSubmit } = useForgotPassword();

  return (
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <Input
          label="Email address"
          name="email"
          autoComplete="email"
          type="email"
          value={email}
          placeholder="johndoe@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
          prefixIcon={IconMail}
          className="mt-1 block w-full"
        />
        <Button full variant="primary" isLoading={isLoading}>
          Send OTP
        </Button>
      </form>
    </div>
  );
}
