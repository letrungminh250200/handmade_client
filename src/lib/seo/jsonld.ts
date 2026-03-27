import { SITE_URL, SITE_NAME } from './seo.config';

// ===== Types =====
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProductJsonLdParams {
  name: string;
  description?: string;
  images?: string[];
  price: number;
  sku: string;
  slug: string;
}

interface ArticleJsonLdParams {
  headline: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}

// ===== Factory Functions =====

/** JSON-LD Schema WebSite + SearchAction (dùng trong layout) */
export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/** JSON-LD Schema Product (dùng trong trang chi tiết sản phẩm) */
export function createProductJsonLd(product: ProductJsonLdParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/${product.slug}`,
    },
  };
}

/** JSON-LD Schema NewsArticle (dùng trong trang chi tiết tin tức) */
export function createArticleJsonLd(article: ArticleJsonLdParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    image: [article.image],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: [
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
  };
}

/** JSON-LD Schema BreadcrumbList (dùng chung cho mọi trang) */
export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
