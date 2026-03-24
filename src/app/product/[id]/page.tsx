"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';
import { Product } from '@/lib/types';

// Import components
import ProductSlider from '@/components/product/ProductSlider';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDescription from '@/components/product/ProductDescription';
import RelatedProductsSidebar from '@/components/product/RelatedProductsSidebar';
import ProductReviews from '@/components/product/ProductReviews';

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  
  // Page chỉ load data
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;
    
    window.scrollTo(0, 0);
    const found = PRODUCTS.find((p) => p.id === id);
    
    if (!found) return;
    
    setProduct(found);

    // Load related products
    let related = PRODUCTS.filter((p) => p.category === found.category && p.id !== found.id);
    if (related.length < 10) {
      const others = PRODUCTS.filter((p) => p.category !== found.category && p.id !== found.id).slice(0, 10 - related.length);
      related = [...related, ...others];
    }
    setRelatedProducts(related.slice(0, 10));

    // Load recently viewed
    const RECENT_KEY = 'minhthu_recently_viewed';
    const stored = localStorage.getItem(RECENT_KEY);
    let viewedIds: string[] = stored ? JSON.parse(stored) : [];
    viewedIds = viewedIds.filter(itemId => itemId !== id);
    viewedIds.unshift(id);
    if (viewedIds.length > 11) viewedIds.pop();
    localStorage.setItem(RECENT_KEY, JSON.stringify(viewedIds));

    const recents = viewedIds
      .filter(itemId => itemId !== id) 
      .map(itemId => PRODUCTS.find(p => p.id === itemId))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 10);
    setRecentProducts(recents);
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50">Đang tải...</div>;
  }

  // Tính toán discount percentage (logic đơn giản, có thể để ở page)
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại cửa hàng
        </Link>

        {/* Product Main Section - Chỉ truyền data */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-fade-in-up">
          <div className="space-y-4">
            <ProductImage product={product} discountPercentage={discountPercentage} />
          </div>

          {/* ProductInfo tự xử lý logic variant selection và add to cart */}
          <ProductInfo
            product={product}
            averageRating="0"
            reviewCount={0}
          />
        </div>

        {/* Description & Sidebar Grid - Chỉ truyền data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-8">
            <ProductDescription product={product} />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <RelatedProductsSidebar products={relatedProducts} />
          </div>
        </div>

        {/* Reviews Section - Component tự load và xử lý data */}
        <ProductReviews productId={id} />

        {/* Recently Viewed - Chỉ truyền data */}
        <div className="mt-20">
          {recentProducts.length > 0 && (
            <ProductSlider title="Sản phẩm bạn đã xem" products={recentProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
