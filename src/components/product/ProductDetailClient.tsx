"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RefreshCw, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import SafeHTML from '@/components/ui/SafeHTML';
import ProductCard from '@/components/ProductCard';

/* ─────────────────── Image Gallery ─────────────────── */
function ImageGallery({ images, name, discount }: { images: string[]; name: string; discount: number }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 group">
        <img
          src={images[activeIdx] || images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full text-stone-400 hover:text-red-500 transition-colors shadow-sm">
          <Heart className="w-5 h-5" />
        </button>
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{discount}%
          </div>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx(i => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 text-stone-700" />
            </button>
            <button
              onClick={() => setActiveIdx(i => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="w-4 h-4 text-stone-700" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                idx === activeIdx
                  ? 'border-stone-800 shadow-md scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────── Product Info Panel ─────────────────── */
function InfoPanel({
  product,
  variantGroups,
}: {
  product: Product;
  variantGroups: { key: string; values: string[] }[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  const formatPrice = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (const g of variantGroups) {
      if (!selections[g.key]) {
        setError(`Vui lòng chọn ${g.key}`);
        return;
      }
    }
    addToCart({
      product,
      quantity,
      variant1: selections[variantGroups[0]?.key] || '',
      variant2: selections[variantGroups[1]?.key] || '',
    });
    setError('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 text-sm text-stone-400 mb-3">
        <Link href="/shop" className="hover:text-terracotta transition-colors">Cửa hàng</Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </div>

      <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mb-4 leading-tight">
        {product.name}
      </h1>

      <div className="flex items-end gap-3 mb-5">
        <span className="text-3xl font-bold text-stone-900">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-stone-400 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          </>
        )}
      </div>

      <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3">
        {product.description}
      </p>

      <div className="h-px bg-stone-100 mb-6" />

      <div className="space-y-5 mb-6">
        {variantGroups.map(group => (
          <div key={group.key}>
            <h4 className="text-sm font-semibold text-stone-700 mb-3">
              {group.key}: <span className="font-normal text-stone-400">{selections[group.key] || 'Chưa chọn'}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.values.map(val => (
                <button
                  key={val}
                  onClick={() => {
                    setSelections(prev => ({ ...prev, [group.key]: val }));
                    setError('');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    selections[group.key] === val
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-stone-100 transition-colors">
            <Minus className="w-4 h-4 text-stone-600" />
          </button>
          <span className="px-5 text-stone-900 font-bold min-w-[2.5rem] text-center text-sm">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-stone-100 transition-colors">
            <Plus className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-stone-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-stone-800 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <ShoppingBag className="w-4 h-4" /> Thêm vào giỏ
        </button>
      </div>
      {error && <p className="text-red-500 text-xs font-medium mb-4">{error}</p>}

      <div className="mt-auto pt-6">
        <div className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl">
          {[
            { icon: Truck, label: 'Giao nhanh 2-3 ngày' },
            { icon: ShieldCheck, label: 'Cam kết chính hãng' },
            { icon: RefreshCw, label: 'Đổi trả 3 ngày' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-5 h-5 mx-auto mb-1.5 text-stone-400" />
              <span className="text-[11px] text-stone-500 leading-tight block">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Main Client Component ─────────────────── */
interface ProductDetailClientProps {
  product: Product;
  variantGroups: { key: string; values: string[] }[];
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, variantGroups, relatedProducts }: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const scrollRef = useRef<HTMLDivElement>(null);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const scrollRelated = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const to = dir === 'left' ? scrollLeft - (clientWidth * 0.8) : scrollLeft + (clientWidth * 0.8);
    scrollRef.current.scrollTo({ left: to, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại cửa hàng</span>
        </Link>

        {/* Product Hero */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-12 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 lg:p-8 bg-stone-50/50">
              <ImageGallery
                images={product.images || [product.image]}
                name={product.name}
                discount={discount}
              />
            </div>
            <div className="p-6 lg:p-10">
              <InfoPanel product={product} variantGroups={variantGroups} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-12">
          <div className="flex border-b border-stone-100">
            {(['description', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all relative ${
                  activeTab === tab ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {tab === 'description' ? 'Mô tả sản phẩm' : 'Đánh giá khách hàng'}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-stone-900 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-10">
            {activeTab === 'description' && (
              <div className="animate-fade-in-up">
                {product.htmlDescription ? (
                  <div className="details_description prose prose-stone max-w-none">
                    <style>{`
                      .details_description img { max-width: 100% !important; height: auto !important; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                      .details_description p { margin-bottom: 1.5rem; line-height: 1.8; color: #44403c; font-size: 1.05rem; }
                      .details_description figure { margin: 2rem 0; }
                    `}</style>
                    <SafeHTML html={product.htmlDescription} />
                  </div>
                ) : (
                  <div className="text-stone-600 leading-relaxed text-lg">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-16 animate-fade-in-up">
                <Star className="w-12 h-12 mx-auto text-stone-200 mb-4" />
                <p className="text-stone-500 font-medium">Chưa có đánh giá nào</p>
                <p className="text-stone-400 text-sm mt-1">Hãy là người đầu tiên nhận xét sản phẩm này!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">Sản phẩm tương tự</h2>
                <p className="text-stone-400 text-sm mt-1">Có thể bạn sẽ thích</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => scrollRelated('left')} className="p-2.5 rounded-full border border-stone-200 bg-white shadow-sm hover:bg-stone-50 transition-all text-stone-500 active:scale-90">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scrollRelated('right')} className="p-2.5 rounded-full border border-stone-200 bg-white shadow-sm hover:bg-stone-50 transition-all text-stone-500 active:scale-90">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: 'none' }}
            >
              {relatedProducts.map(p => (
                <div key={p.id} className="flex-none w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22%] snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
