"use client";
import React, { useState, useCallback } from 'react';
import { Product, CategoryItem } from '@/lib/types';
import ProductGrid from '@/components/shop/ProductGrid';

interface ShopClientProps {
  initialProducts: Product[];
  categories: CategoryItem[];
}

const ShopClient: React.FC<ShopClientProps> = ({ initialProducts, categories }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async (categorySlug?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '100');
      if (categorySlug && categorySlug !== 'All') {
        params.set('category_slug', categorySlug);
      }
      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();
      setProducts(json.data?.items || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const category = categories.find(c => c.name === cat);
    loadProducts(category?.slug);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    loadProducts();
  };

  const categoryNames: string[] = ['All', ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Cửa Hàng</h1>
        <p className="text-stone-500">Tìm kiếm phong cách của riêng bạn.</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categoryNames.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              activeCategory === cat
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-white text-stone-600 border-stone-200 hover:border-terracotta hover:text-terracotta'
            }`}
          >
            {cat === 'All' ? 'Tất cả' : cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-stone-200 rounded-2xl mb-4"></div>
              <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid
          products={products}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
};

export default ShopClient;
