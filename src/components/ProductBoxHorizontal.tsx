"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductBoxHorizontalProps {
  product: Product;
  /** Hiển thị nút thêm giỏ hàng, mặc định true */
  showAddToCart?: boolean;
  /** Hiển thị link "Xem chi tiết", mặc định false */
  showDetailLink?: boolean;
}

const ProductBoxHorizontal: React.FC<ProductBoxHorizontalProps> = ({
  product,
  showAddToCart = true,
  showDetailLink = false,
}) => {
  const { addToCart } = useCart();

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const productHref = `/${product.slug || product.id}`;

  return (
    <div className="group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-stone-50 transition-colors">
      {/* Thumbnail */}
      <Link
        href={productHref}
        className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-stone-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {discountPercentage > 0 && (
          <span className="absolute top-1 left-1 bg-red-50 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded">
            -{discountPercentage}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <Link href={productHref}>
          <h4 className="text-sm font-medium text-stone-800 group-hover:text-terracotta transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h4>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-stone-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-stone-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        {showDetailLink && (
          <Link
            href={productHref}
            className="inline-block mt-1.5 text-[10px] uppercase font-bold text-stone-400 hover:text-stone-800 transition-colors"
          >
            Xem chi tiết
          </Link>
        )}
      </div>

      {/* Add to cart */}
      {showAddToCart && (
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id, 1);
          }}
          className="self-center shrink-0 p-1.5 rounded-full bg-stone-100 text-stone-500 hover:bg-terracotta hover:text-white transition-all duration-300 active:scale-95"
          aria-label="Thêm vào giỏ hàng"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default ProductBoxHorizontal;
