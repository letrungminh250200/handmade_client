"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Search, Package, MapPin, Phone, Mail, Truck, CreditCard, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { resolveImageUrl } from '@/services/api';

// Order status mapping (follows backend ORDER_STATUS constant)
const STATUS_MAP: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Chờ xác nhận', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  2: { label: 'Đang giao hàng', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  3: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  4: { label: 'Đã huỷ', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

const PAYMENT_MAP: Record<string, string> = {
  cod: 'Thanh toán khi nhận hàng (COD)',
  bank: 'Chuyển khoản ngân hàng',
};

const SHIPPING_MAP: Record<string, string> = {
  standard: 'Giao hàng tiêu chuẩn',
  express: 'Giao hàng nhanh',
};

interface OrderLineItem {
  variant_id?: string;
  image?: string;
  product?: { _id?: string; name?: string; slug?: string };
  attributes?: { key: string; name?: string; value?: string; code?: string }[];
  quantity: number;
  price: number;
  origin_price?: number;
  total_price?: number;
}

interface OrderData {
  _id: string;
  code: string;
  status: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  district?: string;
  city_name?: string;
  district_name?: string;
  note?: string;
  payment_method?: string;
  shipping_method?: string;
  shipping?: number;
  total?: number;
  original?: number;
  discount?: number;
  line_items?: OrderLineItem[];
  transaction_date?: string;
  created_at?: string;
}

