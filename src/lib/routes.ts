/**
 * Danh sách các route tĩnh (không phải product slug).
 * Dùng trong middleware và [slug] guard để tránh gọi API không cần thiết.
 */
export const STATIC_ROUTES = new Set([
  'danh-muc',
  'news',
  'about',
  'contact',
  'checkout',
  'search',
  'order-success',
  'order-tracking',
  'product',
  'api',
]);

/**
 * Các prefix không phải product slug (file tĩnh, internal Next.js, etc.)
 */
export const IGNORED_PREFIXES = [
  '_next',
  'favicon',
  'robots',
  'sitemap',
];

/**
 * Kiểm tra slug có phải product slug hợp lệ hay không
 */
export function isProductSlug(slug: string): boolean {
  if (!slug || slug.includes('.')) return false;
  if (STATIC_ROUTES.has(slug)) return false;
  if (IGNORED_PREFIXES.some(prefix => slug.startsWith(prefix))) return false;
  return true;
}
