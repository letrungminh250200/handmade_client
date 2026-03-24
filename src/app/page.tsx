import { serverProductApi } from '@/services/server-api';
import { Product } from '@/lib/types';
import HomeClient from '@/components/home/HomeClient';

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await serverProductApi.getHotDeals(8);
  } catch (err) {
    console.error('Failed to load hot deals:', err);
  }

  return <HomeClient featuredProducts={featuredProducts} />;
}
