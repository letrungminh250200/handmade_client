"use client";
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/lib/constants';
import { Category } from '@/lib/types';
import ProductFilters from '@/components/shop/ProductFilters';
import ProductGrid from '@/components/shop/ProductGrid';

const Shop: React.FC = () => {
  // Page chỉ quản lý filter state
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  
  // Logic lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchColor = selectedColor === 'All' || p.colors.includes(selectedColor);
      return matchCategory && matchColor;
    });
  }, [activeCategory, selectedColor]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedColor('All');
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">Cửa Hàng</h1>
        <p className="text-stone-500">Tìm kiếm phong cách của riêng bạn.</p>
      </div>

      {/* Filters Component */}
      <ProductFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      {/* Product Grid Component */}
      <ProductGrid 
        products={filteredProducts}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

export default Shop;