import type { Metadata } from 'next';
import { SITE_NAME } from './seo.config';

// ===== Types =====
interface ProductMetaParams {
  name: string;
  description?: string;
  slug?: string;
  id?: string;
  images?: string[];
}

interface NewsMetaParams {
  title: string;
  shortDescription?: string;
  slug?: string;
  _id?: string;
  imageUrl?: string;
}

// ===== Metadata Helpers =====

/** Tạo Metadata cho trang chi tiết sản phẩm */
export function createProductMetadata(product: ProductMetaParams): Metadata {
  const identifier = product.slug || product.id;
  return {
    title: product.name,
    description:
      product.description || `Sản phẩm handmade ${product.name} tại ${SITE_NAME}.`,
    alternates: {
      canonical: `/${identifier}`,
    },
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description:
        product.description ||
        `Mua sản phẩm ${product.name} chất lượng cao tại ${SITE_NAME}.`,
      images:
        product.images && product.images.length > 0
          ? [{ url: product.images[0], width: 800, height: 800 }]
          : [],
    },
  };
}

/** Tạo Metadata cho trang chi tiết tin tức */
export function createNewsMetadata(news: NewsMetaParams): Metadata {
  const identifier = news.slug || news._id;
  return {
    title: news.title,
    description:
      news.shortDescription || `Bài viết: ${news.title} tại ${SITE_NAME}.`,
    alternates: {
      canonical: `/news/${identifier}`,
    },
    openGraph: {
      title: `${news.title} | ${SITE_NAME}`,
      description:
        news.shortDescription ||
        `Tìm hiểu thêm về ${news.title} tại Blog ${SITE_NAME}.`,
      images: news.imageUrl
        ? [{ url: news.imageUrl, width: 800, height: 600 }]
        : [],
    },
  };
}
