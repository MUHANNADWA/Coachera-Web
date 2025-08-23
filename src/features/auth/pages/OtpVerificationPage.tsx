import { Button } from "../../../shared/components/form/Button";
import Input from "../../../shared/components/form/Input";
import useOtpVerification from "../hooks/useOtpVerification";

export default function OtpVerificationPage() {
  const {
    otp,
    expired,
    email,
    timer,
    inputsRef,
    handleChange,
    handleKeyDown,
    handleResend,
    handleSubmit,
    formatTime,
  } = useOtpVerification();

  return (
    <div className="page flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-8 p-8 consect text-center"
      >
        <div>
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please enter the six-digit verification code we sent to{" "}
            <strong className="text-primary">{email ?? "Your Email"}</strong>
          </p>
        </div>

        <div className="flex justify-center space-x-2 sm:space-x-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              placeholder="-"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 !p-0 !m-0 sm:w-14 sm:h-14 text-center text-lg"
            />
          ))}
        </div>

        <Button full variant="primary">
          Confirm
        </Button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {!expired ? (
            <>
              Didn’t get the code? Resend in {formatTime(timer.minute)}:
              {formatTime(timer.second)}
            </>
          ) : (
            <Button
              full
              type="button"
              onClick={handleResend}
              className="text-primary font-medium hover:underline"
            >
              Resend code
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
