import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import { serverNewsApi, resolveImageUrl } from '@/services/server-api';
import { NewsItem } from '@/lib/types';
import Pagination from '@/components/ui/Pagination';

const ITEMS_PER_PAGE = 9;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getNewsImage(news: NewsItem): string {
  if (news.images && news.images.length > 0) {
    return resolveImageUrl(news.images[0].path);
  }
  return resolveImageUrl(undefined);
}

function getNewsLink(news: NewsItem): string {
  return `/news/${news.slug || news._id}`;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1') || 1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  let newsList: NewsItem[] = [];
  let total = 0;
  try {
    const data = await serverNewsApi.getAll({ limit: ITEMS_PER_PAGE, skip });
    newsList = data.items || [];
    total = data.total || 0;
  } catch {
    // fallback
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Only show featured post on page 1
  const featuredPost = currentPage === 1 ? newsList.find(n => n.hot) : undefined;
  const otherPosts = featuredPost ? newsList.filter(n => n !== featuredPost) : newsList;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-100 py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-terracotta rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-stone-400 rounded-full blur-3xl"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4 relative z-10">
          Chuyện Nhà Mình
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto relative z-10">
          Nơi lưu giữ những câu chuyện nhỏ về vải vóc, kim chỉ và niềm vui sống xanh mỗi ngày.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post — only on page 1 */}
        {featuredPost && (
          <div className="mb-20">
            <Link
              href={getNewsLink(featuredPost)}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={getNewsImage(featuredPost)}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {featuredPost.hot && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-terracotta rounded-full z-10">
                    Nổi bật
                  </span>
                )}
              </div>
              <div className="md:pr-8">
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(featuredPost.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {featuredPost.views} lượt xem
                  </span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4 group-hover:text-terracotta transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.short_des && (
                  <p className="text-stone-600 mb-6 leading-relaxed line-clamp-3">
                    {featuredPost.short_des}
                  </p>
                )}
                <span className="inline-flex items-center text-terracotta font-medium">
                  Đọc tiếp <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Empty state */}
        {newsList.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">Chưa có bài viết nào.</p>
          </div>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {otherPosts.map((post) => (
            <div key={post._id} className="group flex flex-col h-full">
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={getNewsImage(post)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {post.views}
                  </span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-terracotta transition-colors line-clamp-2">
                  <Link href={getNewsLink(post)}>{post.title}</Link>
                </h3>
                {post.short_des && (
                  <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {post.short_des}
                  </p>
                )}
                <Link
                  href={getNewsLink(post)}
                  className="inline-flex items-center text-sm font-medium text-stone-800 hover:text-terracotta transition-colors mt-auto"
                >
                  Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/news" />

        {/* Page info */}
        {total > 0 && (
          <p className="text-center text-sm text-stone-400 mt-6">
            Trang {currentPage} / {totalPages} — {total} bài viết
          </p>
        )}
      </div>
    </div>
  );
}