import { serverProductApi, serverNewsApi, resolveImageUrl } from '@/services/server-api';
import { Product, NewsItem } from '@/lib/types';
import HomeClient from '@/components/home/HomeClient';

export interface HomeNewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  views: number;
}

function mapNewsForHome(news: NewsItem): HomeNewsItem {
  const image = news.images?.[0]?.path
    ? resolveImageUrl(news.images[0].path)
    : resolveImageUrl(undefined);
  return {
    id: news._id,
    title: news.title,
    slug: news.slug || news._id,
    excerpt: news.short_des || '',
    image,
    date: new Date(news.created_at).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    views: news.views,
  };
}

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  let latestNews: HomeNewsItem[] = [];

  try {
    featuredProducts = await serverProductApi.getHotDeals(8);
  } catch (err) {
    console.error('Failed to load hot deals:', err);
  }

  try {
    const newsData = await serverNewsApi.getAll({ limit: 3 });
    latestNews = (newsData.items || []).map(mapNewsForHome);
  } catch (err) {
    console.error('Failed to load news:', err);
  }

  return <HomeClient featuredProducts={featuredProducts} latestNews={latestNews} />;
}
