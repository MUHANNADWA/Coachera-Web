import { useState } from "react";
import { Material } from "../../../../shared/types/types";
import { Button } from "../../../../shared/components/form/Button";
import Modal from "../../../../shared/components/Modal";
import { useModal } from "../../../../shared/hooks/useModal";
import { useVerifyQuizMutation } from "../../api/quizApiSlice";
import toastPromise from "../../../../shared/utils/toast";

interface QuizPageProps {
  material: Material;
  onSubmit: (result: { score: number; total: number }) => void;
}

// Safe helpers to derive stable keys and options
const getQuestionKey = (q: any, qIndex: number) => (q?.id ?? qIndex) as number;

// Keep original 1..4 indices to match backend expectations
const getAnswerOptions = (q: any) => {
  const raw = [q?.answer1, q?.answer2, q?.answer3, q?.answer4];
  return raw
    .map((label, i) => (label ? { label, index: i + 1 } : null))
    .filter((x): x is { label: string; index: number } => Boolean(x));
};

export default function QuizQuestionsPage({
  material,
  onSubmit,
}: QuizPageProps) {
  const quiz = material.quiz;

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [submitQuiz, { isLoading }] = useVerifyQuizMutation();

  if (!quiz) return <p>No quiz found.</p>;

  const handleSelect = (qKey: number, answerIndex1Based: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qKey]: answerIndex1Based }));
  };

  const handleSubmit = async () => {
    // Ensure every question has an answer
    const allAnswered = quiz.questions.every((q: any, qi: number) => {
      const qKey = getQuestionKey(q, qi);
      return answers[qKey] !== undefined;
    });

    if (!allAnswered) {
      openModal();
      return;
    }

    const payload = {
      quizId: quiz.id,
      questions: quiz.questions.map((q: any, qi: number) => ({
        // Use backend id if exists, else fallback to index
        questionId: q?.id ?? qi,
        // Already 1-based and aligned with original positions
        answerIndex: answers[getQuestionKey(q, qi)],
      })),
    };

    await toastPromise(submitQuiz(payload).unwrap(), {
      loadingMessage: "Submitting your quiz...",
      successMessage: "Quiz submitted successfully!",
      errorMessage: "Failed to submit quiz",
      onSuccess: (res: any) => {
        setSubmitted(true);
        const score = res?.data?.correctAnswers ?? 0;
        const total = res?.data?.totalQuestions ?? quiz.questions.length;
        onSubmit({ score, total });
      },
    });
  };

  return (
    <div className="p-4 z-40!">
      <h1 className="consect p-4 text-2xl mb-6 font-semibold">
        {material.title}
      </h1>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {quiz.questions.map((question: any, qIndex: number) => {
          const qKey = getQuestionKey(question, qIndex);
          const answerOptions = getAnswerOptions(question); // [{label, index:1..4}]

          return (
            <div key={qKey} className="consect p-4 space-y-3">
              <p className="font-medium text-lg">{`Q${qIndex + 1}: ${
                question.content
              }`}</p>

              {answerOptions.map((opt) => {
                const checked = answers[qKey] === opt.index;
                return (
                  <label
                    key={opt.index}
                    className={`flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-colors duration-100 border 
                      ${
                        checked
                          ? "border-2 border-primary bg-primary-lightest dark:bg-primary-darkest"
                          : "border-gray-200 dark:border-white/10"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qKey}`} // unique group per question
                      checked={checked}
                      onChange={() => handleSelect(qKey, opt.index)} // store 1-based index
                      className="form-radio accent-primary"
                      disabled={submitted}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          );
        })}

        <Button
          full
          type="button"
          onClick={handleSubmit}
          variant="primary"
          disabled={submitted || isLoading}
        >
          {submitted
            ? "Submitted"
            : isLoading
            ? "Submitting..."
            : "Submit Quiz"}
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Incomplete Quiz"
        message="Please answer all questions before submitting the quiz."
        variant="info"
      />
    </div>
  );
}
