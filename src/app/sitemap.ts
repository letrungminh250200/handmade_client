import { MetadataRoute } from 'next';
import { serverProductApi, serverCategoryApi } from '@/services/server-api';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 604800; // Tự động tạo lại sitemap sau 1 tuần (604800 giây)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Các route tĩnh cơ bản của website
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/danh-muc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/su-menh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  try {
    // 2. Lấy dữ liệu động từ API (tối đa limit 100-500 để tránh timeout/quá tải)
    const [productsRes, categories] = await Promise.all([
      serverProductApi.getAll({ limit: 500 }),
      serverCategoryApi.getAll(),
    ]);

    // 3. Map danh sách Sản Phẩm
    const productRoutes: MetadataRoute.Sitemap = (productsRes.items || []).map((product) => ({
      url: `${SITE_URL}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // 4. Map danh sách Danh Mục
    const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
      url: `${SITE_URL}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Gộp tất cả route thành sitemap hoàn chỉnh
    return [...routes, ...categoryRoutes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Trả về routes tĩnh nếu gọi API lỗi để đảm bảo không sập sitemap
    return routes;
  }
}
