"use client";
import React from 'react';
import { Product, CategoryItem } from '@/lib/types';
import ProductGrid from '@/components/shop/ProductGrid';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';

interface ShopClientProps {
  initialProducts: Product[];
  categories: CategoryItem[];
  currentPage: number;
  totalPages: number;
  activeCategory?: string;
}

const ShopClient: React.FC<ShopClientProps> = ({
  initialProducts,
  categories,
  currentPage,
  totalPages,
  activeCategory,
}) => {
  const categoryLinks = [
    { name: 'Tất cả', href: '/danh-muc' },
    ...categories.map(c => ({ name: c.name, href: `/danh-muc/${c.slug}` })),
  ];

  const paginationBaseUrl = activeCategory
    ? `/danh-muc/${activeCategory}`
    : '/danh-muc';

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Cửa Hàng</h1>
        <p className="text-stone-500">Tìm kiếm phong cách của riêng bạn.</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categoryLinks.map(cat => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              (activeCategory || '') === '' && cat.href === '/danh-muc'
                ? 'bg-stone-800 text-white border-stone-800'
                : activeCategory && cat.href === `/danh-muc/${activeCategory}`
                  ? 'bg-stone-800 text-white border-stone-800'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-terracotta hover:text-terracotta'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={initialProducts}
        onResetFilters={undefined}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={paginationBaseUrl}
      />
    </div>
  );
};

export default ShopClient;
