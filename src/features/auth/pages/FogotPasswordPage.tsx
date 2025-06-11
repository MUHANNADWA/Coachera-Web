import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { email, setEmail, isLoading, handleSubmit } = useForgotPassword();

  return (
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            placeholder="johndoe@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded">
          {isLoading ? "Loading..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
