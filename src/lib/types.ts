
export interface ReviewReply {
  id: string;
  userName: string;
  comment: string;
  date: string;
  role?: 'admin' | 'user';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userPhone?: string;
  rating: number;
  comment: string;
  date: string;
  replies?: ReviewReply[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  details: string[];
  colors: string[];
  variant1: string[];
  variant2: string[];
  htmlDescription?: string;
  rating?: number;
  soldCount?: number;
  slug?: string;
  variantId?: string;
  variantCode?: string;
  images?: string[];
  categoryIds?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant1?: string;
  selectedVariant2?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type Category = 'All' | string;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  category: string;
  image: string;
  isFeatured?: boolean;
  relatedProducts?: string[];
}

// Backend API response types
export interface ApiListResponse<T> {
  total: number;
  items: T[];
  limit?: number;
  skip?: number;
  category?: { name?: string; image?: string };
}

export interface BackendVariantItem {
  _id: string;
  id: string;
  name: string;
  slug: string;
  code: string;
  code_format?: string;
  images: string[];
  price: number;
  originalPrice: number;
  old_price?: number;
  new_price?: number;
  attributes?: Array<{
    name: string;
    key: string;
    id: string;
    value: string;
    color?: string;
  }>;
  product?: {
    _id: string;
    name: string;
    slug: string;
  };
  product_id?: string;
  category_ids?: string[];
  unit_id?: string;
  company_id?: string;
  is_main?: boolean;
}

export interface BackendProductDetail {
  id: string;
  name: string;
  slug: string;
  images: string[];
  originalPrice: number;
  price: number;
  description?: string;
  unit?: string;
  variant_code: string;
  code_format?: string;
  color?: string;
  color_name?: string;
  attributes?: Array<{
    name: string;
    key: string;
    id: string;
    value: string;
    color?: string;
  }>;
  variants: Array<{
    _id: string;
    code: string;
    code_format?: string;
    attributes: Array<{
      name: string;
      key: string;
      value: string;
      color?: string;
    }>;
    old_price: number;
    new_price: number;
    price: number;
    images: Array<{ file_id: string; path: string }>;
    is_main?: boolean;
  }>;
  category_ids?: string[];
}

// Order API response types
export interface OrderResponse {
  _id: string;
  code: string;
  status: string;
  total: number;
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
    name?: string;
    image?: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface CartVariant {
  _id: string;
  id: string;
  code: string;
  name: string;
  slug: string;
  price: number;
  old_price?: number;
  new_price?: number;
  images: string[];
  quantity?: number;
  stock?: number;
  is_available?: boolean;
  attributes?: Array<{
    name: string;
    key: string;
    value: string;
  }>;
  product?: {
    _id: string;
    name: string;
    slug: string;
  };
}

// News types
export interface NewsItem {
  _id: string;
  title: string;
  slug?: string;
  short_des?: string;
  content?: string;
  images: Array<{ file_id: string; path: string }>;
  hot: boolean;
  views: number;
  created_at: string;
}
