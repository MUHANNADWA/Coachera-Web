import { useState } from "react";
import QuizIntroPage from "./QuizIntroPage";
import QuizQuestionPage from "./QuizQuestionsPage";
import QuizResultPage from "./QuizResultPage";

export default function QuizPage({ material }: { material: any }) {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");

  const [quizResult, setQuizResult] = useState<any>(null);

  const handleStartQuiz = () => {
    setStep("quiz");
  };

  const handleSubmitQuiz = (result: any) => {
    setQuizResult(result);
    setStep("result");
  };

  return (
    <div className="space-y-4">
      {step === "intro" && (
        <QuizIntroPage material={material} onStart={handleStartQuiz} />
      )}

      {step === "quiz" && (
        <QuizQuestionPage material={material} onSubmit={handleSubmitQuiz} />
      )}

      {step === "result" && <QuizResultPage result={quizResult} />}
    </div>
  );
}
