"use client";
import React from 'react';
import { Product } from '@/lib/types';
import SafeHTML from '@/components/ui/SafeHTML';

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100">
      {product.htmlDescription ? (
        <div className="details_description prose prose-stone max-w-none">
          <style>{`
            .details_description img { max-width: 100% !important; height: auto !important; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            .details_description p { margin-bottom: 1.5rem; line-height: 1.8; color: #44403c; font-size: 1.05rem; }
            .details_description_title { font-family: 'Lora', serif; font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; color: #1c1917; position: relative; display: block; text-align: center; }
            .details_description_title::after { content: ''; display: block; width: 60px; height: 3px; background-color: #e07a5f; margin: 0.75rem auto 0; }
          `}</style>
          <SafeHTML html={product.htmlDescription} />
        </div>
      ) : (
        <div className="max-w-none">
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 pb-4 border-b border-stone-100">Chi Tiết Sản Phẩm</h2>
          <div className="space-y-8 text-stone-600 leading-loose text-lg">
            <p>{product.description}</p>
            <div className="bg-stone-50 rounded-2xl p-8">
              <h3 className="font-bold text-stone-900 mb-4">Thông số kỹ thuật</h3>
              <ul className="space-y-3">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2.5"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
