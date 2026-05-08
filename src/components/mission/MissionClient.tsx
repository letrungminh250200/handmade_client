'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Globe,
  Users,
  HandHeart,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/* ─── Counter hook: đếm số từ 0 → target khi element vào viewport ─── */
function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const step = Math.ceil(target / (duration / 16));
          const tick = () => {
            start = Math.min(start + step, target);
            el.textContent = start.toLocaleString('vi-VN');
            if (start < target) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}

/* ─── Component chính ─── */
const MissionClient = () => {
  /* Scroll-reveal animation (giống AboutClient) */
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

  /* Counter refs */
  const yearsRef = useCountUp(8, 1500);
  const productsRef = useCountUp(10000, 2200);
  const artisansRef = useCountUp(15, 1200);

  /* ─── Dữ liệu ─── */
  const impactValues = [
    {
      icon: Sparkles,
      title: 'Chất Lượng Là Ngôn Ngữ',
      desc: 'Mỗi sản phẩm rời xưởng không chỉ là một món đồ — đó là lời cam kết thầm lặng. Chúng mình muốn mỗi lần bạn chạm vào sợi len, bạn cảm nhận được sự trau chuốt và tình yêu gửi gắm bên trong.',
    },
    {
      icon: HandHeart,
      title: 'Trao Nghề, Không Trao Thương Hại',
      desc: 'Xưởng là ngôi nhà thứ hai của những con người từng bị cuộc sống bỏ quên. Ở đây, họ được học nghề, được sáng tạo và được tự hào gọi tên mình là "nghệ nhân". Founder trực tiếp đào tạo từng người, từ chỗ chưa biết gì đến lúc tự tay làm nên tác phẩm.',
    },
    {
      icon: Globe,
      title: 'Vươn Ra Thế Giới, Giữ Hồn Việt',
      desc: 'Từ Sài Gòn, những món đồ thủ công của chúng mình đã đến tay khách hàng khắp nơi trên thế giới. Dù ở đâu, mỗi sản phẩm vẫn mang trọn vẹn cái hồn mộc mạc và sự ấm áp của đôi bàn tay Việt.',
    },
  ];

  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          HERO — Hơn Cả Một Nghề
      ══════════════════════════════════════════════════ */}
      <section
        className="relative h-[75vh] min-h-[520px] overflow-hidden flex items-center justify-center"
        aria-label="Sứ mệnh Minh Thư Handmade"
      >
        <div className="absolute inset-0 opacity-0-start delay-100">
          <Image
            src="/images/mission-hero.png"
            alt="Bộ sưu tập sản phẩm len móc thủ công: túi xách, áo len và phụ kiện — Minh Thư Handmade"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto opacity-0-start delay-300">
          <span className="text-terracotta text-sm font-bold tracking-[0.3em] uppercase block mb-6">
            Sứ Mệnh Của Chúng Mình
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.1]">
            Hơn Cả Một Nghề, <br />
            Đó Là Một <em className="text-terracotta not-italic">Sứ Mệnh</em>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-stone-100 leading-relaxed">
            Chúng mình không đơn thuần đan len. Chúng mình đan kết những mảnh đời,
            gửi gắm hơi ấm và lan tỏa niềm tin rằng cái đẹp có thể thay đổi cuộc sống.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8 NĂM DẤU ẤN — Counter Stats
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto opacity-0-start">
            <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Hành Trình
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight mb-6">
              8 Năm Dấu Ấn — Vượt Ra Khỏi <br className="hidden md:block" />
              Dải Đất Hình Chữ S
            </h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              Hàng chục nghìn sản phẩm không phải là những con số vô hồn chạy trên dây chuyền máy móc.
              Mỗi con số là một con người, một mong muốn riêng biệt được chúng mình nâng niu và theo sát
              từ lúc lên ý tưởng đến khi trao tận tay.
            </p>
          </div>

          {/* Counter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 opacity-0-start delay-200">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-terracotta/10 rounded-2xl flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-white transition-all duration-500">
                <Heart className="w-9 h-9" />
              </div>
              <span ref={yearsRef} className="text-5xl md:text-6xl font-serif font-bold text-stone-800 block">0</span>
              <span className="text-terracotta font-bold text-sm tracking-wider uppercase mt-1 block">Năm +</span>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed max-w-[220px] mx-auto">
                Gìn giữ và phát triển nghề thủ công truyền thống Việt
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-terracotta/10 rounded-2xl flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-white transition-all duration-500">
                <Globe className="w-9 h-9" />
              </div>
              <span ref={productsRef} className="text-5xl md:text-6xl font-serif font-bold text-stone-800 block">0</span>
              <span className="text-terracotta font-bold text-sm tracking-wider uppercase mt-1 block">Sản phẩm +</span>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed max-w-[220px] mx-auto">
                Đã đến tay khách hàng yêu cái đẹp khắp nơi trên thế giới
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-terracotta/10 rounded-2xl flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-white transition-all duration-500">
                <Users className="w-9 h-9" />
              </div>
              <span ref={artisansRef} className="text-5xl md:text-6xl font-serif font-bold text-stone-800 block">0</span>
              <span className="text-terracotta font-bold text-sm tracking-wider uppercase mt-1 block">Nghệ nhân +</span>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed max-w-[220px] mx-auto">
                Được đào tạo và đồng hành phát triển nghề
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRÁI TIM CỦA XƯỞNG — Đào tạo người yếu thế
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Ảnh */}
            <div className="relative opacity-0-start delay-200">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/mission-artisan.png"
                  alt="Nghệ nhân đang móc len thủ công tạo ra túi xách tại xưởng Minh Thư Handmade"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-terracotta/10 rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-stone-200 rounded-full -z-10" />
            </div>

            {/* Nội dung */}
            <article className="space-y-6 opacity-0-start delay-400">
              <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase">
                Trái Tim Của Xưởng
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
                Nơi Bắt Đầu <br />
                <em className="text-terracotta not-italic">Những Tương Lai Mới</em>
              </h2>
              <div className="w-20 h-1 bg-terracotta" />
              <div className="text-stone-600 leading-relaxed text-lg space-y-5 text-justify">
                <p>
                  Đằng sau mỗi sản phẩm hoàn thiện là một tầm nhìn lớn hơn cả thời trang. Xưởng của
                  chúng mình không chỉ quy tụ những nghệ nhân nhiều năm trong nghề, mà còn rộng mở
                  vòng tay đón nhận <strong className="text-stone-800">những người yếu thế</strong> —
                  những con người mà cuộc sống chưa từng mỉm cười.
                </p>
                <p>
                  Bắt nguồn từ mong muốn không bỏ ai lại phía sau, chị Minh Thư — Founder
                  của thương hiệu — đã trực tiếp cầm tay chỉ việc, truyền nghề cho từng người.
                  Từ những đôi tay <em>chưa từng biết cầm que đan</em>, qua tháng ngày miệt mài,
                  họ đã trở thành những người thợ lành nghề, tự hào với từng tác phẩm mang tên mình.
                </p>
                <p>
                  Ở xưởng Minh Thư, không có khái niệm &quot;thương hại&quot;. Chỉ có sự đồng hành
                  và niềm tin mãnh liệt rằng <strong className="text-stone-800">ai cũng xứng đáng
                  có một cái nghề, một sự tự tôn, và cơ hội để tỏa sáng</strong> bằng chính năng lực
                  của mình. Mỗi sản phẩm bạn nhận được chính là minh chứng cho điều đó.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GIÁ TRỊ CỐT LÕI — Impact Cards
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto opacity-0-start">
            <span className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Khát Vọng Bền Vững
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
              Ba Trụ Cột Định Hướng Tương Lai
            </h2>
            <p className="mt-6 text-stone-600 leading-relaxed text-lg">
              Mỗi quyết định tại xưởng đều xoay quanh ba giá trị này — không phải vì phải làm,
              mà vì đó là con người của chúng mình.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactValues.map((val, idx) => (
              <article
                key={idx}
                className={`opacity-0-start delay-${(idx + 1) * 200} bg-white p-12 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-3 transition-all duration-500 border border-stone-100`}
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

      {/* ══════════════════════════════════════════════════
          CTA — Lời Mời Gọi Đồng Hành
      ══════════════════════════════════════════════════ */}
      <section
        className="py-28 md:py-36 bg-stone-900 text-stone-200 text-center px-4 relative overflow-hidden"
        aria-label="Đồng hành cùng Minh Thư Handmade"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-terracotta rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-500 rounded-full blur-3xl mix-blend-screen" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 opacity-0-start">
          <Heart className="w-16 h-16 text-terracotta mx-auto mb-8 animate-float" />
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-[1.2]">
            Mỗi đơn hàng của bạn <br className="hidden md:block" />
            là một lời đồng hành
          </h2>
          <p className="text-stone-300 mb-12 leading-relaxed text-xl max-w-2xl mx-auto font-light">
            Khi bạn chọn một sản phẩm từ Minh Thư Handmade, bạn không chỉ sở hữu một món đồ đẹp.
            Bạn đang tiếp thêm động lực cho một người thợ, nuôi dưỡng một giấc mơ,
            và góp phần vào một tương lai nơi nghề thủ công Việt luôn được trân trọng.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/danh-muc"
              className="group inline-flex items-center gap-3 px-12 py-5 bg-terracotta text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-xl hover:shadow-terracotta/20 hover:-translate-y-1"
            >
              Khám Phá Sản Phẩm
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-block px-12 py-5 border border-stone-600 text-stone-200 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-stone-800 hover:border-stone-500 transition-all duration-300 hover:-translate-y-1"
            >
              Đọc Câu Chuyện Thương Hiệu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MissionClient;
