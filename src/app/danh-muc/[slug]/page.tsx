import { serverProductApi, serverCategoryApi } from '@/services/server-api';
import ShopClient from '@/components/shop/ShopClient';
import { Product, CategoryItem } from '@/lib/types';

const ITEMS_PER_PAGE = 12;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1') || 1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  let products = { total: 0, items: [] as Product[] };
  let categories = [] as CategoryItem[];

  try {
    [products, categories] = await Promise.all([
      serverProductApi.getAll({ limit: ITEMS_PER_PAGE, skip, categorySlug: slug }),
      serverCategoryApi.getAll(),
    ]);
  } catch (err) {
    console.error('Failed to load category data:', err);
  }

  const totalPages = Math.ceil((products.total || 0) / ITEMS_PER_PAGE);

  return (
    <ShopClient
      initialProducts={products.items}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      activeCategory={slug}
    />
  );
}
