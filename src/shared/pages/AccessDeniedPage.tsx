import { Button } from "../components/form/Button";
import { useAppHook } from "../hooks/useAppHook";

export default function AccessDeniedPage() {
  const { navigate } = useAppHook();

  return (
    <div className="flex flex-col items-center justify-center h-full-s">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">
        403
      </h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
        Access Denied
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        You do not have permission to view this page.
      </p>
      <Button onClick={() => navigate(-1)} variant="secondary">
        Go Back
      </Button>
    </div>
  );
}
