import { useNavigate } from "react-router-dom";

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <button onClick={() => navigate(-1)} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Go Back
      </button>
    </div>
  );
}