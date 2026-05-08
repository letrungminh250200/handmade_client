"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import ProductBoxHorizontal from "@/components/ProductBoxHorizontal";

interface RelatedProductsSidebarProps {
  products: Product[];
}

const RelatedProductsSidebar: React.FC<RelatedProductsSidebarProps> = ({
  products,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100">
      <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2 pb-4 border-b border-stone-100">
        Sản phẩm tương tự
      </h3>
      <div className="space-y-1 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
        {products.length === 0 ? (
          <p className="text-stone-500 italic text-sm">
            Chưa có sản phẩm liên quan.
          </p>
        ) : (
          products.map((rp) => (
            <ProductBoxHorizontal
              key={rp.id}
              product={rp}
              showDetailLink
              showAddToCart={false}
            />
          ))
        )}
      </div>
      <Link
        href="/danh-muc"
        className="block w-full text-center py-3 bg-stone-50 rounded-xl text-stone-600 font-bold text-xs mt-8 hover:bg-stone-100 transition-colors"
      >
        Xem tất cả cửa hàng
      </Link>
    </div>
  );
};

export default RelatedProductsSidebar;
