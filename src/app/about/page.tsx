import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  Leaf,
  Sparkles,
  Scissors,
  Hand,
  ShieldCheck,
  Package,
  Award,
} from 'lucide-react';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  JsonLdScript,
} from '@/lib/seo';

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

  const values = [
    {
      icon: Hand,
      title: 'Thủ công 100%',
      desc: 'Mỗi sản phẩm là kết quả của hàng trăm mũi đan, móc do bàn tay nghệ nhân tỉ mỉ thực hiện. Không khuôn mẫu, không hàng loạt — bạn không chỉ mua một món đồ, bạn sở hữu một câu chuyện.',
    },
    {
      icon: Leaf,
      title: 'Nguyên liệu tự nhiên',
      desc: 'Cói, len cotton, linen tuyển chọn kỹ lưỡng — an toàn cho làn da nhạy cảm, thân thiện với môi trường. Bao bì giấy tái chế, hạn chế tối đa nilon.',
    },
    {
      icon: Sparkles,
      title: 'Tỉ mỉ đến từng chi tiết',
      desc: 'Mỗi đường kim, mũi chỉ đều được kiểm tra kỹ lưỡng. Chúng mình thà chậm hơn vài ngày, còn hơn để một sản phẩm chưa hoàn hảo rời xưởng — vì món đồ bạn cầm trên tay xứng đáng với điều đó.',
    },
  ];

  const process = [
    {
      icon: Heart,
      step: '01',
      title: 'Lắng nghe & lên ý tưởng',
      desc: 'Mỗi bộ sưu tập bắt đầu từ một cảm hứng — có thể là làn gió thu Hà Nội, một bộ phim cũ hay tâm sự của khách hàng.',
    },
    {
      icon: Scissors,
      step: '02',
      title: 'Chọn nguyên liệu',
      desc: 'Sợi len, vải linen, cói được tuyển chọn từ nguồn cung uy tín. Mỗi cuộn len đều được kiểm tra độ mịn, độ bền màu trước khi đến tay nghệ nhân.',
    },
    {
      icon: Hand,
      step: '03',
      title: 'Đan, móc, hoàn thiện',
      desc: 'Một chiếc túi nhỏ có thể mất 8–12 giờ thủ công. Một chiếc áo len mất 3–5 ngày. Chúng mình không vội — vì bạn xứng đáng với điều tử tế.',
    },
    {
      icon: Package,
      step: '04',
      title: 'Đóng gói xanh & gửi đến bạn',
      desc: 'Hộp giấy tái chế, ruy băng vải, kèm thiệp viết tay. Trải nghiệm mở hộp được chăm chút như chính sản phẩm bên trong.',
    },
  ];

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <JsonLdScript data={organizationJsonLd} />

      <main className="min-h-screen bg-stone-50">
        {/* ── Hero ── */}
        <section
          className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center"
          aria-label="Giới thiệu Minh Thư Handmade"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=2000&auto=format&fit=crop"
              alt="Xưởng thủ công Minh Thư Handmade — không gian đan móc len"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/50" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
            <span className="text-terracotta text-sm font-bold tracking-[0.25em] uppercase block mb-5">
              Câu chuyện thương hiệu
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[1.1]">
              Gửi Yêu Thương <br />
              Vào Từng Sợi Len
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-stone-100 leading-relaxed">
              Hành trình 8 năm của một thương hiệu thời trang thủ công Việt — nơi mỗi sản
              phẩm đều mang nhịp đập, hơi thở và tình cảm của người làm ra nó.
            </p>
          </div>
        </section>

        {/* ── Khởi nguồn ── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <article className="space-y-6">
              <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase">
                Khởi nguồn — 2018
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
                Bắt đầu từ một <em className="text-terracotta not-italic">chiếc túi tặng mẹ</em>
              </h2>
              <div className="w-20 h-1 bg-terracotta" />
              <div className="text-stone-600 leading-relaxed text-lg space-y-4 text-justify">
                <p>
                  Một buổi chiều thu Hà Nội năm 2018, Minh Thư — cô sinh viên năm hai với
                  niềm đam mê đan móc — quyết định tự tay làm chiếc túi tặng mẹ nhân ngày
                  sinh nhật. Khoảnh khắc nhìn mẹ ôm chiếc túi và mỉm cười là khoảnh khắc
                  Thư hiểu: một món đồ làm bằng tay có sức mạnh chạm vào trái tim theo
                  cách mà không sản phẩm công nghiệp nào làm được.
                </p>
                <p>
                  Từ một góc bàn nhỏ trong phòng trọ sinh viên với vài cuộn len và một
                  chiếc kim móc, Minh Thư Handmade dần lớn lên. Không quảng cáo rầm rộ,
                  không chạy đua giảm giá — chúng mình lớn lên nhờ sự yêu thương của
                  những khách hàng trân trọng giá trị thủ công và truyền tai nhau.
                </p>
                <p>
                  Hơn <strong className="text-stone-800">8 năm</strong>, hàng nghìn món đồ
                  đã rời xưởng để đến tay những người trân trọng giá trị thủ công. Chúng
                  mình không làm nhanh, không làm nhiều — nhưng đã làm là làm tới nơi tới
                  chốn. Đó là điều chúng mình tự hào nhất.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-3 text-stone-500">
                <Award className="w-5 h-5 text-terracotta" />
                <span className="text-sm italic">
                  Thương hiệu thời trang thủ công độc lập — Thành phố Hồ Chí Minh, Việt Nam
                </span>
              </div>
            </article>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop"
                  alt="Đôi bàn tay đang đan len thủ công — biểu tượng của thương hiệu Minh Thư Handmade"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-stone-100 rounded-full -z-10" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-terracotta/20 rounded-full -z-10" />
            </div>
          </div>
        </section>

        {/* ── Vì sao chọn chúng mình ── */}
        <section className="py-24 bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Cam kết của chúng mình
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 leading-tight">
                Vì sao bạn nên chọn Minh Thư Handmade?
              </h2>
              <p className="mt-5 text-stone-600 leading-relaxed">
                Ba lời hứa giữ chân hàng nghìn khách hàng quay lại với chúng mình suốt 8
                năm qua.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <article
                  key={idx}
                  className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-6 text-terracotta">
                    <val.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-800 mb-4">
                    {val.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">{val.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quy trình thủ công ── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Quy trình
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 leading-tight">
              4 Bước Thủ Công, Một Sản Phẩm Hoàn Hảo
            </h2>
            <p className="mt-5 text-stone-600 leading-relaxed">
              Mỗi món đồ rời khỏi xưởng đều đi qua đầy đủ quy trình dưới đây — không cắt
              bớt bước nào, không làm vội bước nào.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, idx) => (
              <li
                key={idx}
                className="relative bg-white p-7 rounded-2xl border border-stone-100 hover:border-terracotta/40 transition-all"
              >
                <span className="absolute top-4 right-5 text-5xl font-serif font-bold text-stone-100 select-none">
                  {p.step}
                </span>
                <div className="relative">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mb-5 text-terracotta">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-800 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Người sáng lập ── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                Người giữ lửa
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">
                Gặp gỡ người sáng lập
              </h2>
            </div>
            <article className="bg-white p-8 md:p-14 rounded-3xl shadow-lg border border-stone-100 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-stone-50 shadow-md">
                <img
                  src="https://api.minhthuhandmade.com/files/69be6b55c056dce3fe970942/05/2026/1778182788438-764448980.webp"
                  alt={`${FOUNDER_NAME} — Người sáng lập Minh Thư Handmade`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-2">
                  {FOUNDER_NAME}
                </h3>
                <p className="text-terracotta font-medium mb-6 tracking-wide">
                  Founder &amp; Lead Artisan
                </p>
                <blockquote className="text-stone-600 italic leading-relaxed text-lg border-l-4 border-terracotta pl-6">
                  &ldquo;Mình tin rằng thời trang không chỉ là vẻ bề ngoài — đó là cách
                  chúng ta đối xử với chính mình, với người làm ra món đồ, và với hành
                  tinh này. Mong rằng mỗi sản phẩm bạn nhận được từ tiệm sẽ mang lại một
                  chút bình yên, giữa cuộc sống vốn đã quá vội vàng.&rdquo;
                </blockquote>
              </div>
            </article>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-24 bg-stone-800 text-stone-200 text-center px-4"
          aria-label="Khám phá cửa hàng"
        >
          <div className="max-w-3xl mx-auto">
            <ShieldCheck className="w-12 h-12 text-terracotta mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5 leading-tight">
              Sẵn sàng tìm cho mình một món đồ thủ công <br className="hidden md:block" />
              mang dấu ấn riêng?
            </h2>
            <p className="text-stone-300 mb-10 leading-relaxed">
              Hàng trăm mẫu túi, áo len, phụ kiện thủ công đang đợi bạn. Mỗi đường kim,
              mũi chỉ đều được chăm chút — dành cho người yêu sự chỉn chu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/danh-muc"
                className="inline-block px-10 py-4 bg-terracotta text-white rounded-full font-bold hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-lg"
              >
                Khám Phá Cửa Hàng
              </Link>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 border border-stone-500 text-stone-200 rounded-full font-bold hover:bg-stone-700 hover:border-stone-700 transition-all duration-300"
              >
                Đặt May Riêng
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
