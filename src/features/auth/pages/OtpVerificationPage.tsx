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
    <div className="h-full-s flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
          <p className="text-gray-600 mt-2">
            Please enter the six-digit verification code we sent to{" "}
            <strong>{email ?? "Your Email"}</strong>
          </p>
        </div>

        <div className="flex justify-center space-x-2 sm:space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition">
          Confirm
        </button>

        <div className="text-sm text-gray-500">
          {!expired ? (
            <>
              Didn’t get the code? Resend in {formatTime(timer.minute)}:
              {formatTime(timer.second)}
            </>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 font-medium hover:underline">
              Resend code
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-sm text-gray-600 mt-2 hover:underline">
          ← back
        </button>
      </form>
    </div>
  );
}
