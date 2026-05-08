import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Eye, Share2 } from 'lucide-react';
import { serverNewsApi, serverProductApi, resolveImageUrl } from '@/services/server-api';
import { NewsItem, Product } from '@/lib/types';
import type { Metadata } from 'next';
import { SITE_URL, createArticleJsonLd, createBreadcrumbJsonLd, createNewsMetadata, JsonLdScript } from '@/lib/seo';
import ExpandableArticle from '@/components/news/ExpandableArticle';
import SidebarProducts from '@/components/news/SidebarProducts';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getNewsImage(news: NewsItem): string {
  if (news.images && news.images.length > 0) {
    return resolveImageUrl(news.images[0].path);
  }
  return resolveImageUrl(undefined);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await serverNewsApi.getBySlugOrId(slug);
    if (!post) throw new Error('Not found');
    return createNewsMetadata({
      title: post.title,
      shortDescription: post.short_des,
      slug: post.slug,
      _id: post._id,
      imageUrl: getNewsImage(post),
    });
  } catch {
    return { title: 'Tin Tức' };
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: NewsItem | null;
  try {
    post = await serverNewsApi.getBySlugOrId(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  // Fetch other posts for sidebar
  let otherPosts: NewsItem[] = [];
  try {
    const data = await serverNewsApi.getAll({ limit: 4 });
    otherPosts = (data.items || []).filter(n => n._id !== post!._id).slice(0, 3);
  } catch { /* ignore */ }

  // Fetch featured products for sidebar
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await serverProductApi.getHotDeals(8);
  } catch { /* ignore */ }

  const heroImage = getNewsImage(post);
  const postSlug = post.slug || post._id;

  const articleJsonLd = createArticleJsonLd({
    headline: post.title,
    image: heroImage,
    datePublished: post.created_at,
    dateModified: post.updated_at,
  });
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Tin tức', url: `${SITE_URL}/news` },
    { name: post.title, url: `${SITE_URL}/news/${postSlug}` },
  ]);

  return (
    <>
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <div className="min-h-screen bg-stone-50 pb-20">
        {/* Hero Header */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-stone-900/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent z-[15]" />
          <Image src={heroImage} alt={post.title} fill className="object-cover" priority />

          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Link href="/news" className="text-white/80 hover:text-white flex items-center gap-2 mb-8 w-fit transition-all hover:-translate-x-1">
              <ArrowLeft className="w-5 h-5" /> Quay lại tin tức
            </Link>
            <div className="flex items-center gap-4 text-white/90 text-sm font-medium mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-terracotta" /> {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-terracotta" /> {post.views} lượt xem
              </span>
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
              {/* Excerpt */}
              {post.short_des && (
                <div className="mb-12 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-terracotta rounded-full"></div>
                  <p className="text-xl md:text-2xl font-serif italic text-stone-700 pl-8 leading-relaxed">
                    &ldquo;{post.short_des}&rdquo;
                  </p>
                </div>
              )}

              {/* Body Content (HTML from CMS) */}
              {post.content && <ExpandableArticle html={post.content} />}

              {/* Share */}
              <div className="mt-16 pt-10 border-t border-stone-100 flex items-center gap-4">
                <Share2 className="w-5 h-5 text-terracotta" />
                <span className="font-serif font-bold text-stone-800">Chia sẻ câu chuyện</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/news/${postSlug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chia sẻ lên Facebook"
                  className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white text-sm font-medium hover:bg-[#0e63d4] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82V14.706h-3.13v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div data-news-sidebar className="lg:col-span-4 space-y-8">
              {/* More Stories */}
              {otherPosts.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                  <h3 className="font-serif font-bold text-stone-800 text-2xl mb-8">
                    Có thể bạn quan tâm
                  </h3>
                  <div className="space-y-8">
                    {otherPosts.map(op => (
                      <Link key={op._id} href={`/news/${op.slug || op._id}`} className="block group">
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm">
                          <Image
                            src={getNewsImage(op)}
                            alt={op.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <h4 className="font-serif font-bold text-stone-800 group-hover:text-terracotta transition-colors leading-snug line-clamp-2">
                          {op.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-stone-500">{formatDate(op.created_at)}</span>
                          <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                          <span className="text-xs text-stone-500">{op.views} views</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Products */}
              <div className="sticky top-4">
                <SidebarProducts products={featuredProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
