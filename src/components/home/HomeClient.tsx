"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, PenTool, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import type { HomeNewsItem } from '@/app/page';
import ProductCard from '@/components/ProductCard';
import { LOGO_SRC } from '@/lib/utils';

const SplitText = ({ text, className }: { text: string, className?: string }) => (
  <span className={`inline-block ${className}`}>
    {text.split('').map((char, i) => (
      <span key={i} className="inline-block opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

interface HomeClientProps {
  featuredProducts: Product[];
  latestNews: HomeNewsItem[];
}

const HomeClient: React.FC<HomeClientProps> = ({ featuredProducts, latestNews }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setOffsetY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.opacity-0-start').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#fafaf9]">
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 will-change-transform scale-110" style={{ transform: `translateY(${offsetY * 0.4}px) scale(${1.1 - offsetY * 0.0005})` }}>
          <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" alt="Hero background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-transparent to-transparent h-[120%]" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 mt-10">
          <div className="max-w-5xl space-y-8">
            <div className="flex justify-center mb-8 animate-fade-in-up">
               <Image src={LOGO_SRC} alt="Logo" width={144} height={144} className="h-28 w-28 md:h-36 md:w-36 object-contain drop-shadow-2xl animate-float" />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] drop-shadow-lg mix-blend-overlay opacity-90">
              <SplitText text="Chậm lại" /> <br/>
              <span className="italic font-light text-5xl md:text-7xl block mt-2 animate-fade-in-up" style={{ animationDelay: '800ms' }}>một nhịp</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-100 max-w-xl mx-auto font-light leading-relaxed tracking-wide animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              Để cảm nhận hơi thở của tự nhiên trên từng nếp vải. <br/>
              Chào mừng bạn đến với Minh Thư Handmade.
            </p>
            <div className="pt-10 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
              <Link href="/danh-muc" className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white overflow-hidden transition-all duration-300 hover:bg-white hover:text-stone-900">
                <span className="relative z-10 font-medium tracking-widest uppercase text-sm">Khám phá ngay</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-stone-900 py-4 overflow-hidden flex whitespace-nowrap border-y border-stone-800">
        <div className="animate-marquee inline-flex gap-8 items-center">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 text-stone-400 font-serif italic text-xl">
                    <span>Handmade with Love</span>
                    <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                    <span>100% Natural Materials</span>
                    <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                    <span>Sustainable Fashion</span>
                    <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                </div>
            ))}
        </div>
      </div>

      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="opacity-0-start space-y-8 text-center md:text-left">
            <span className="text-terracotta font-serif italic text-2xl">Chương 1</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-800 leading-[1.1]">
              Vẻ đẹp từ sự <br/> <span className="text-stone-300 decoration-terracotta underline decoration-2 underline-offset-8">không hoàn hảo</span>
            </h2>
            <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
               <p>Minh Thư tin rằng, cái đẹp thực sự không nằm ở sự bóng bẩy công nghiệp, mà nằm ở sự thô mộc đầy cảm xúc.</p>
               <p>Mỗi mét vải linen đũi, mỗi đường thêu tay đôi khi lệch một chút, nhưng đó là dấu ấn của con người.</p>
            </div>
          </div>
          <div className="relative opacity-0-start delay-200 perspective-1000">
            <div className="aspect-[3/4] rounded-full overflow-hidden border border-stone-200 relative z-10">
              <Image src="/product-banner.webp" alt="Craft" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-full mx-auto bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-20 opacity-0-start">
          <div>
            <span className="text-terracotta text-sm font-bold tracking-wider uppercase mb-3 block">Bộ Sưu Tập Mới</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">Góc Nhỏ Của Minh Thư</h2>
          </div>
          <Link href="/danh-muc" className="hidden md:flex group items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
            <span className="border-b border-stone-300 group-hover:border-stone-900 pb-1">Xem tất cả sản phẩm</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, idx) => (
              <div key={product.id} className={`opacity-0-start delay-${(idx % 4) * 100}`}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-stone-500">
              <p>Chưa có sản phẩm nào.</p>
            </div>
          )}
        </div>
      </section>

       <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center mb-16 opacity-0-start">
           <BookOpen className="h-10 w-10 text-terracotta mx-auto mb-6" />
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">Chuyện Nhà Mình</h2>
           <p className="mt-4 text-stone-600 text-lg font-light">Những góc nhỏ bình yên và kiến thức thú vị.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {latestNews.length > 0 ? latestNews.map((post, idx) => (
             <Link key={post.id} href={`/news/${post.slug}`} className={`group flex flex-col opacity-0-start delay-${idx * 150}`}>
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-sm aspect-[4/3]">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-xs text-stone-400 mb-3 tracking-widest uppercase">{post.date}</div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 group-hover:text-terracotta transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 line-clamp-2 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
             </Link>
           )) : (
             <div className="col-span-full text-center py-10 text-stone-500">
               <p>Chưa có bài viết nào.</p>
             </div>
           )}
        </div>
        <div className="text-center mt-20 opacity-0-start">
           <Link href="/news" className="inline-flex items-center gap-2 px-8 py-3 border-b-2 border-stone-800 text-stone-800 font-serif font-bold hover:text-terracotta hover:border-terracotta transition-all">
             Đọc thêm các bài viết khác
             <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </section>

      <section className="py-32 bg-[#292524] text-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PenTool className="h-10 w-10 text-terracotta mx-auto mb-6" />
            <h2 className="text-4xl font-serif font-bold text-white mb-16">Khách hàng nói gì</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: 'Minh Anh', text: 'Chiếc túi cói mình đặt đẹp hơn hình nhiều! Đường đan tỉ mỉ, phối đồ mùa hè cực xinh. Sẽ quay lại mua thêm.' },
                 { name: 'Chị Lan', text: 'Mua áo linen tặng mẹ, mẹ mình thích lắm vì vải mát và mềm. Đóng gói cẩn thận, kèm thiệp viết tay rất dễ thương.' },
                 { name: 'Thu Thảo', text: 'Lần đầu mua đồ handmade online mà ưng quá! Chất lượng thật sự khác biệt so với đồ công nghiệp. Cảm nhận được tâm huyết trong từng sản phẩm.' },
               ].map((item, i) => (
                 <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/10 italic font-light">
                    &ldquo;{item.text}&rdquo;
                    <div className="mt-6 not-italic font-bold text-terracotta font-serif">- {item.name}</div>
                 </div>
               ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomeClient;
