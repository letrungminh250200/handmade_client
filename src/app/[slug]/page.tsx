import { notFound } from 'next/navigation';
import { serverProductApi, resolveImageUrl } from '@/services/server-api';
import { Product, BackendProductDetail } from '@/lib/types';
import ProductDetailClient from '@/components/product/ProductDetailClient';

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseVariantGroups(detail: BackendProductDetail) {
  const groups: Record<string, { key: string; values: string[] }> = {};
  if (detail.variants && detail.variants.length > 0) {
    detail.variants.forEach(v => {
      (v.attributes || []).forEach(attr => {
        if (!attr.key || !attr.name) return;
        if (!groups[attr.key]) {
          groups[attr.key] = { key: attr.key, values: [] };
        }
        if (!groups[attr.key].values.includes(attr.name)) {
          groups[attr.key].values.push(attr.name);
        }
      });
    });
  }
  return Object.values(groups);
}

function mapDetailToProduct(detail: BackendProductDetail): Product {
  const images = (detail.images || []).map(resolveImageUrl);
  const variantGroups = parseVariantGroups(detail);

  const variant1Values = variantGroups[0]?.values || [];
  const variant2Values = variantGroups[1]?.values || [];

  const rawDesc = detail.description || '';
  const isHtml = /<[a-z][\s\S]*>/i.test(rawDesc);

  return {
    id: detail.id,
    name: detail.name?.split('-')[0]?.trim() || detail.name || '',
    price: detail.price || 0,
    originalPrice: detail.originalPrice && detail.originalPrice > detail.price ? detail.originalPrice : undefined,
    category: '',
    image: images[0] || resolveImageUrl(undefined),
    images,
    description: isHtml ? stripHtmlTags(rawDesc).slice(0, 300) + '...' : rawDesc,
    htmlDescription: isHtml ? rawDesc : undefined,
    details: [],
    colors: variant1Values,
    variant1: variant1Values,
    variant2: variant2Values,
    slug: detail.slug,
    variantId: detail.id,
    variantCode: detail.variant_code,
    categoryIds: detail.category_ids,
    rating: undefined,
    soldCount: undefined,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let detail: BackendProductDetail;
  try {
    detail = await serverProductApi.getBySlug(slug);
  } catch {
    notFound();
  }

  const product = mapDetailToProduct(detail);
  const variantGroups = parseVariantGroups(detail);

  // Load related products
  let relatedProducts: Product[] = [];
  if (detail.category_ids && detail.category_ids.length > 0) {
    try {
      const related = await serverProductApi.getByCategory({
        categoryIds: detail.category_ids.join(','),
        limit: 8,
      });
      relatedProducts = related.items.filter(p => p.id !== detail.id);
    } catch {
      // ignore
    }
  }

  return (
    <ProductDetailClient
      product={product}
      variantGroups={variantGroups}
      relatedProducts={relatedProducts}
    />
  );
}
