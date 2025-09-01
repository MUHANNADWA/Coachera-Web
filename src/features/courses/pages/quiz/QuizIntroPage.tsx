import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../shared/components/form/Button";

interface QuizIntroPageProps {
  material: {
    title: string;
    description?: string;
    quiz?: { questions: any[] };
  };
  onStart: () => void;
}

export default function QuizIntroPage({
  material,
  onStart,
}: QuizIntroPageProps) {
  const numQuestions = material.quiz?.questions?.length || 0;

  return (
    <div className="relative flex items-center justify-center h-[60vh] consect p-8">
      <section className="w-full max-w-md text-center space-y-6">
        <div className="flex flex-col items-center gap-2">
          <QuestionMarkCircleIcon
            className="h-50 text-primary mb-2"
            aria-hidden="true"
          />
          <h2 className="text-2xl font-bold mb-1">{material.title}</h2>
        </div>
        {material.description && (
          <p className="text-gray-600 mb-2">{material.description}</p>
        )}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
          <span>
            {numQuestions} Question{numQuestions !== 1 ? "s" : ""}
          </span>
          {/* Optionally add estimated time if available */}
        </div>
        <Button
          onClick={onStart}
          variant="primary"
          full
          aria-label="Start Quiz"
        >
          Start Quiz
        </Button>
      </section>
    </div>
  );
}
