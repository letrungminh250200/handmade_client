import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Component heading cho các section, dùng chung ở trang chủ, shop, news...
 * Đảm bảo style nhất quán, giảm duplicate markup.
 *
 * @example
 * <SectionHeading
 *   title="Góc Nhỏ Của Minh Thư"
 *   subtitle="Những sản phẩm mới nhất"
 *   icon={<BookOpen className="h-10 w-10" />}
 *   align="center"
 * />
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  icon,
  align = 'center',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${alignClass} ${className}`}>
      {icon && (
        <div className={`text-terracotta mb-6 ${align === 'center' ? 'flex justify-center' : ''}`}>
          {icon}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-stone-600 text-lg font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
