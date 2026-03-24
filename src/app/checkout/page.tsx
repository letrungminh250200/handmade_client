"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { formatCurrency, getCartItemKey, calculateShipping, FREE_SHIPPING_THRESHOLD } from '@/lib/utils';


const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cod',
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-serif mb-4">Giỏ hàng của bạn đang trống</h2>
        <button 
          onClick={() => router.push('/shop')}
          className="text-terracotta hover:underline"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shippingFee = calculateShipping(cartTotal);
  const orderTotal = cartTotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setOrderError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          address: formData.address,
          payment_method: formData.paymentMethod,
          items: cart.map(item => ({
            variant_id: item.variantId || item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });
      if (!res.ok) throw new Error('Order failed');

      clearCart();
      alert('Đặt hàng thành công! Cảm ơn bạn đã ủng hộ Minh Thư Handmade.');
      router.push('/');
    } catch (err) {
      console.error('Order failed:', err);
      setOrderError('Đặt hàng thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-stone-800 mb-10 text-center">Thanh Toán</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-xl font-medium text-stone-900 mb-6">Thông tin giao hàng</h2>
          {orderError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {orderError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Họ tên</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Địa chỉ nhận hàng</label>
              <textarea required rows={3} name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"></textarea>
            </div>

            <div>
               <label className="block text-sm font-medium text-stone-700 mb-1">Phương thức thanh toán</label>
               <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none">
                 <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                 <option value="bank">Chuyển khoản ngân hàng</option>
               </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-stone-800 text-white py-4 rounded-lg font-medium hover:bg-stone-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-wait"
            >
              {isProcessing ? 'Đang xử lý...' : `Đặt hàng (${formatCurrency(orderTotal)})`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 h-fit">
          <h2 className="text-xl font-medium text-stone-900 mb-6">Đơn hàng của bạn</h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={getCartItemKey(item)} className="flex gap-4 items-start">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-stone-900">{item.name}</h3>
                  <p className="text-xs text-stone-500">Số lượng: {item.quantity}</p>
                  {item.selectedVariant1 && <p className="text-xs text-stone-500">Màu: {item.selectedVariant1}</p>}
                  {item.selectedVariant2 && <p className="text-xs text-stone-500">Size: {item.selectedVariant2}</p>}
                </div>
                <p className="text-sm font-medium text-stone-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-stone-200 pt-6 space-y-4">
            <div className="flex justify-between text-stone-600">
              <p>Tạm tính</p>
              <p>{formatCurrency(cartTotal)}</p>
            </div>
            <div className="flex justify-between text-stone-600">
              <p>Phí vận chuyển</p>
              {shippingFee === 0 ? (
                <p className="text-green-600 font-medium">Miễn phí</p>
              ) : (
                <p>{formatCurrency(shippingFee)}</p>
              )}
            </div>
            {shippingFee > 0 && (
              <p className="text-xs text-stone-400 italic">
                Miễn phí vận chuyển cho đơn hàng từ {formatCurrency(FREE_SHIPPING_THRESHOLD)}
              </p>
            )}
            <div className="flex justify-between text-lg font-bold text-stone-900 pt-4 border-t border-stone-200">
              <p>Tổng cộng</p>
              <p>{formatCurrency(orderTotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;