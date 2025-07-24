import { FaceSmileIcon } from "@heroicons/react/24/outline";

interface QuizResultPageProps {
  result: {
    score: number;
    total: number;
    // Optionally add more fields for feedback, etc.
  };
  onRetake?: () => void;
}

export default function QuizResultPage({
  result,
  onRetake,
}: QuizResultPageProps) {
  const percentage = Math.round((result.score / result.total) * 100);
  const isPassed = percentage >= 70;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
      <FaceSmileIcon
        className={`text-6xl ${
          isPassed ? "text-green-500" : "text-yellow-500"
        }`}
        aria-hidden="true"
      />
      <h2 className="text-2xl font-bold">Quiz Result</h2>
      <p className="text-lg font-medium">
        You scored{" "}
        <span className="text-primary font-bold">{result.score}</span> out of{" "}
        <span className="font-bold">{result.total}</span>
      </p>
      <p
        className={`text-base ${
          isPassed ? "text-green-600" : "text-yellow-600"
        } font-semibold`}>
        {isPassed
          ? "Great job! You passed the quiz."
          : "Keep practicing! You can try again."}
      </p>
      {onRetake && (
        <button
          onClick={onRetake}
          className="btn btn-outline-primary mt-4 px-6 py-2 rounded-xl font-semibold transition hover:bg-primary-lightest focus:outline-none focus:ring-2 focus:ring-primary">
          Retake Quiz
        </button>
      )}
    </section>
  );
}
