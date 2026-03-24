"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { productApi } from '@/services/api';
import { Product, BackendProductDetail } from '@/lib/types';

// Import components
import ProductSlider from '@/components/product/ProductSlider';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDescription from '@/components/product/ProductDescription';
import RelatedProductsSidebar from '@/components/product/RelatedProductsSidebar';
import ProductReviews from '@/components/product/ProductReviews';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function resolveImageUrl(path: string | undefined): string {
  if (!path) return 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1000&auto=format&fit=crop';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function mapDetailToProduct(detail: BackendProductDetail): Product {
  const images = (detail.images || []).map(resolveImageUrl);
  // Extract unique variant1 (e.g., colors) and variant2 (e.g., sizes) from variants
  const variant1Values: string[] = [];
  const variant2Values: string[] = [];

  if (detail.variants && detail.variants.length > 0) {
    detail.variants.forEach(v => {
      if (v.attributes && v.attributes.length > 0) {
        const val = v.attributes[0]?.value;
        if (val && !variant1Values.includes(val)) variant1Values.push(val);
      }
      if (v.attributes && v.attributes.length > 1) {
        const val = v.attributes[1]?.value;
        if (val && !variant2Values.includes(val)) variant2Values.push(val);
      }
    });
  }

  return {
    id: detail.id,
    name: detail.name?.split('-')[0] || detail.name || '',
    price: detail.price || 0,
    originalPrice: detail.originalPrice && detail.originalPrice > detail.price ? detail.originalPrice : undefined,
    category: '',
    image: images[0] || resolveImageUrl(undefined),
    images,
    description: detail.description || '',
    details: [],
    colors: variant1Values,
    variant1: variant1Values,
    variant2: variant2Values.length > 0 ? variant2Values : ['Mặc định'],
    slug: detail.slug,
    variantId: detail.id,
    variantCode: detail.variant_code,
    categoryIds: detail.category_ids,
    rating: undefined,
    soldCount: undefined,
  };
}

const ProductDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    productApi.getBySlug(slug)
      .then(async (detail) => {
        const mapped = mapDetailToProduct(detail);
        setProduct(mapped);

        // Load related products by category
        if (detail.category_ids && detail.category_ids.length > 0) {
          try {
            const related = await productApi.getByCategory({
              categoryIds: detail.category_ids.join(','),
              limit: 10,
            });
            setRelatedProducts(related.items.filter(p => p.id !== detail.id));
          } catch {
            setRelatedProducts([]);
          }
        }

        // Load recently viewed from localStorage
        const RECENT_KEY = 'minhthu_recently_viewed';
        const stored = localStorage.getItem(RECENT_KEY);
        let viewedSlugs: string[] = stored ? JSON.parse(stored) : [];
        viewedSlugs = viewedSlugs.filter(s => s !== slug);
        viewedSlugs.unshift(slug);
        if (viewedSlugs.length > 11) viewedSlugs.pop();
        localStorage.setItem(RECENT_KEY, JSON.stringify(viewedSlugs));
        // Note: recently viewed products would need individual API calls, 
        // skip for now to avoid N+1 queries
        setRecentProducts([]);
      })
      .catch(err => {
        console.error('Failed to load product:', err);
        setError('Không tìm thấy sản phẩm');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 pb-20 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-stone-200 rounded mb-8"></div>
            <div className="bg-white rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="aspect-square bg-stone-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-stone-200 rounded w-3/4"></div>
                <div className="h-6 bg-stone-200 rounded w-1/2"></div>
                <div className="h-4 bg-stone-200 rounded w-full"></div>
                <div className="h-4 bg-stone-200 rounded w-full"></div>
                <div className="h-12 bg-stone-200 rounded w-full mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <p className="text-lg text-stone-600 mb-4">{error || 'Không tìm thấy sản phẩm'}</p>
        <Link href="/shop" className="text-terracotta hover:underline">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại cửa hàng
        </Link>

        {/* Product Main Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-fade-in-up">
          <div className="space-y-4">
            <ProductImage product={product} discountPercentage={discountPercentage} />
          </div>

          <ProductInfo
            product={product}
            averageRating="0"
            reviewCount={0}
          />
        </div>

        {/* Description & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-8">
            <ProductDescription product={product} />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <RelatedProductsSidebar products={relatedProducts} />
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />

        {/* Recently Viewed */}
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
