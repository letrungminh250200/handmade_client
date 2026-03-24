"use client";
import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { getCartItemKey, formatCurrency } from '@/lib/utils';

const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;



  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full flex flex-col bg-white shadow-xl animate-slide-in-right">
          <div className="flex items-center justify-between px-4 py-6 border-b border-stone-100 sm:px-6">
            <h2 className="text-lg font-serif font-medium text-stone-900">Giỏ hàng của bạn</h2>
            <button
              type="button"
              className="text-stone-400 hover:text-stone-500"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-500 mb-4">Giỏ hàng đang trống</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-terracotta hover:text-terracotta/80 font-medium hover:underline"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {cart.map((item) => {
                  const uniqueId = getCartItemKey(item);
                  return (
                    <li key={uniqueId} className="flex py-2 border-b border-stone-50 pb-6 last:border-0">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-stone-900">
                            <h3>
                              <Link href={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>{item.name}</Link>
                            </h3>
                            <p className="ml-4">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                          <div className="mt-1 text-sm text-stone-500 flex flex-wrap gap-x-3">
                            {item.selectedVariant1 && <span>Màu: <span className="text-stone-700 font-medium">{item.selectedVariant1}</span></span>}
                            {item.selectedVariant2 && <span>Size: <span className="text-stone-700 font-medium">{item.selectedVariant2}</span></span>}
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm mt-4">
                          <div className="flex items-center border border-stone-200 rounded-lg">
                              <button 
                                  onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                                  className="p-1 hover:bg-stone-100 rounded-l-lg"
                                  disabled={item.quantity <= 1}
                              >
                                  <Minus className="h-4 w-4 text-stone-500" />
                              </button>
                              <span className="px-3 text-stone-600 min-w-[1.5rem] text-center font-bold">{item.quantity}</span>
                              <button 
                                  onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                                  className="p-1 hover:bg-stone-100 rounded-r-lg"
                              >
                                  <Plus className="h-4 w-4 text-stone-500" />
                              </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(uniqueId)}
                            className="text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-xs">Xóa</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-stone-100 px-4 py-6 sm:px-6 bg-stone-50">
              <div className="flex justify-between text-base font-medium text-stone-900 mb-4">
                <p>Tổng tiền</p>
                <p className="font-bold text-terracotta">{formatCurrency(cartTotal)}</p>
              </div>
              <p className="mt-0.5 text-sm text-stone-500 mb-6 italic">
                Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ
              </p>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex items-center justify-center rounded-xl border border-transparent bg-stone-800 px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-stone-900 transition-all active:scale-95"
              >
                Tiến hành thanh toán
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