export default function OrderTrackingPage() {
  const [orderCode, setOrderCode] = useState('');
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchOrder = useCallback(async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError('Vui lòng nhập mã đơn hàng');
      setOrder(null);
      setHasSearched(true);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${trimmed}`);
      const json = await res.json();

      if (res.ok && json.data) {
        const data = json.data;
        // Calculate discount from line items
        const discount = Array.isArray(data.line_items)
          ? data.line_items.reduce((acc: number, item: OrderLineItem) =>
            acc + ((item.origin_price || item.price) - item.price) * item.quantity, 0)
          : 0;
        setOrder({ ...data, discount });
      } else {
        setError(json.error || 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã.');
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search from URL params or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get('code');
    const codeFromStorage = localStorage.getItem('order_code');
    const code = codeFromUrl || codeFromStorage;
    if (code && code !== 'undefined') {
      setOrderCode(code);
      fetchOrder(code);
    }
  }, [fetchOrder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderCode);
  };

  const status = order ? STATUS_MAP[order.status] : null;

  const addressParts = [
    order?.address,
    order?.district_name || order?.district,
    order?.city_name || order?.city,
  ].filter(Boolean);

  const transactionDate = order?.transaction_date
    ? new Date(order.transaction_date).toLocaleString('vi-VN')
    : order?.created_at
      ? new Date(order.created_at).toLocaleString('vi-VN')
      : null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">
            Theo dõi đơn hàng
          </h1>
          <nav className="text-sm text-stone-500 flex items-center gap-1">
            <Link href="/" className="hover:text-stone-900 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-900">Theo dõi đơn hàng</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Search Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-stone-500" />
            Tra cứu đơn hàng
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="VD: HD15641044"
                className="flex-1 rounded-xl border border-stone-300 px-4 py-3 text-base
                  focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200
                  transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900
                  px-6 py-3 text-sm font-bold uppercase tracking-wide text-white
                  hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tìm...
                  </>
                ) : 'Tra cứu'}
              </button>
            </div>
            <p className="text-xs text-stone-400">
              Nhập mã đơn hàng (VD: HD12345678) để xem trạng thái và chi tiết đơn hàng
            </p>
          </form>

          {error && !loading && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && !order && (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm flex items-center justify-center gap-3 text-stone-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Đang tải thông tin đơn hàng...</span>
          </div>
        )}

        {/* Not Found */}
        {!loading && hasSearched && !order && !error && (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm text-center">
            <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">Không tìm thấy đơn hàng</h3>
            <p className="text-sm text-stone-500">Vui lòng kiểm tra lại mã đơn hàng.</p>
          </div>
        )}

        {/* Order Detail */}
        {order && (
          <div className="space-y-4">
            {/* Order Header */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-1">Mã đơn hàng</p>
                  <p className="text-2xl font-bold text-stone-900 font-mono">#{order.code}</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  {status && (
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  )}
                  {transactionDate && (
                    <p className="text-xs text-stone-400">Đặt lúc: {transactionDate}</p>
                  )}
                  <p className="text-lg font-bold text-stone-900">
                    Tổng: {formatCurrency(Number(order.total) || 0)}
                  </p>
                </div>
              </div>
              {order.note && (
                <div className="mt-4 rounded-xl bg-stone-50 p-3 text-sm text-stone-600">
                  <span className="font-bold text-stone-700">Ghi chú:</span> {order.note}
                </div>
              )}
            </div>

            {/* Customer & Payment Info */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Customer */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-400" />
                  Thông tin người nhận
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-stone-400 text-xs uppercase tracking-wider font-bold">Khách hàng</dt>
                    <dd className="font-bold text-stone-900 text-base">{order.name}</dd>
                  </div>
                  {order.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <dd className="text-stone-700">{order.phone}</dd>
                    </div>
                  )}
                  {order.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <dd className="text-stone-700">{order.email}</dd>
                    </div>
                  )}
                  {addressParts.length > 0 && (
                    <div>
                      <dt className="text-stone-400 text-xs uppercase tracking-wider font-bold mb-1">Địa chỉ</dt>
                      <dd className="text-stone-700">{addressParts.join(', ')}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-400" />
                  Thanh toán & Giao hàng
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-stone-400">Thanh toán</dt>
                    <dd className="font-medium text-stone-900 text-right">
                      {PAYMENT_MAP[order.payment_method || ''] || order.payment_method || '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone-400 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Giao hàng
                    </dt>
                    <dd className="text-stone-900 text-right">
                      {SHIPPING_MAP[order.shipping_method || ''] || order.shipping_method || '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone-400">Phí vận chuyển</dt>
                    <dd className="text-stone-900">{formatCurrency(Number(order.shipping) || 0)}</dd>
                  </div>
                  {(order.discount || 0) > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-stone-400">Giảm giá</dt>
                      <dd className="text-green-600 font-medium">-{formatCurrency(order.discount || 0)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-stone-200 pt-3">
                    <dt className="font-bold text-stone-900">Tổng thanh toán</dt>
                    <dd className="font-bold text-stone-900 text-lg">{formatCurrency(Number(order.total) || 0)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-stone-400" />
                Sản phẩm ({order.line_items?.length || 0})
              </h3>
              {Array.isArray(order.line_items) && order.line_items.length > 0 ? (
                <ul className="divide-y divide-stone-100">
                  {order.line_items.map((item, index) => (
                    <li key={item.variant_id || index} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      {item.image && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                          <img
                            src={resolveImageUrl(item.image)}
                            alt={item.product?.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-900 text-sm truncate">
                          {item.product?.name || 'Sản phẩm'}
                          {item.attributes?.[0]?.code && (
                            <span className="text-stone-400"> - {item.attributes[0].code.toUpperCase()}</span>
                          )}
                        </p>
                        {item.attributes?.map((attr, i) => (
                          <p key={i} className="text-xs text-stone-400 mt-0.5">
                            <span className="font-medium">{attr.key}</span>: {attr.name || attr.value}
                          </p>
                        ))}
                        <p className="text-xs text-stone-400 mt-1">SL: {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-stone-900 text-sm">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        {item.origin_price && item.origin_price !== item.price && (
                          <p className="text-xs text-stone-400 line-through">
                            {formatCurrency(item.origin_price * item.quantity)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-stone-400">Không có sản phẩm nào.</p>
              )}
            </div>

            {/* Support */}
            <div className="bg-stone-100 rounded-2xl p-6 text-sm text-stone-600">
              <h3 className="font-bold text-stone-900 mb-1">Cần hỗ trợ?</h3>
              <p>
                Liên hệ hotline <strong>0397973603</strong> hoặc nhắn tin qua Zalo để được hỗ trợ về đơn hàng.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
