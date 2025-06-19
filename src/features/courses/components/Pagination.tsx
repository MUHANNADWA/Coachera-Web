import { Button } from "../../../shared/components/Button";

interface CoursesPaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

export default function Pagination({
  setPage,
  page,
  totalPages,
  isLoading,
  isError,
}: CoursesPaginationProps) {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages - 2, page + delta);

    pages.push(0); // First page

    if (start > 1) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 2) pages.push("...");

    pages.push(totalPages - 1); // Last page

    return pages;
  };

  if (isLoading || isError || totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center mt-10 flex-wrap gap-2">
      <Button
        disabled={page === 0}
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition">
        Previous
      </Button>

      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={`page-${p}`}
            onClick={() => setPage(Number(p))}
            className={`px-4 py-2 rounded transition ${
              Number(p) === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {Number(p) + 1}
          </Button>
        )
      )}

      <Button
        disabled={page === totalPages - 1}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition">
        Next
      </Button>
    </div>
  );
}
