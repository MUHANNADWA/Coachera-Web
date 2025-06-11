interface CoursesPaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

export default function Pagination(props: CoursesPaginationProps) {
  return (
    <>
      {!props.isLoading && !props.isError && props.totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            disabled={props.page === 0}
            onClick={() => props.setPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
            Previous
          </button>

          {Array.from({ length: props.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => props.setPage(i)}
              className={`px-4 py-2 rounded ${
                i === props.page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              {i + 1}
            </button>
          ))}

          <button
            disabled={props.page === props.totalPages - 1}
            onClick={() =>
              props.setPage((prev) => Math.min(prev + 1, props.totalPages - 1))
            }
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </>
  );
}
