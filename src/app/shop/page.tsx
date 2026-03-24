import { serverProductApi, serverCategoryApi } from '@/services/server-api';
import ShopClient from '@/components/shop/ShopClient';

export default async function ShopPage() {
  let products = { total: 0, items: [] as any[] };
  let categories = [] as any[];

  try {
    [products, categories] = await Promise.all([
      serverProductApi.getAll({ limit: 100 }),
      serverCategoryApi.getAll(),
    ]);
  } catch (err) {
    console.error('Failed to load shop data:', err);
  }

  return (
    <ShopClient
      initialProducts={products.items}
      categories={categories}
    />
  );
}