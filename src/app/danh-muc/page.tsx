import { serverProductApi, serverCategoryApi } from '@/services/server-api';
import ShopClient from '@/components/shop/ShopClient';
import { Product, CategoryItem } from '@/lib/types';

const ITEMS_PER_PAGE = 12;

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1') || 1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  let products = { total: 0, items: [] as Product[] };
  let categories = [] as CategoryItem[];

  try {
    [products, categories] = await Promise.all([
      serverProductApi.getAll({ limit: ITEMS_PER_PAGE, skip }),
      serverCategoryApi.getAll(),
    ]);
  } catch (err) {
    console.error('Failed to load shop data:', err);
  }

  const totalPages = Math.ceil((products.total || 0) / ITEMS_PER_PAGE);

  return (
    <ShopClient
      initialProducts={products.items}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
