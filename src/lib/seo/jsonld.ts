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

interface OrganizationJsonLdParams {
  description?: string;
  logo?: string;
  foundingDate?: string;
  founderName?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressCountry?: string;
  };
}

/** JSON-LD Schema Organization (dùng cho trang About / homepage) */
export function createOrganizationJsonLd(params: OrganizationJsonLdParams = {}) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  };
  if (params.logo) json.logo = params.logo;
  if (params.description) json.description = params.description;
  if (params.foundingDate) json.foundingDate = params.foundingDate;
  if (params.founderName) {
    json.founder = { '@type': 'Person', name: params.founderName };
  }
  if (params.sameAs && params.sameAs.length) json.sameAs = params.sameAs;
  if (params.contactPoint) {
    json.contactPoint = {
      '@type': 'ContactPoint',
      contactType: params.contactPoint.contactType || 'customer service',
      ...(params.contactPoint.telephone && { telephone: params.contactPoint.telephone }),
      ...(params.contactPoint.email && { email: params.contactPoint.email }),
    };
  }
  if (params.address) {
    json.address = {
      '@type': 'PostalAddress',
      ...(params.address.streetAddress && { streetAddress: params.address.streetAddress }),
      ...(params.address.addressLocality && { addressLocality: params.address.addressLocality }),
      ...(params.address.addressCountry && { addressCountry: params.address.addressCountry }),
    };
  }
  return json;
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
