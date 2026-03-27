"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { EnrichedCartItem, LocationOption } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { formatCurrency, calculateShipping, FREE_SHIPPING_THRESHOLD } from '@/lib/utils';
import { resolveImageUrl } from '@/services/api';
import { Loader2 } from 'lucide-react';



const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Enriched cart data from API
  const [enrichedCart, setEnrichedCart] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState<{ total: number; original: number; discount: number }>({
    total: 0,
    original: 0,
    discount: 0,
  });

  // Location selects
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    note: '',
    paymentMethod: 'cod',
  });

  // Load form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('checkout-form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        if (parsed.city) setSelectedProvinceCode(parsed.city);
        if (parsed.district) setSelectedDistrictCode(parsed.district);
      } catch { /* ignore */ }
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    if (formData.name || formData.phone || formData.address) {
      localStorage.setItem('checkout-form', JSON.stringify(formData));
    }
  }, [formData]);

  // Fetch enriched cart from API
  useEffect(() => {
    if (cart.length === 0) {
      setEnrichedCart([]);
      setLoading(false);
      return;
    }
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/orders/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart }),
        });
        const { data } = await res.json();
        if (Array.isArray(data)) {
          setEnrichedCart(data);
          const total = data.reduce((sum: number, item: EnrichedCartItem) => sum + item.price * item.quantity, 0);
          const original = data.reduce(
            (sum: number, item: EnrichedCartItem) => sum + (item.origin_price || item.price) * item.quantity,
            0
          );
          setTotalQuantity({ total, original, discount: original - total });
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [cart]);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const res = await fetch('/api/provinces');
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
        setProvinces(
          list
            .map((item: Record<string, unknown>) => ({
              code: String(item?.code ?? ''),
              name: String(item?.name ?? ''),
            }))
            .filter((item: LocationOption) => item.code && item.name)
        );
      } catch {
        setProvinces([]);
      } finally {
        setIsLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (!selectedProvinceCode) {
      setDistricts([]);
      return;
    }
    const fetchDistricts = async () => {
      setIsLoadingDistricts(true);
      try {
        const res = await fetch(`/api/wards/${selectedProvinceCode}`);
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
        setDistricts(
          list
            .map((item: Record<string, unknown>) => ({
              code: String(item?.code ?? ''),
              name: String(item?.name ?? ''),
            }))
            .filter((item: LocationOption) => item.code && item.name)
        );
      } catch {
        setDistricts([]);
      } finally {
        setIsLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, [selectedProvinceCode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedProvinceCode(code);
    setSelectedDistrictCode('');
    setDistricts([]);
    setFormData((prev) => ({ ...prev, city: code, district: '' }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedDistrictCode(code);
    setFormData((prev) => ({ ...prev, district: code }));
  };

  const shippingFee = calculateShipping(totalQuantity.total);
  const orderTotal = totalQuantity.total + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setOrderError(null);

    try {
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        note: formData.note,
        payment_method: formData.paymentMethod,
        shipping_method: 'standard',
        line_items: enrichedCart,
        shipping: shippingFee,
        total: totalQuantity.total,
        original: totalQuantity.original,
        discount: totalQuantity.discount,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const responseJson = await res.json();
      console.log('Order API response:', responseJson);
      const { data, statusCode } = responseJson;

      if (statusCode === 201 || res.ok) {
        const code = data?.code || '';
        if (code) {
          localStorage.setItem('order_code', code);
        }
        clearCart();
        localStorage.removeItem('checkout-form');
        router.push('/order-success');
      } else {
        setOrderError('Đặt hàng thất bại. Vui lòng thử lại sau.');
      }
    } catch (err) {
      console.error('Order failed:', err);
      if ((err as { status?: number })?.status === 500) {
        setOrderError('Đơn hàng không thành công. Vui lòng liên hệ qua số điện thoại 0397973603 để được hỗ trợ!');
      } else {
        setOrderError('Đặt hàng thất bại. Vui lòng thử lại sau.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-serif mb-4">Giỏ hàng của bạn đang trống</h2>
        <button
          onClick={() => router.push('/')}
          className="text-terracotta hover:underline"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-stone-400" />
      </div>
    );
  }

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
                <label className="block text-sm font-medium text-stone-700 mb-1">Họ tên *</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Địa chỉ (Số nhà, Tên đường, Phường/Xã) *
              </label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Tỉnh/Thành phố *</label>
                <select
                  required
                  name="city"
                  value={selectedProvinceCode}
                  onChange={handleProvinceChange}
                  disabled={isLoadingProvinces}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Quận/Huyện *</label>
                <select
                  required
                  name="district"
                  value={selectedDistrictCode}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvinceCode || isLoadingDistricts}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Ghi chú</label>
              <textarea
                rows={3}
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
                placeholder="Ghi chú cho đơn hàng..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phương thức thanh toán</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-terracotta focus:border-terracotta outline-none"
              >
                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                <option value="bank_transfer">Chuyển khoản ngân hàng</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-stone-800 text-white py-4 rounded-lg font-medium hover:bg-stone-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-wait"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang xử lý...
                </span>
              ) : (
                `Đặt hàng (${formatCurrency(orderTotal)})`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary — data from API */}
        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 h-fit">
          <h2 className="text-xl font-medium text-stone-900 mb-6">Đơn hàng của bạn</h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {enrichedCart.map((item, index) => (
              <div key={item.variant_id || item._id || index} className="flex gap-4 items-start">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                  <img
                    src={item.image ? resolveImageUrl(item.image) : resolveImageUrl(undefined)}
                    alt={item.product?.name || ''}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-stone-900">{item.product?.name || ''}</h3>
                  <p className="text-xs text-stone-500">Số lượng: {item.quantity}</p>
                  {item.attributes?.map((attr: { key: string; name: string }) => (
                    <p key={attr.key} className="text-xs text-stone-500">
                      {attr.key}: {attr.name}
                    </p>
                  ))}
                </div>
                <div className="text-right">
                  {item.origin_price && item.origin_price > item.price && (
                    <p className="text-xs text-stone-400 line-through">{formatCurrency(item.origin_price)}</p>
                  )}
                  <p className="text-sm font-medium text-stone-900">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-6 space-y-4">
            <div className="flex justify-between text-stone-600">
              <p>Tạm tính</p>
              <p>{formatCurrency(totalQuantity.original)}</p>
            </div>
            {totalQuantity.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Giảm giá</p>
                <p>-{formatCurrency(totalQuantity.discount)}</p>
              </div>
            )}
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