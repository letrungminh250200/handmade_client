/**
 * API Service Layer — kết nối Frontend với ecom_backend
 * Base URL: NEXT_PUBLIC_API_URL (default: http://localhost:3000)
 * Public APIs tại /client/ — không cần auth
 */

import { Product, CategoryItem, BackendVariantItem, BackendProductDetail, ApiListResponse, OrderResponse, CartVariant, NewsItem } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID || '';

// ==================== BASE CLIENT ====================

async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(COMPANY_ID ? { 'x-company-id': COMPANY_ID } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  // Backend wraps response in { data: ... } via ResponseFormatInterceptor
  return (json.data !== undefined ? json.data : json) as T;
}

// ==================== HELPERS ====================

/**
 * Chuyển đổi image path từ backend sang full URL
 * Backend trả path dạng "/files/09/2025/image.png" hoặc full URL
 */
export function resolveImageUrl(path: string | undefined): string {
  if (!path) return '/logo.png';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Map Backend variant item → Frontend Product type
 * Giữ tương thích với UI components hiện tại
 */
function mapVariantToProduct(item: BackendVariantItem): Product {
  const images = (item.images || []).map(resolveImageUrl);
  return {
    id: item._id || item.id,
    name: item.product?.name || item.name || '',
    price: item.price || item.new_price || 0,
    originalPrice: item.originalPrice || item.old_price || undefined,
    category: '', // sẽ được set từ danh mục nếu có
    image: images[0] || resolveImageUrl(undefined),
    images,
    description: '',
    details: [],
    colors: [],
    variant1: (item.attributes || []).map(a => a.value),
    variant2: [],
    slug: item.slug || '',
    variantId: item._id || item.id,
    variantCode: item.code,
    categoryIds: item.category_ids,
    rating: undefined,
    soldCount: undefined,
  };
}

// ==================== PRODUCT API ====================

export const productApi = {
  /**
   * Lấy danh sách sản phẩm
   * GET /client/products?q=&category_slug=&limit=&skip=&sort=
   */
  async getAll(params?: {
    q?: string;
    categorySlug?: string;
    limit?: number;
    skip?: number;
    sort?: 'price_asc' | 'price_desc' | 'newest';
  }): Promise<{ total: number; items: Product[] }> {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.set('q', params.q);
    if (params?.categorySlug) searchParams.set('category_slug', params.categorySlug);
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.skip) searchParams.set('skip', String(params.skip));
    if (params?.sort) searchParams.set('sort', params.sort);

    const qs = searchParams.toString();
    const data = await apiClient<ApiListResponse<BackendVariantItem>>(
      `/client/products${qs ? `?${qs}` : ''}`
    );

    return {
      total: data.total || 0,
      items: (data.items || []).map(mapVariantToProduct),
    };
  },

  /**
   * Sản phẩm hot deal
   * GET /client/products/hot-deal?limit=
   */
  async getHotDeals(limit = 12): Promise<Product[]> {
    const data = await apiClient<BackendVariantItem[]>(
      `/client/products/hot-deal?limit=${limit}`
    );
    return (Array.isArray(data) ? data : []).map(mapVariantToProduct);
  },

  /**
   * Sản phẩm theo danh mục
   * GET /client/products-by-category?cate_slug=&limit=&skip=&sort=&min=&max=&product_id=
   */
  async getByCategory(params: {
    cateSlug?: string;
    categoryIds?: string;
    limit?: number;
    skip?: number;
    sort?: 'price_asc' | 'price_desc' | 'newest';
    min?: number;
    max?: number;
    excludeProductId?: string;
  }): Promise<{ total: number; items: Product[]; category?: { name?: string; image?: string } }> {
    const searchParams = new URLSearchParams();
    if (params.cateSlug) searchParams.set('cate_slug', params.cateSlug);
    if (params.categoryIds) searchParams.set('category_ids', params.categoryIds);
    if (params.limit) searchParams.set('limit', String(params.limit));
    if (params.skip) searchParams.set('skip', String(params.skip));
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.min) searchParams.set('min', String(params.min));
    if (params.max) searchParams.set('max', String(params.max));
    if (params.excludeProductId) searchParams.set('product_id', params.excludeProductId);

    const qs = searchParams.toString();
    const data = await apiClient<ApiListResponse<BackendVariantItem>>(
      `/client/products-by-category${qs ? `?${qs}` : ''}`
    );

    return {
      total: data.total || 0,
      items: (data.items || []).map(mapVariantToProduct),
      category: data.category,
    };
  },

  /**
   * Chi tiết sản phẩm theo slug
   * GET /client/products/slug/:slug
   */
  async getBySlug(slug: string): Promise<BackendProductDetail> {
    return apiClient<BackendProductDetail>(`/client/products/slug/${slug}`);
  },
};

