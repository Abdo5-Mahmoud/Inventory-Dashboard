import { createQueryString } from "@/lib/url-helpers";
import Link from "next/link";
import path from "path";

type PaginationUiProps = {
  pageNumber: string;
  paramsFilter: {
    limit: number;
    category: string;
    sortBy: string;
    order: string;
    page: number;
    params: URLSearchParams;
    skip: number;
  };
  totalPages: number;
};

export function PaginationUi({
  pageNumber,
  paramsFilter,
  totalPages,
}: PaginationUiProps) {
  const { limit, category, sortBy, order, page, params, skip } = paramsFilter;
  const currentPage = Number(pageNumber);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex gap-3 justify-center items-center py-8">
      {prevPage ? (
        <Link
          href={`${createQueryString({ path: "/inventory", limit: limit, category: category, sortBy: sortBy, order: order, page: prevPage, params: params })}`}
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
          href={`${createQueryString({ path: "/inventory", limit: limit, category: category, sortBy: sortBy, order: order, page: nextPage, params: params })}`}
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
