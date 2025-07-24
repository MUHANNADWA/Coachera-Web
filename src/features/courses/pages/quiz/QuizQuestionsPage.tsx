import { useState } from "react";
import { Material } from "../../../../shared/types/types";
import { Button } from "../../../../shared/components/form/Button";
import Modal from "../../../../shared/components/Modal";
import { useModal } from "../../../../shared/hooks/useModal";
import { useSubmitQuizMutation } from "../../apiSlices/quizApiSlice";
import toastPromise from "../../../../utils/toast";

interface QuizPageProps {
  material: Material;
  onSubmit: any;
}

export default function QuizQuestionsPage({
  material,
  onSubmit,
}: QuizPageProps) {
  const quiz = material.quiz;

  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [submitQuiz, { isLoading }] = useSubmitQuizMutation();

  if (!quiz) return <p>No quiz found.</p>;

  const handleSelect = (questionId: number, answerIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = async () => {
    const allAnswered = quiz.questions.every(
      (q) => answers[q.id] !== undefined
    );

    if (!allAnswered) {
      openModal();
      return;
    }

    const data = {
      quizId: quiz.id,
      questions: quiz.questions.map((q) => ({
        questionId: q.id,
        answerIndex: answers[q.id],
      })),
    };

    await toastPromise(submitQuiz(data).unwrap(), {
      loadingMessage: "Submitting your quiz...",
      successMessage: "Quiz submitted successfully!",
      errorMessage: "Failed to submit quiz",
      onSuccess: () => {
        setSubmitted(true);
        const result = { score: 7, total: 10 }; // مؤقت
        onSubmit(result);
      },
    });
  };

  return (
    <div className="p-4 z-40!">
      <h1 className="consect p-4 text-2xl mb-6 font-semibold">
        {material.title}
      </h1>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {quiz.questions.map((question, qIndex) => {
          const answerOptions = [
            question.answer1,
            question.answer2,
            question.answer3,
            question.answer4,
          ].filter((a): a is string => Boolean(a));

          return (
            <div key={question.id} className="consect p-4 space-y-3">
              <p className="font-medium text-lg">{`Q${qIndex + 1}: ${
                question.content
              }`}</p>
              {answerOptions.map((answer, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-colors duration-100
                    ${
                      answers[question.id] === idx
                        ? "border-2 border-primary bg-primary-lightest dark:bg-primary-darkest"
                        : "border-gray-200"
                    }`}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === idx}
                    onChange={() => handleSelect(question.id, idx)}
                    className="form-radio accent-primary"
                    disabled={submitted}
                  />
                  <span>{answer}</span>
                </label>
              ))}
            </div>
          );
        })}

        <Button
          full
          type="button"
          onClick={handleSubmit}
          variant="primary"
          disabled={submitted || isLoading}>
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
