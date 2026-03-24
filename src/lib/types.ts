
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
  colors: string[]; // Keep for compatibility or filtering
  variant1: string[]; // Colors/Materials
  variant2: string[]; // Sizes
  htmlDescription?: string;
  rating?: number;
  soldCount?: number;
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

export type Category = 'All' | 'Clothing' | 'Bags' | 'Accessories';

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
