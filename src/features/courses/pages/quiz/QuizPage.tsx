// features/courses/pages/quiz/QuizPage.tsx
import { useCallback, useState } from "react";
import QuizIntroPage from "./QuizIntroPage";
import QuizQuestionPage from "./QuizQuestionsPage";
import QuizResultPage from "./QuizResultPage";

type Step = "intro" | "quiz" | "result";

interface QuizPageProps {
  material: any; // If you have a Material type with quiz shape, replace 'any'
}

export default function QuizPage({ material }: QuizPageProps) {
  const [step, setStep] = useState<Step>("intro");
  const [quizResult, setQuizResult] = useState<{
    score: number;
    total: number;
  } | null>(null);

  const handleStartQuiz = useCallback(() => setStep("quiz"), []);
  const handleSubmitQuiz = useCallback(
    (result: { score: number; total: number }) => {
      setQuizResult(result);
      setStep("result");
    },
    []
  );
  const handleRetake = useCallback(() => {
    setQuizResult(null);
    setStep("quiz");
  }, []);

  return (
    <div className="space-y-4">
      {step === "intro" && (
        <QuizIntroPage material={material} onStart={handleStartQuiz} />
      )}

      {step === "quiz" && (
        <QuizQuestionPage material={material} onSubmit={handleSubmitQuiz} />
      )}

      {step === "result" && quizResult && (
        <QuizResultPage result={quizResult} onRetake={handleRetake} />
      )}
    </div>
  );
}
