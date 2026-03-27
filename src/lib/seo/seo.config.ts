import type { Metadata } from 'next';

// ===== Hằng số SEO dùng chung =====
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
export const SITE_NAME = 'Minh Thư Handmade';
export const DEFAULT_DESCRIPTION =
  'Cửa hàng thời trang handmade trực tuyến Minh Thư. Phong cách tối giản, tự nhiên. Tích hợp trợ lý ảo AI tư vấn phối đồ, quần áo móc len thủ công.';
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1200&h=630&auto=format&fit=crop';
export const DEFAULT_KEYWORDS = [
  'thời trang handmade',
  'đồ len handmade',
  'quần áo móc len',
  'Minh Thư Handmade',
  'thời trang thủ công',
  'phụ kiện len',
  'túi móc len',
];

// ===== Global Metadata cho layout.tsx =====
export const globalMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Thời Trang Thủ Công`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Thời Trang Thủ Công`,
    description:
      'Cửa hàng thời trang handmade trực tuyến Minh Thư. Phong cách tối giản, tự nhiên. Quần áo và phụ kiện móc len thủ công độc đáo.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Thời Trang Thủ Công`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Thời Trang Thủ Công`,
    description: 'Cửa hàng thời trang handmade trực tuyến Minh Thư. Phong cách tối giản, tự nhiên.',
  },
};
