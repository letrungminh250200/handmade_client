import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  createBreadcrumbJsonLd,
  JsonLdScript,
} from '@/lib/seo';
import MissionClient from '@/components/mission/MissionClient';

const MISSION_TITLE = 'Sứ Mệnh — Minh Thư Handmade | Lan Tỏa Cái Đẹp, Trao Quyền Con Người';
const MISSION_DESCRIPTION =
  'Sứ mệnh của Minh Thư Handmade: hơn 8 năm lan tỏa cái đẹp thủ công Việt đến khách hàng khắp thế giới, đồng thời trao cơ hội nghề nghiệp cho người yếu thế — biến đam mê thành tương lai bền vững.';

export const metadata: Metadata = {
  title: MISSION_TITLE,
  description: MISSION_DESCRIPTION,
  keywords: [
    'sứ mệnh Minh Thư Handmade',
    'thời trang thủ công bền vững',
    'handmade Việt Nam',
    'trách nhiệm xã hội',
    'đào tạo nghề người yếu thế',
    'thủ công mỹ nghệ',
    'thời trang có tâm',
  ],
  alternates: { canonical: '/su-menh' },
  openGraph: {
    title: MISSION_TITLE,
    description: MISSION_DESCRIPTION,
    url: `${SITE_URL}/su-menh`,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Sứ mệnh thương hiệu`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: MISSION_TITLE,
    description: MISSION_DESCRIPTION,
  },
};

const MissionPage = () => {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Sứ mệnh', url: `${SITE_URL}/su-menh` },
  ]);

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <MissionClient />
    </>
  );
};

export default MissionPage;
