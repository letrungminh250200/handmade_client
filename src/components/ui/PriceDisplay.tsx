import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Component hiển thị giá sản phẩm, hỗ trợ giá gốc (gạch ngang) và nhiều kích thước.
 * Thay thế việc gọi Intl.NumberFormat lặp lại khắp nơi.
 *
 * @example
 * <PriceDisplay price={850000} originalPrice={1250000} size="lg" />
 */
const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: { price: 'text-sm font-bold', original: 'text-[10px]' },
    md: { price: 'text-base font-bold', original: 'text-xs' },
    lg: { price: 'text-3xl font-bold', original: 'text-xl' },
  };

  const { price: priceClass, original: originalClass } = sizeClasses[size];

  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`text-stone-900 ${priceClass}`}>
        {formatCurrency(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className={`text-stone-400 line-through ${originalClass}`}>
          {formatCurrency(originalPrice)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
