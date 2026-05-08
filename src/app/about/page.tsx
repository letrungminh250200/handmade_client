import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  JsonLdScript,
} from '@/lib/seo';
import AboutClient from '@/components/about/AboutClient';

const ABOUT_TITLE = 'Về Minh Thư Handmade — Hành Trình 8 Năm Gìn Giữ Tinh Hoa Thủ Công Việt';
const ABOUT_DESCRIPTION =
  'Khám phá câu chuyện Minh Thư Handmade từ năm 2018: thương hiệu thời trang thủ công Việt Nam chuyên đồ móc len, túi cói, phụ kiện làm tay. Nguyên liệu tự nhiên, tỉ mỉ trong từng sợi len, thân thiện với môi trường.';
const FOUNDER_NAME = 'Tạ Thị Minh Thư';

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  keywords: [
    'về Minh Thư Handmade',
    'thương hiệu thời trang thủ công',
    'đồ handmade Việt Nam',
    'đồ móc len handmade',
    'túi cói handmade',
    'thời trang bền vững',
    'sống xanh',
    'thủ công Việt',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Câu chuyện thương hiệu`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  },
};

const About = () => {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Về chúng tôi', url: `${SITE_URL}/about` },
  ]);

  const organizationJsonLd = createOrganizationJsonLd({
    description: ABOUT_DESCRIPTION,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: '2018',
    founderName: FOUNDER_NAME,
    sameAs: [
      'https://www.facebook.com/handmadeMinhThu',
      'https://www.instagram.com/minhthuhandmade.98/',
    ],
    address: {
      streetAddress: '100 Đ. Võ Chí Công, Cát Lái',
      addressLocality: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
    contactPoint: {
      telephone: '+84-919-278-946',
      email: 'minhthuhandmades@gmail.com',
      contactType: 'customer service',
    },
  });

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <JsonLdScript data={organizationJsonLd} />
      <AboutClient />
    </>
  );
};

export default About;
