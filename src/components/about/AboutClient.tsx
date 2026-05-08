'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

const FOUNDER_NAME = 'Tạ Thị Minh Thư';

const AboutClient = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.opacity-0-start').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Hand,
      title: 'Dấu Ấn Của Đôi Bàn Tay',
      desc: 'Sự hoàn mỹ không nằm ở sự chính xác tuyệt đối như máy móc, mà ở cái "hồn" của người thợ dồn vào từng mũi đan. Mỗi món đồ bạn cầm trên tay là độc bản, mang theo một câu chuyện và cảm xúc riêng.',
    },
    {
      icon: Leaf,
      title: 'Tôn Trọng Mẹ Thiên Nhiên',
      desc: 'Sợi len, sợi đũi hay mây tre đan — chúng mình chọn những nguyên liệu hiền hòa nhất. Tôn trọng làn da của bạn và cũng là cách chúng mình nâng niu Trái Đất này qua những chiếc hộp giấy, túi vải thay vì nilon.',
    },
    {
      icon: Sparkles,
      title: 'Thỏa Hiệp? Không Bao Giờ.',
      desc: 'Chúng mình thà lùi lại vài ngày giao hàng, thà tháo ra đan lại từ đầu, chứ nhất quyết không để một sản phẩm mang tiếng "tạm được" rời xưởng. Sự tỉ mỉ là cách chúng mình thể hiện lòng tự trọng với nghề.',
    },
  ];

  const process = [
    {
      icon: Heart,
      step: '01',
      title: 'Khơi Nguồn Cảm Hứng',
      desc: 'Bắt đầu từ một rung động nhỏ bé — có thể là màu của trời chiều sương lãng đãng, hay một mong muốn bâng quơ của bạn. Mọi phác thảo đều bắt nguồn từ cảm xúc.',
    },
    {
      icon: Scissors,
      step: '02',
      title: 'Nâng Niu Chất Liệu',
      desc: 'Từng sợi len được chạm, vuốt để cảm nhận độ mềm. Những cuộn sợi được chọn lựa khắt khe nhất để đảm bảo khi lên dáng, đó sẽ là phiên bản hoàn hảo nhất.',
    },
    {
      icon: Hand,
      step: '03',
      title: 'Hơi Thở & Thời Gian',
      desc: 'Đan móc không thể vội. Một chiếc túi mất 10 giờ, một chiếc áo qua 3 ngày. Nghệ nhân ngồi đó, tĩnh lặng, gửi gắm thời gian và nhịp thở vào từng nút thắt.',
    },
    {
      icon: Package,
      step: '04',
      title: 'Gói Ghém Yêu Thương',
      desc: 'Món quà được bọc cẩn thận trong lớp giấy lụa mềm mại, ruy băng vải và một tấm thiệp viết tay nhỏ xinh. Cảm giác mở hộp, hy vọng sẽ làm bạn mỉm cười.',
    },
  ];

  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* ── Hero ── */}
      <section
        className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center"
        aria-label="Giới thiệu Minh Thư Handmade"
      >
        <div className="absolute inset-0 opacity-0-start delay-100">
          <Image
            src="/images/about-hero.png"
            alt="Xưởng thủ công Minh Thư Handmade — không gian đan móc len với sản phẩm túi xách và áo len"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto opacity-0-start delay-300">
          <span className="text-terracotta text-sm font-bold tracking-[0.25em] uppercase block mb-5">
            Một Chút Chậm Rãi
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[1.1]">
            Chào Bạn, <br />
            Người Yêu Cái Đẹp
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-stone-100 leading-relaxed">
            Giữa thế giới vội vã chạy theo những điều phô trương, cảm ơn bạn đã dừng lại nơi này. Hãy cùng lắng nghe câu chuyện về những sợi len biết hát.
          </p>
        </div>
      </section>

      {/* ── Khởi nguồn ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <article className="space-y-6 opacity-0-start delay-200">
            <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase">
              Khởi nguồn — 2018
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
              Bắt đầu từ khát khao <em className="text-terracotta not-italic">tìm kiếm sự hoàn hảo</em>
            </h2>
            <div className="w-20 h-1 bg-terracotta" />
            <div className="text-stone-600 leading-relaxed text-lg space-y-4 text-justify">
              <p>
                Mọi thứ bắt đầu từ một mong muốn rất đỗi bình thường của cô gái trẻ yêu 
                cái đẹp: tìm kiếm những món đồ phụ kiện thật chất lượng để tự chăm chút 
                cho bản thân. Giữa vô vàn các sản phẩm công nghiệp đại trà, mình luôn 
                khao khát những món đồ có gu, thể hiện được cá tính riêng nhưng vẫn 
                phải đi kèm với chất lượng sản phẩm và dịch vụ thực sự tuyệt vời.
              </p>
              <p>
                Thế nhưng, tìm hoài mà vẫn chưa thấy một nơi nào đáp ứng trọn vẹn những 
                tiêu chuẩn khắt khe đó. Chính sự thiếu vắng ấy đã thôi thúc mình tự tay 
                làm ra những món đồ đầu tiên. Từ những sản phẩm nhỏ thỏa mãn sở thích 
                cá nhân, làm đẹp cho chính mình, Minh Thư Handmade đã dần hình thành.
              </p>
              <p>
                Chúng mình quyết định xây dựng một thương hiệu mang đậm dấu ấn cá nhân, 
                nơi dung hòa hoàn hảo giữa phong cách độc bản và trải nghiệm dịch vụ 
                tận tâm. Hơn <strong className="text-stone-800">8 năm</strong> qua, 
                những tiêu chuẩn khắt khe ngày ấy vẫn luôn là kim chỉ nam để chúng mình 
                tạo ra từng sản phẩm gửi đến tay khách hàng.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-3 text-stone-500">
              <Award className="w-5 h-5 text-terracotta" />
              <span className="text-sm italic">
                Thương hiệu thời trang thủ công — Thành phố Hồ Chí Minh, Việt Nam
              </span>
            </div>
          </article>
          <div className="relative opacity-0-start delay-400">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
              <Image
                src="/images/about-origin.png"
                alt="Đôi bàn tay đang móc len tạo túi xách thủ công — Minh Thư Handmade"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-stone-200 rounded-full -z-10" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-terracotta/20 rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* ── Vì sao chọn chúng mình ── */}
      <section className="py-32 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-2xl mx-auto opacity-0-start">
            <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Niềm Kiêu Hãnh Từ Xưởng Nhỏ
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
              Triết Lý Làm Nghề Của Minh Thư
            </h2>
            <p className="mt-5 text-stone-600 leading-relaxed text-lg">
              Ba lời hứa không bao giờ thay đổi, giữ chân những người tri kỷ quay lại với xưởng suốt 8 năm qua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <article
                key={idx}
                className={`opacity-0-start delay-${(idx + 1) * 200} bg-white p-12 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-3 transition-all duration-500`}
              >
                <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-8 text-terracotta">
                  <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">
                  {val.title}
                </h3>
                <p className="text-stone-600 leading-relaxed text-lg">{val.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quy trình thủ công ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto opacity-0-start">
          <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Hành Trình
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
            Thai Nghén Một Tác Phẩm
          </h2>
          <p className="mt-5 text-stone-600 leading-relaxed text-lg">
            Sẽ không có đường tắt nào ở đây. Mỗi món đồ đều đi qua 4 cung bậc cảm xúc, chậm rãi và đầy kiên nhẫn.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((p, idx) => (
            <li
              key={idx}
              className={`opacity-0-start delay-${(idx + 1) * 200} relative bg-white p-8 rounded-3xl border border-stone-100 hover:border-terracotta/40 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-md`}
            >
              <span className="absolute top-6 right-6 text-6xl font-serif font-bold text-stone-50 select-none">
                {p.step}
              </span>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-6 text-terracotta">
                  <p.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-4">
                  {p.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Người sáng lập ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 opacity-0-start">
            <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Lời Tâm Tình
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">
              Bức Thư Từ Người Giữ Lửa
            </h2>
          </div>
          <article className="opacity-0-start delay-200 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-stone-100 flex flex-col md:flex-row items-center gap-16">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shrink-0 border-8 border-stone-50 shadow-lg relative group">
              <Image
                src="https://api.minhthuhandmade.com/files/69be6b55c056dce3fe970942/05/2026/1778182788438-764448980.webp"
                alt={`${FOUNDER_NAME} — Người sáng lập Minh Thư Handmade`}
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-2">
                {FOUNDER_NAME}
              </h3>
              <p className="text-terracotta font-bold mb-8 tracking-wider uppercase text-sm">
                Người Vẽ Ước Mơ Bằng Sợi Len
              </p>
              <blockquote className="text-stone-600 italic leading-loose text-xl border-l-4 border-terracotta/40 pl-8 bg-stone-50/50 p-6 rounded-r-3xl relative">
                <span className="absolute -top-4 -left-2 text-4xl text-terracotta/20 font-serif">&quot;</span>
                Mình thường nói với các cô chú nghệ nhân trong xưởng rằng: thời trang không đơn thuần chỉ để khoác lên người. Nó là một liệu pháp tinh thần. Khi bạn chạm vào một chiếc túi mềm mịn, cảm nhận sự chỉn chu trong từng chi tiết, đó là lúc bạn đang cho phép bản thân được nâng niu. 
                <br /><br />
                Giữa cuộc sống vốn dĩ đã quá vội vã và nhiều áp lực này, hy vọng một món đồ từ Minh Thư Handmade sẽ là góc nhỏ bình yên dành riêng cho bạn.
              </blockquote>
            </div>
          </article>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-32 bg-stone-900 text-stone-200 text-center px-4 relative overflow-hidden"
        aria-label="Khám phá cửa hàng"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-terracotta rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-500 rounded-full blur-3xl mix-blend-screen" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 opacity-0-start">
          <Heart className="w-16 h-16 text-terracotta mx-auto mb-8 animate-float" />
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-[1.2]">
            Hãy để chúng mình viết tiếp <br className="hidden md:block" />
            câu chuyện của riêng bạn
          </h2>
          <p className="text-stone-300 mb-12 leading-relaxed text-xl max-w-2xl mx-auto font-light">
            Cho dù đó là một chiếc túi đi biển ngày đầy nắng, hay một chiếc áo ấm áp cho mùa đông. Chúng mình ở đây, sẵn sàng đan móc những kỷ niệm đẹp đẽ nhất cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/danh-muc"
              className="inline-block px-12 py-5 bg-terracotta text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-xl hover:shadow-terracotta/20 hover:-translate-y-1"
            >
              Ghé Thăm Cửa Hàng
            </Link>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 border border-stone-600 text-stone-200 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-stone-800 hover:border-stone-500 transition-all duration-300 hover:-translate-y-1"
            >
              Nói Chuyện Với Chúng Mình
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutClient;
