"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, Loader2, ChevronRight, SlidersHorizontal, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

type SortOption = 'newest' | 'price_asc' | 'price_desc';

const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Mới nhất',
  price_asc: 'Giá tăng dần',
  price_desc: 'Giá giảm dần',
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sort, setSort] = useState<SortOption>('newest');

  const fetchProducts = useCallback(async (q: string, sortBy: SortOption) => {
    if (!q.trim()) {
      setProducts([]);
      setTotal(0);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      params.set('q', q.trim());
      params.set('limit', '50');
      params.set('sort', sortBy);

      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();
      const data = json.data || {};
      setProducts(data.items || []);
      setTotal(data.total || 0);
    } catch {
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(query, sort);
      // Update URL without navigation
      if (query.trim()) {
        router.replace(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, sort, fetchProducts, router]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const clearSearch = () => {
    setQuery('');
    setProducts([]);
    setTotal(0);
    setHasSearched(false);
    inputRef.current?.focus();
    router.replace('/search', { scroll: false });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Search Header */}
      <div className="bg-white border-b border-stone-200 sticky top-[7rem] z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm handmade..."
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-stone-300 bg-stone-50
                  text-base focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-2
                  focus:ring-stone-200 transition-all"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-stone-400 flex-shrink-0" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone-500 flex items-center gap-1 mb-6">
          <Link href="/" className="hover:text-stone-900 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-stone-900">Tìm kiếm</span>
          {query && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-stone-900 font-medium truncate max-w-[200px]">&quot;{query}&quot;</span>
            </>
          )}
        </nav>

        {/* Results header */}
        {hasSearched && !loading && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-stone-600 text-sm">
              {total > 0 ? (
                <>Tìm thấy <span className="font-bold text-stone-900">{total}</span> sản phẩm cho &quot;{query}&quot;</>
              ) : (
                <>Không tìm thấy sản phẩm nào cho &quot;{query}&quot;</>
              )}
            </p>
            {total > 0 && (
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-stone-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="text-sm border border-stone-300 rounded-lg px-3 py-1.5 bg-white
                    focus:border-stone-900 focus:outline-none"
                >
                  {Object.entries(SORT_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Welcome state */}
        {!hasSearched && !loading && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-stone-200 mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3">
              Tìm kiếm sản phẩm
            </h2>
            <p className="text-stone-500 max-w-md mx-auto">
              Nhập tên sản phẩm, loại hàng hoặc từ khoá để tìm sản phẩm handmade yêu thích
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-stone-200 rounded-2xl aspect-square mb-3" />
                <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {hasSearched && !loading && total === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-stone-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-stone-500 mb-6 max-w-md mx-auto">
              Thử tìm với từ khoá khác hoặc duyệt cửa hàng để khám phá thêm sản phẩm
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full
                font-bold hover:bg-stone-800 transition-all text-sm"
            >
              Xem cửa hàng
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
