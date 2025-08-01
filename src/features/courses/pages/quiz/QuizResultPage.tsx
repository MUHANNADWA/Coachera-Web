import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../shared/components/form/Button";

interface QuizResultPageProps {
  result: {
    score: number;
    total: number;
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
    <section className="consect relative flex flex-col items-center justify-center h-[60vh] p-8 text-center space-y-6">
      <FaceSmileIcon
        className={`text-6xl ${isPassed ? "text-primary" : "text-danger"}`}
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
          isPassed ? "text-primary" : "text-danger"
        } font-semibold`}>
        {isPassed
          ? "Great job! You passed the quiz."
          : "Keep practicing! You can try again."}
      </p>
      {onRetake && (
        <Button onClick={onRetake} variant="primary">
          Retake Quiz
        </Button>
      )}
    </section>
  );
}
