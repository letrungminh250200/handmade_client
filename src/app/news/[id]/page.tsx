"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '@/lib/constants';
import { BlogPost } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

const NewsDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    window.scrollTo(0, 0);
    const found = BLOG_POSTS.find((p) => p.id === id);
    if (found) {
      setPost(found);
    }
  }, [id]);

  if (!post) return <div className="min-h-screen flex items-center justify-center bg-stone-50">Đang tải...</div>;

  // Find related products
  const relatedProducts = post.relatedProducts 
    ? PRODUCTS.filter(p => post.relatedProducts?.includes(p.id))
    : [];

  // Find other posts for suggestions (excluding current)
  const otherPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-stone-900/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent z-15" />
        
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover animate-fade-in-up" 
        />
        
        {/* Adjusted bottom padding (pb-32) to keep title above the content box */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Link href="/news" className="text-white/80 hover:text-white flex items-center gap-2 mb-8 w-fit transition-all hover:-translate-x-1">
             <ArrowLeft className="w-5 h-5" /> Quay lại tin tức
          </Link>
          <div className="flex items-center gap-4 text-white/90 text-sm font-medium mb-5">
            <span className="bg-terracotta px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold shadow-lg">{post.category}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-terracotta" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-terracotta" /> {post.author}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.2] drop-shadow-2xl max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-stone-100 min-h-[500px]">
                {/* Intro / Excerpt */}
                <div className="mb-12 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-terracotta rounded-full"></div>
                    <p className="text-xl md:text-2xl font-serif italic text-stone-700 pl-8 leading-relaxed">
                        "{post.excerpt}"
                    </p>
                </div>

                {/* Body Paragraphs */}
                <div className="prose prose-stone prose-lg max-w-none text-stone-700 leading-9 space-y-8">
                    {post.content.map((paragraph, idx) => {
                        // Insert a decorative detail image randomly in the middle
                        if (idx === 1 && post.image) {
                            return (
                                <React.Fragment key={idx}>
                                    <p className="indent-8 text-justify">{paragraph}</p>
                                    <div className="my-12 rounded-3xl overflow-hidden shadow-2xl group">
                                        <img 
                                          src={post.image} 
                                          alt="Content visual" 
                                          className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105" 
                                        />
                                        <div className="bg-stone-50 py-4 px-6 text-center text-sm text-stone-500 italic border-t border-stone-100">
                                            Vẻ đẹp thô mộc từ những chất liệu tự nhiên tại Minh Thư Handmade
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        return <p key={idx} className="indent-8 text-justify">{paragraph}</p>
                    })}
                </div>

                {/* Share Buttons */}
                <div className="mt-16 pt-10 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <span className="font-serif font-bold text-stone-800 flex items-center gap-3 text-lg">
                        <Share2 className="w-6 h-6 text-terracotta" /> Chia sẻ câu chuyện:
                    </span>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-50 hover:bg-[#1877F2] hover:text-white transition-all duration-300 text-stone-600 shadow-sm"><Facebook className="w-5 h-5" /></button>
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-50 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 text-stone-600 shadow-sm"><Twitter className="w-5 h-5" /></button>
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-50 hover:bg-[#0A66C2] hover:text-white transition-all duration-300 text-stone-600 shadow-sm"><Linkedin className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Author Box */}
                <div className="mt-16 bg-stone-50 p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-8 border border-stone-100">
                    <div className="w-24 h-24 rounded-full bg-stone-200 overflow-hidden flex-shrink-0 shadow-inner border-4 border-white">
                         <div className="w-full h-full flex items-center justify-center bg-stone-400 text-white font-serif text-3xl">
                             {post.author.charAt(0)}
                         </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="font-serif font-bold text-stone-900 text-xl mb-2">{post.author}</h4>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            Người kể chuyện tại Minh Thư Handmade. Chúng mình tin rằng mỗi sản phẩm thủ công đều mang trong mình một linh hồn và một câu chuyện riêng biệt chờ được khám phá.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-10 pt-4 lg:pt-0">
                {/* Related Products - Removed 'sticky' classes */}
                {relatedProducts.length > 0 && (
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100">
                        <h3 className="font-serif font-bold text-stone-800 text-2xl mb-8 flex items-center gap-3 pb-4 border-b border-stone-50">
                            <Tag className="w-6 h-6 text-terracotta" /> Sản phẩm trong bài
                        </h3>
                        <div className="space-y-8">
                            {relatedProducts.map(product => (
                                <div key={product.id} className="group flex gap-5 items-center">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border border-stone-50 bg-stone-100">
                                        <img 
                                          src={product.image} 
                                          alt={product.name} 
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop';
                                          }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Link href={`/product/${product.id}`}>
                                            <h4 className="font-serif font-bold text-stone-800 group-hover:text-terracotta transition-colors line-clamp-2 leading-snug">
                                              {product.name}
                                            </h4>
                                        </Link>
                                        <p className="text-terracotta font-medium mt-2">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/shop" className="mt-10 block w-full text-center py-4 bg-stone-50 rounded-xl text-stone-600 font-medium hover:bg-stone-100 transition-colors border border-stone-200">
                            Xem tất cả sản phẩm
                        </Link>
                    </div>
                )}

                {/* More Stories */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                    <h3 className="font-serif font-bold text-stone-800 text-2xl mb-8">Có thể bạn quan tâm</h3>
                    <div className="space-y-8">
                         {otherPosts.map(op => (
                             <Link key={op.id} href={`/news/${op.id}`} className="block group">
                                 <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm">
                                     <img src={op.image} alt={op.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                 </div>
                                 <h4 className="font-serif font-bold text-stone-800 group-hover:text-terracotta transition-colors leading-snug">{op.title}</h4>
                                 <div className="flex items-center gap-3 mt-2">
                                     <span className="text-[10px] uppercase tracking-widest text-terracotta font-bold">{op.category}</span>
                                     <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                                     <span className="text-xs text-stone-500">{op.date}</span>
                                 </div>
                             </Link>
                         ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
