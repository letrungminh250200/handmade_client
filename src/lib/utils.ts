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

// ==================== ASSETS ====================

/**
 * Logo SVG data URI - centralized, dùng chung ở Navbar, Footer, Home
 */
export const LOGO_SRC = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="190" fill="%23ffffff" stroke="%2344403c" stroke-width="3"/><circle cx="200" cy="200" r="180" fill="none" stroke="%2344403c" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/><path d="M60 140 Q30 200 60 260" stroke="%2378350f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M60 140 L40 160 M50 180 L30 200 M55 220 L35 240" stroke="%2378350f" stroke-width="3" stroke-linecap="round"/><path d="M340 140 Q370 200 340 260" stroke="%2378350f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M340 140 L360 160 M350 180 L370 200 M345 220 L365 240" stroke="%2378350f" stroke-width="3" stroke-linecap="round"/><text x="200" y="150" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="%23292524" text-anchor="middle">Minh Thư</text><text x="200" y="200" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="%23292524" text-anchor="middle">Handmade</text><text x="200" y="235" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="%2357534e" text-anchor="middle" letter-spacing="1">CHUYÊN THỜI TRANG, PHỤ KIỆN ĐAN MÓC</text><g transform="translate(170, 260) scale(0.6)"><circle cx="50" cy="50" r="45" fill="%23f5f5f4" stroke="%2344403c" stroke-width="4"/><path d="M20 30 Q50 10 80 30" fill="none" stroke="%2344403c" stroke-width="3"/><path d="M10 50 Q50 30 90 50" fill="none" stroke="%2344403c" stroke-width="3"/><path d="M20 70 Q50 50 80 70" fill="none" stroke="%2344403c" stroke-width="3"/><line x1="90" y1="10" x2="120" y2="-20" stroke="%2344403c" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="-20" r="5" fill="%2344403c"/><line x1="10" y1="10" x2="-20" y2="-20" stroke="%2344403c" stroke-width="5" stroke-linecap="round"/><circle cx="-20" cy="-20" r="5" fill="%2344403c"/></g></svg>`;

/**
 * Logo SVG data URI variant không có nền trắng - cho Footer
 */
export const LOGO_SRC_NO_BG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="190" fill="none" stroke="%2344403c" stroke-width="3"/><circle cx="200" cy="200" r="180" fill="none" stroke="%2344403c" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/><path d="M60 140 Q30 200 60 260" stroke="%2378350f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M60 140 L40 160 M50 180 L30 200 M55 220 L35 240" stroke="%2378350f" stroke-width="3" stroke-linecap="round"/><path d="M340 140 Q370 200 340 260" stroke="%2378350f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M340 140 L360 160 M350 180 L370 200 M345 220 L365 240" stroke="%2378350f" stroke-width="3" stroke-linecap="round"/><text x="200" y="150" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="%23292524" text-anchor="middle">Minh Thư</text><text x="200" y="200" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="%23292524" text-anchor="middle">Handmade</text><text x="200" y="235" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="%2357534e" text-anchor="middle" letter-spacing="1">CHUYÊN THỜI TRANG, PHỤ KIỆN ĐAN MÓC</text><g transform="translate(170, 260) scale(0.6)"><circle cx="50" cy="50" r="45" fill="none" stroke="%2344403c" stroke-width="4"/><path d="M20 30 Q50 10 80 30" fill="none" stroke="%2344403c" stroke-width="3"/><path d="M10 50 Q50 30 90 50" fill="none" stroke="%2344403c" stroke-width="3"/><path d="M20 70 Q50 50 80 70" fill="none" stroke="%2344403c" stroke-width="3"/><line x1="90" y1="10" x2="120" y2="-20" stroke="%2344403c" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="-20" r="5" fill="%2344403c"/><line x1="10" y1="10" x2="-20" y2="-20" stroke="%2344403c" stroke-width="5" stroke-linecap="round"/><circle cx="-20" cy="-20" r="5" fill="%2344403c"/></g></svg>`;
