// features/courses/pages/quiz/QuizResultPage.tsx
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../shared/components/form/Button";

interface QuizResultPageProps {
  result: { score: number; total: number };
  onRetake?: () => void;
}

export default function QuizResultPage({
  result,
  onRetake,
}: QuizResultPageProps) {
  const percentage =
    result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
  const isPassed = percentage >= 70;

  return (
    <section
      aria-label="Quiz result"
      className="consect relative flex flex-col items-center justify-center h-[60vh] p-8 text-center space-y-6 rounded-2xl"
    >
      <FaceSmileIcon
        className={`w-16 h-16 ${isPassed ? "text-primary" : "text-danger"}`}
        aria-hidden="true"
      />

      <h2 className="text-2xl font-bold">Quiz Result</h2>

      <p className="text-lg font-medium">
        You scored{" "}
        <span
          className={`font-bold ${isPassed ? "text-primary" : "text-danger"}`}
        >
          {result.score}
        </span>{" "}
        out of <span className="font-bold">{result.total}</span>{" "}
        <span className="text-gray-500">({percentage}%)</span>
      </p>

      <p
        className={`${isPassed ? "text-primary" : "text-danger"} font-semibold`}
      >
        {isPassed
          ? "Great job! You passed the quiz."
          : "Keep practicing! You can try again."}
      </p>

      {onRetake && (
        <Button
          onClick={onRetake}
          variant="primary"
          type="button"
          aria-label="Retake quiz"
        >
          Retake Quiz
        </Button>
      )}
    </section>
  );
}