// ==================== CATEGORY API ====================

export const categoryApi = {
  /**
   * Lấy danh sách danh mục
   * GET /client/categories
   */
  async getAll(): Promise<CategoryItem[]> {
    return apiClient<CategoryItem[]>('/client/categories');
  },
};

// ==================== ORDER API ====================

export const orderApi = {
  /**
   * Tạo đơn hàng
   * POST /client/orders
   */
  async create(data: {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    address?: string;
    city?: string;
    district?: string;
    note?: string;
    payment_method?: string;
    items: Array<{
      variant_id: string;
      quantity: number;
      price: number;
    }>;
  }): Promise<OrderResponse> {
    return apiClient<OrderResponse>('/client/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Validate giỏ hàng — lấy thông tin variant mới nhất
   * POST /client/orders/cart
   */
  async getCartVariants(cart: Array<{ id: string; quantity: number }>): Promise<CartVariant[]> {
    return apiClient<CartVariant[]>('/client/orders/cart', {
      method: 'POST',
      body: JSON.stringify({ cart }),
    });
  },

  /**
   * Tra cứu đơn hàng theo mã
   * GET /client/orders/:code
   */
  async getByCode(code: string): Promise<OrderResponse> {
    return apiClient<OrderResponse>(`/client/orders/${code}`);
  },
};

// ==================== ADDRESS API ====================

export const addressApi = {
  /**
   * Lấy danh sách tỉnh/thành
   * GET /client/provinces
   */
  async getProvinces(): Promise<Array<{ id: string; code: string; name: string }>> {
    return apiClient('/client/provinces');
  },

  /**
   * Lấy quận/huyện theo mã tỉnh
   * GET /client/ward/:code
   */
  async getWards(provinceCode: string): Promise<Array<{ id: string; code: string; name: string }>> {
    return apiClient(`/client/ward/${provinceCode}`);
  },
};

// ==================== NEWS API ====================

export const newsApi = {
  /**
   * Lấy danh sách tin tức
   * GET /client/news?limit=&skip=&hot=&selects=
   */
  async getAll(params?: {
    limit?: number;
    skip?: number;
    hot?: boolean;
    selects?: string;
  }): Promise<{ total: number; items: NewsItem[]; current: number; limit: number }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.skip) searchParams.set('skip', String(params.skip));
    if (params?.hot) searchParams.set('hot', 'true');
    if (params?.selects) searchParams.set('selects', params.selects);
    const qs = searchParams.toString();
    return apiClient(`/client/news${qs ? `?${qs}` : ''}`);
  },

  /**
   * Lấy chi tiết tin tức theo slug hoặc id
   * GET /client/news/:slugOrId?selects=
   */
  async getBySlugOrId(slugOrId: string, params?: {
    selects?: string;
  }): Promise<NewsItem | null> {
    const searchParams = new URLSearchParams();
    if (params?.selects) searchParams.set('selects', params.selects);
    const qs = searchParams.toString();
    return apiClient(`/client/news/${slugOrId}${qs ? `?${qs}` : ''}`);
  },
};
