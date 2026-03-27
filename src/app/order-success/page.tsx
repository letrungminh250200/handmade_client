"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Search } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const [orderCode] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const code = localStorage.getItem('order_code');
    return code && code !== 'undefined' ? code : '';
  });

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-14 h-14 text-green-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
          Đặt hàng thành công!
        </h1>

        <p className="text-stone-600 text-lg mb-2">
          Cảm ơn bạn đã ủng hộ Minh Thư Handmade 🌿
        </p>

        {orderCode && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 my-8 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Package className="w-5 h-5 text-terracotta" />
              <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">Mã đơn hàng</span>
            </div>
            <p className="text-2xl font-bold text-stone-900 font-mono tracking-widest">
              {orderCode}
            </p>
            <p className="text-xs text-stone-400 mt-3">
              Vui lòng lưu lại mã đơn hàng để theo dõi
            </p>
          </div>
        )}

        <p className="text-stone-500 text-sm mb-8">
          Chúng mình sẽ liên hệ bạn qua số điện thoại để xác nhận đơn hàng sớm nhất.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={orderCode ? `/order-tracking?code=${orderCode}` : '/order-tracking'}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-full font-bold hover:bg-stone-800 transition-all"
          >
            <Search className="w-4 h-4" />
            Theo dõi đơn hàng
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 rounded-full font-medium hover:bg-stone-100 transition-all"
          >
            Tiếp tục mua sắm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
