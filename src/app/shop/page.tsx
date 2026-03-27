import { serverProductApi, serverCategoryApi } from '@/services/server-api';
import ShopClient from '@/components/shop/ShopClient';
import { Product, CategoryItem } from '@/lib/types';

export default async function ShopPage() {
  let products = { total: 0, items: [] as Product[] };
  let categories = [] as CategoryItem[];

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