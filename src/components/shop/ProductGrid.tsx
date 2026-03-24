"use client";
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-stone-100 text-stone-400 mb-4">
          <span className="text-2xl font-serif">?</span>
        </div>
        <p className="text-stone-600 font-medium">Không tìm thấy sản phẩm nào.</p>
        <p className="text-stone-500 text-sm mt-2">Hãy thử chọn danh mục hoặc màu sắc khác nhé.</p>
        {onResetFilters && (
          <button 
            onClick={onResetFilters}
            className="mt-6 text-terracotta hover:underline font-medium"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
