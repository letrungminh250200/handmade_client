/**
 * Shared utilities cho toàn bộ dự án Minh Thư Handmade
 */

// ==================== FORMAT ====================

/**
 * Format số tiền sang dạng tiền tệ VND
 * @example formatCurrency(850000) => "850.000 ₫"
 */
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

// ==================== CART UTILS ====================

/**
 * Tạo unique key cho cart item dựa trên id + variant
 * Dùng chung ở CartContext, CartSidebar, Checkout
 */
export const getCartItemKey = (item: {
  id: string;
  selectedVariant1?: string;
  selectedVariant2?: string;
}): string => {
  return `${item.id}-${item.selectedVariant1 || ''}-${item.selectedVariant2 || ''}`;
};

// ==================== SHIPPING ====================

export const FREE_SHIPPING_THRESHOLD = 1_000_000;
export const SHIPPING_FEE = 30_000;

/**
 * Tính phí vận chuyển dựa trên tổng đơn hàng
 */
export const calculateShipping = (total: number): number =>
  total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

/**
 * Logo SVG file path - centralized, dùng chung ở Navbar, Footer, Home
 * File: public/logo.svg (có nền trắng)
 */
export const LOGO_SRC = '/logo.svg';

/**
 * Logo SVG file path variant không có nền trắng - cho Footer
 * File: public/logo-no-bg.svg
 */
export const LOGO_SRC_NO_BG = '/logo-no-bg.svg';
