import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye, Share2 } from 'lucide-react';
import { serverNewsApi, resolveImageUrl, NewsItem } from '@/services/server-api';

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

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let post: NewsItem | null;
  try {
    post = await serverNewsApi.getBySlugOrId(id);
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

  const heroImage = getNewsImage(post);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent z-[15]" />
        <img src={heroImage} alt={post.title} className="w-full h-full object-cover" />

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
            {post.content && (
              <div
                className="prose prose-stone prose-lg max-w-none text-stone-700 leading-9"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* Share */}
            <div className="mt-16 pt-10 border-t border-stone-100 flex items-center gap-4">
              <Share2 className="w-5 h-5 text-terracotta" />
              <span className="font-serif font-bold text-stone-800">Chia sẻ câu chuyện</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* More Stories */}
            {otherPosts.length > 0 && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="font-serif font-bold text-stone-800 text-2xl mb-8">
                  Có thể bạn quan tâm
                </h3>
                <div className="space-y-8">
                  {otherPosts.map(op => (
                    <Link key={op._id} href={`/news/${op.slug || op._id}`} className="block group">
                      <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm">
                        <img
                          src={getNewsImage(op)}
                          alt={op.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
          </div>
        </div>
      </div>
    </div>
  );
}
