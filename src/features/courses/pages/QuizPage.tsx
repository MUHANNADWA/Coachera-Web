import { useState } from "react";
import { Material } from "../../../shared/types/types";
import { Button } from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import { useModal } from "../../../shared/hooks/useModal";

interface QuizPageProps {
  material: Material;
}

export default function QuizPage({ material }: QuizPageProps) {
  const quiz = material.quiz;

  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  if (!quiz) return <p>No quiz found.</p>;

  const handleSelect = (questionId: number, answerIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    const allAnswered = quiz.questions.every(
      (q) => answers[q.id] !== undefined
    );
    if (!allAnswered) {
      openModal();
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-semibold">{material.title}</h1>
      <hr className="mb-4" />

      <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
        {quiz.questions.map((question, qIndex) => {
          const answerOptions = [
            question.answer1,
            question.answer2,
            question.answer3,
            question.answer4,
          ].filter((a): a is string => Boolean(a));

          return (
            <div key={question.id} className="space-y-3">
              <p className="font-medium text-lg">{`Q${qIndex + 1}: ${
                question.content
              }`}</p>
              {answerOptions.map((answer, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-2 border rounded-2xl cursor-pointer ${
                    answers[question.id] === idx
                      ? "border-primary bg-primary-lightest"
                      : "border-gray-200"
                  }`}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === idx}
                    onChange={() => handleSelect(question.id, idx)}
                    className="form-radio accent-primary"
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
          disabled={submitted}>
          {submitted ? "Submitted" : "Submit Quiz"}
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
