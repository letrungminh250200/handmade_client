/**
 * Server-side API Service — CHỈ dùng trong Server Components / API Routes
 * Không import file này từ client components ("use client")
 * Backend URL lấy từ API_URL (không phải NEXT_PUBLIC_)
 */

import { Product, CategoryItem, BackendVariantItem, BackendProductDetail, ApiListResponse, NewsItem } from '@/lib/types';

const API_URL = process.env.API_URL || 'http://localhost:5002';
const COMPANY_ID = process.env.COMPANY_ID || '';

// ==================== BASE CLIENT ====================

async function serverFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
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
  return (json.data !== undefined ? json.data : json) as T;
}

// ==================== HELPERS ====================

export function resolveImageUrl(path: string | undefined): string {
  if (!path) return 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1000&auto=format&fit=crop';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function mapVariantToProduct(item: BackendVariantItem): Product {
  const images = (item.images || []).map(resolveImageUrl);
  return {
    id: item._id || item.id,
    name: item.product?.name || item.name || '',
    price: item.price || item.new_price || 0,
    originalPrice: item.originalPrice || item.old_price || undefined,
    category: '',
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

// ==================== SERVER-SIDE API ====================

export const serverProductApi = {
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
    const data = await serverFetch<ApiListResponse<BackendVariantItem>>(
      `/client/products${qs ? `?${qs}` : ''}`,
      { next: { revalidate: 60 } }
    );

    return {
      total: data.total || 0,
      items: (data.items || []).map(mapVariantToProduct),
    };
  },

  async getHotDeals(limit = 12): Promise<Product[]> {
    const data = await serverFetch<BackendVariantItem[]>(
      `/client/products/hot-deal?limit=${limit}`,
      { next: { revalidate: 60 } }
    );
    return (Array.isArray(data) ? data : []).map(mapVariantToProduct);
  },

  async getBySlug(slug: string): Promise<BackendProductDetail> {
    return serverFetch<BackendProductDetail>(
      `/client/products/slug/${slug}`,
      { next: { revalidate: 60 } }
    );
  },

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
    const data = await serverFetch<ApiListResponse<BackendVariantItem>>(
      `/client/products-by-category${qs ? `?${qs}` : ''}`,
      { next: { revalidate: 60 } }
    );

    return {
      total: data.total || 0,
      items: (data.items || []).map(mapVariantToProduct),
      category: data.category,
    };
  },
};

export const serverCategoryApi = {
  async getAll(): Promise<CategoryItem[]> {
    return serverFetch<CategoryItem[]>(
      '/client/categories',
      { next: { revalidate: 300 } }
    );
  },
};

export const serverOrderApi = {
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
  }): Promise<unknown> {
    return serverFetch<unknown>('/client/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getCartVariants(cart: Array<{ id: string; quantity: number }>): Promise<unknown[]> {
    return serverFetch<unknown[]>('/client/orders/cart', {
      method: 'POST',
      body: JSON.stringify({ cart }),
    });
  },

  async getByCode(code: string): Promise<unknown> {
    return serverFetch<unknown>(`/client/orders/${code}`);
  },
};

export const serverAddressApi = {
  async getProvinces(): Promise<Array<{ id: string; code: string; name: string }>> {
    return serverFetch('/client/provinces', { next: { revalidate: 3600 } });
  },

  async getWards(provinceCode: string): Promise<Array<{ id: string; code: string; name: string }>> {
    return serverFetch(`/client/ward/${provinceCode}`, { next: { revalidate: 3600 } });
  },
};

// ==================== NEWS API ====================

export const serverNewsApi = {
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
    return serverFetch(`/client/news${qs ? `?${qs}` : ''}`, { next: { revalidate: 60 } });
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
    return serverFetch(`/client/news/${slugOrId}${qs ? `?${qs}` : ''}`, { next: { revalidate: 60 } });
  },
};
