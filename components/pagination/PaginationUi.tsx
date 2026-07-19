import { createQueryString } from "@/lib/url-helpers";
import Link from "next/link";

type PaginationUiProps = {
  paramsFilter: URLSearchParams;
  totalPages: number;
};

export function PaginationUi({ paramsFilter, totalPages }: PaginationUiProps) {
  const currentPage = Number(paramsFilter.get("page")) || 1;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex gap-3 justify-center items-center py-8">
      {prevPage ? (
        <Link
          href={`${createQueryString({ path: "/inventory", page: prevPage, params: paramsFilter })}`}
          className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-muted"
        >
          ← Previous{" "}
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm rounded-lg border opacity-50 cursor-not-allowed">
          ← Previous{" "}
        </span>
      )}

      <div className="flex justify-center items-center px-4 py-2 font-semibold rounded-lg min-w-12 bg-primary text-primary-foreground">
        Page {currentPage}
      </div>

      {nextPage ? (
        <Link
          href={`${createQueryString({ path: "/inventory", page: nextPage, params: paramsFilter })}`}
          className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-muted"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm rounded-lg border opacity-50 cursor-not-allowed">
          Next →
        </span>
      )}
    </div>
  );
}
