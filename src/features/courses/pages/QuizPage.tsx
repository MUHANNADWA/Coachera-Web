import { useState } from "react";
import { Material } from "../../../shared/types/types"; // Adjust path as needed

interface QuizPageProps {
  material: Material;
}

export default function QuizPage({ material }: QuizPageProps) {
  const quiz = material.quiz;

  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

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
      alert("Please answer all questions.");
      return;
    }

    // Submit logic here
    setSubmitted(true);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 font-semibold">{material.title}</h1>
      <hr className="mb-4" />

      <form className="space-y-12">
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
                  className={`flex items-center gap-3 p-2 border rounded cursor-pointer ${
                    answers[question.id] === idx
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === idx}
                    onChange={() => handleSelect(question.id, idx)}
                    className="form-radio text-blue-600"
                  />
                  <span>{answer}</span>
                </label>
              ))}
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={submitted}>
          {submitted ? "Submitted" : "Submit Quiz"}
        </button>
      </form>
    </div>
  );
}
