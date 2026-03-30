import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Base URL for pagination links, e.g. "/news" → generates "/news?page=2" */
  baseUrl: string;
  /** Optional query param name, defaults to "page" */
  pageParam?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  pageParam = 'page',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const buildHref = (page: number) => {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${pageParam}=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Phân trang">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 hover:text-terracotta transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Trước
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-stone-300 bg-stone-50 border border-stone-100 rounded-xl cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" /> Trước
        </span>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className="px-2 py-2 text-stone-400">
              …
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              className="w-10 h-10 flex items-center justify-center text-sm font-bold text-white bg-stone-900 rounded-xl shadow-sm"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={buildHref(page)}
              className="w-10 h-10 flex items-center justify-center text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 hover:text-terracotta transition-all"
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 hover:text-terracotta transition-all"
        >
          Sau <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-stone-300 bg-stone-50 border border-stone-100 rounded-xl cursor-not-allowed">
          Sau <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
