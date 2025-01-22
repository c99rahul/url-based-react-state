interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isLoading: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  isLoading,
}: PaginationProps) {
  const buttonClassName =
    "rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

  return (
    <nav
      className="flex items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-4"
      aria-label="Pagination"
    >
      <button
        onClick={onPrevious}
        disabled={!hasPrevious || isLoading}
        className={buttonClassName}
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext || isLoading}
        className={buttonClassName}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
