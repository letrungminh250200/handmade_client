"use client";
import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/constants';

const CATEGORIES = ['Tất cả', 'Kiến Thức', 'Câu Chuyện', 'Mẹo Vặt', 'Sự Kiện'];

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const featuredPost = BLOG_POSTS.find(p => p.isFeatured);
  const filteredPosts = BLOG_POSTS.filter(p => !p.isFeatured).filter(p => 
    activeCategory === 'Tất cả' ? true : p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-100 py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-32 h-32 bg-terracotta rounded-full blur-3xl"></div>
             <div className="absolute bottom-10 right-10 w-40 h-40 bg-stone-400 rounded-full blur-3xl"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4 relative z-10">Chuyện Nhà Mình</h1>
        <p className="text-stone-500 max-w-xl mx-auto relative z-10">
          Nơi lưu giữ những câu chuyện nhỏ về vải vóc, kim chỉ và niềm vui sống xanh mỗi ngày.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20 animate-fade-in-up">
            <Link href={`/news/${featuredPost.id}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-terracotta rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              <div className="md:pr-8">
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {featuredPost.author}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4 group-hover:text-terracotta transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <span className="inline-flex items-center text-terracotta font-medium group/btn">
                  Đọc tiếp <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-2" />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {CATEGORIES.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${activeCategory === cat ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-600 border-stone-200 hover:border-terracotta hover:text-terracotta'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-stone-500">Chưa có bài viết trong danh mục này.</p>
              <button 
                onClick={() => setActiveCategory('Tất cả')} 
                className="mt-4 text-terracotta hover:underline font-medium"
              >
                Xem tất cả bài viết
              </button>
            </div>
          ) : (
          filteredPosts.map((post, idx) => (
            <div key={post.id} className={`group flex flex-col h-full animate-fade-in-up`} style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden mb-6 relative">
                 <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-md text-stone-600 font-medium">
                        <Tag className="w-3 h-3" /> {post.category}
                    </span>
                    <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-terracotta transition-colors line-clamp-2">
                    <Link href={`/news/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                </p>
                <Link href={`/news/${post.id}`} className="inline-flex items-center text-sm font-medium text-stone-800 hover:text-terracotta transition-colors mt-auto">
                    Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))
          )}
        </div>

      </div>
    </div>
  );
};

export default News;