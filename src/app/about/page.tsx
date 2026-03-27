"use client";
import React from 'react';
import { Heart, Sun, Leaf, Users } from 'lucide-react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=2000&auto=format&fit=crop" 
            alt="Handmade workshop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
          <span className="text-terracotta text-sm font-bold tracking-[0.2em] uppercase block mb-4">Câu chuyện của chúng mình</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Gửi Gắm Yêu Thương <br/> Trong Từng Mũi Chỉ</h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-stone-200">
            Minh Thư Handmade không chỉ là một cửa hàng thời trang, đó là nơi lưu giữ vẻ đẹp của sự tỉ mỉ và chậm rãi.
          </p>
        </div>
      </div>

      {/* The Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-stone-800">Khởi Nguồn</h2>
            <div className="w-20 h-1 bg-terracotta"></div>
            <div className="prose prose-stone text-stone-600 leading-relaxed text-lg text-justify">
              <p>
                Mọi chuyện bắt đầu vào một buổi chiều thu năm 2018, khi Minh Thư - cô gái nhỏ với niềm đam mê đan móc - quyết định tự tay làm chiếc túi tặng mẹ. Cảm giác hạnh phúc khi nhìn thấy nụ cười của mẹ và sự ấm áp từ những sợi len mềm mại đã thôi thúc Thư lan tỏa niềm vui này đến nhiều người hơn.
              </p>
              <p>
                Từ một tiệm nhỏ online chỉ với vài cuộn len trong phòng trọ sinh viên, Minh Thư Handmade đã lớn lên từng ngày nhờ sự yêu thương của những khách hàng trân trọng giá trị thủ công.
              </p>
              <p>
                Chúng mình tin rằng, giữa thế giới hối hả và công nghiệp hóa, những sản phẩm làm bằng tay vẫn có chỗ đứng riêng. Nó không hoàn hảo 100% như máy móc, nhưng nó có &quot;nhịp đập&quot; và có &quot;linh hồn&quot;.
              </p>
            </div>
            <div className="pt-4">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" className="h-12 opacity-40 invert-0" alt="signature"/>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop" alt="Knitting hands" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-stone-100 rounded-full -z-10" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-terracotta/20 rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">Giá Trị Cốt Lõi</h2>
             <p className="mt-4 text-stone-500">Những điều Minh Thư Handmade luôn gìn giữ</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: Heart, title: "Thủ Công 100%", desc: "Mỗi sản phẩm đều được làm bằng tay bởi những nghệ nhân lành nghề, tỉ mỉ trong từng chi tiết." },
                { icon: Leaf, title: "Sống Xanh", desc: "Ưu tiên sử dụng nguyên liệu tự nhiên (cói, len cotton, linen) và đóng gói hạn chế nilon." },
                { icon: Sun, title: "Độc Bản", desc: "Không sản xuất đại trà. Mỗi món đồ bạn sở hữu đều mang dấu ấn riêng biệt, khó đụng hàng." }
              ].map((val, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:-translate-y-2 transition-transform duration-300">
                   <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-terracotta">
                     <val.icon className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">{val.title}</h3>
                   <p className="text-stone-600">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Team / Founder */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
         <h2 className="text-3xl font-serif font-bold text-stone-800 mb-12">Người Giữ Lửa</h2>
         <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-stone-100 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-stone-50 shadow-md">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
               <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Trần Minh Thư</h3>
               <p className="text-terracotta font-medium mb-4">Founder & Lead Artisan</p>
               <p className="text-stone-600 italic leading-relaxed mb-6">
                 &quot;Mình luôn tâm niệm rằng, thời trang không chỉ là vẻ bề ngoài, mà là cách chúng ta đối xử với bản thân và môi trường. Mong rằng những món đồ nhỏ xinh từ tiệm sẽ mang lại cho bạn chút bình yên giữa cuộc sống bộn bề.&quot;
               </p>
               <div className="flex gap-4">
                  <button className="p-2 text-stone-400 hover:text-stone-800 transition-colors"><Users className="w-5 h-5"/></button>
                  {/* Social icons placeholder */}
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-800 text-stone-200 text-center">
         <h2 className="text-3xl font-serif font-bold text-white mb-6">Bạn đã sẵn sàng chọn món đồ thủ công cho riêng mình?</h2>
         <Link href="/shop" className="inline-block px-10 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-terracotta hover:text-white transition-all duration-300 shadow-lg">
            Ghé Cửa Hàng Ngay
         </Link>
      </section>
    </div>
  );
};

export default About;
