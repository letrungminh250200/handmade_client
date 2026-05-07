// SEO Module — Barrel Export
export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_KEYWORDS, globalMetadata } from './seo.config';
export { createWebsiteJsonLd, createProductJsonLd, createArticleJsonLd, createBreadcrumbJsonLd, createOrganizationJsonLd } from './jsonld';
export { createProductMetadata, createNewsMetadata } from './metadata';
export { default as JsonLdScript } from './JsonLdScript';
