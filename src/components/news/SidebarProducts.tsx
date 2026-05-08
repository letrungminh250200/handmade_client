"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import ProductBoxHorizontal from "@/components/ProductBoxHorizontal";

interface SidebarProductsProps {
  products: Product[];
}

const SidebarProducts: React.FC<SidebarProductsProps> = ({ products }) => {
  if (!products.length) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
      <h3 className="font-serif font-bold text-stone-800 text-xl mb-6">
        Sản phẩm nổi bật
      </h3>
      <div className="space-y-1">
        {products.map((product) => (
          <ProductBoxHorizontal key={product.id} product={product} />
        ))}
      </div>

      {/* View all link */}
      <Link
        href="/danh-muc"
        className="mt-6 block text-center text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors py-2 border-t border-stone-100"
      >
        Xem tất cả sản phẩm →
      </Link>
    </div>
  );
};

export default SidebarProducts;
