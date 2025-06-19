import { Button } from "../components/Button";
import { useAppHook } from "../hooks/useAppHook";

export default function NotFoundPage() {
  const { navigate } = useAppHook();

  return (
    <div className="flex flex-col items-center justify-center h-full-s">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <p className="mt-4 text-gray-600">
        The page you were looking for does not exist
      </p>
      <Button onClick={() => navigate(-1)} variant="secondary">
        Go Back
      </Button>
    </div>
  );
}
