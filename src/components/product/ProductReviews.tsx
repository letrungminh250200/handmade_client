"use client";
import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Phone } from 'lucide-react';
import { Review } from '@/lib/types';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  // Component tự quản lý state và logic
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ userName: '', userPhone: '', rating: 5, comment: '' });
  const [isReviewing, setIsReviewing] = useState(false);

  // Load reviews khi component mount
  useEffect(() => {
    const REVIEWS_KEY = `minhthu_reviews_${productId}`;
    const storedReviews = localStorage.getItem(REVIEWS_KEY);
    
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      // Mock reviews
      const mockReviews: Review[] = [
        { id: 'r1', productId, userName: 'Hương Giang', rating: 5, comment: 'Sản phẩm rất đẹp, đóng gói cẩn thận. Mình rất ưng ý!', date: '12/05/2024' },
        { id: 'r2', productId, userName: 'Minh Quân', rating: 4, comment: 'Chất liệu vải rất thích, tuy nhiên giao hàng hơi chậm một chút.', date: '10/05/2024' }
      ];
      setReviews(mockReviews);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(mockReviews));
    }

    // Load user profile
    const savedProfile = localStorage.getItem('minhthu_user_profile');
    if (savedProfile) {
      const { userName, userPhone } = JSON.parse(savedProfile);
      setNewReview(prev => ({ ...prev, userName, userPhone }));
    }
  }, [productId]);

  // Tính toán average rating trong component
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  // Logic submit review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;
    
    const review: Review = {
      id: Date.now().toString(),
      productId,
      userName: newReview.userName,
      userPhone: newReview.userPhone,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('vi-VN')
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`minhthu_reviews_${productId}`, JSON.stringify(updatedReviews));
    
    localStorage.setItem('minhthu_user_profile', JSON.stringify({
      userName: newReview.userName,
      userPhone: newReview.userPhone
    }));

    setNewReview(prev => ({ ...prev, comment: '', rating: 5 }));
    setIsReviewing(false);
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 mb-16 animate-fade-in-up">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-terracotta" /> Khách hàng đánh giá
        </h3>
        <button 
          onClick={() => setIsReviewing(!isReviewing)}
          className="px-6 py-2 bg-stone-100 rounded-full text-sm font-bold text-stone-700 hover:bg-stone-200 transition-all active:scale-95"
        >
          {isReviewing ? 'Hủy bỏ' : 'Viết đánh giá của bạn'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Review Summary */}
        <div className="lg:col-span-4">
          <div className="bg-stone-50 rounded-3xl p-8 flex flex-col items-center text-center sticky top-28">
            <span className="text-6xl font-serif font-bold text-stone-900 mb-4">{averageRating}</span>
            <div className="flex gap-1.5 text-yellow-500 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-6 h-6 ${i <= Number(averageRating) ? 'fill-current' : 'text-stone-300'}`} />
              ))}
            </div>
            <span className="text-stone-500 font-medium">Dựa trên {reviews.length} nhận xét thực tế</span>
            <div className="w-full mt-8 space-y-3">
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-4 font-bold text-stone-600">{star}</span>
                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="w-8 text-stone-400 text-xs">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="lg:col-span-8">
          {/* Review Form */}
          {isReviewing && (
            <form onSubmit={handleSubmitReview} className="mb-12 p-8 bg-stone-50 rounded-3xl border border-stone-200 animate-fade-in-up">
              <h4 className="font-serif font-bold text-lg mb-6">Bạn cảm thấy sản phẩm này thế nào?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Tên hiển thị</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input 
                      required 
                      type="text" 
                      value={newReview.userName}
                      onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                      className="w-full pl-12 pr-5 py-3 rounded-2xl border border-stone-200 focus:ring-1 focus:ring-terracotta outline-none text-sm bg-white shadow-sm"
                      placeholder="VD: Nguyễn Văn A"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input 
                      required 
                      type="tel" 
                      value={newReview.userPhone}
                      onChange={(e) => setNewReview({...newReview, userPhone: e.target.value})}
                      className="w-full pl-12 pr-5 py-3 rounded-2xl border border-stone-200 focus:ring-1 focus:ring-terracotta outline-none text-sm bg-white shadow-sm"
                      placeholder="09xx xxx xxx"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-stone-700 mb-2">Xếp hạng của bạn</label>
                <div className="flex gap-2 p-3 bg-white rounded-2xl border border-stone-200 justify-center shadow-sm">
                  {[1, 2, 3, 4, 5].map(i => (
                    <button 
                      key={i} 
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: i})}
                      className={`transition-all hover:scale-125 ${i <= newReview.rating ? 'text-yellow-500' : 'text-stone-300'}`}
                    >
                      <Star className={`w-6 h-6 ${i <= newReview.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold text-stone-700 mb-2">Chia sẻ cảm nhận</label>
                <textarea 
                  required 
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:ring-1 focus:ring-terracotta outline-none text-sm bg-white shadow-sm"
                  placeholder="Chất vải, màu sắc, cảm giác khi mặc..."
                ></textarea>
              </div>
              <button type="submit" className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg active:scale-95">
                Đăng đánh giá ngay
              </button>
            </form>
          )}

          {/* Review List */}
          <div className="space-y-10">
            {reviews.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-3xl">
                <p className="text-stone-400 italic">Hãy là người đầu tiên sở hữu và đánh giá sản phẩm này!</p>
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="group animate-fade-in-up">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold border border-stone-200 group-hover:bg-terracotta group-hover:text-white transition-colors">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-stone-800 block text-lg">{rev.userName}</span>
                        <div className="flex gap-0.5 text-yellow-500 mt-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i <= rev.rating ? 'fill-current' : 'text-stone-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-stone-400 font-medium bg-stone-50 px-3 py-1 rounded-full">{rev.date}</span>
                  </div>
                  <div className="pl-16">
                    <p className="text-stone-600 leading-relaxed italic text-lg">"{rev.comment}"</p>
                  </div>
                  <div className="h-px bg-stone-100 w-full mt-10"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
