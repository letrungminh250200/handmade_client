"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableArticleProps {
  html: string;
  collapsedHeight?: number;
}

const ExpandableArticle: React.FC<ExpandableArticleProps> = ({
  html,
  collapsedHeight = 1300,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden transition-[max-height] duration-500 ease-out"
        style={{ maxHeight: expanded ? 'none' : `${collapsedHeight}px` }}
      >
        <div
          className="prose prose-stone prose-lg max-w-none text-stone-700 leading-9 box-description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-stone-900 text-white text-sm font-medium tracking-[0.2em] uppercase hover:bg-terracotta transition-colors"
        >
          {expanded ? 'Thu gọn' : 'Xem toàn bộ bài viết'}
          {expanded ? (
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          )}
        </button>
      </div>
    </>
  );
};

export default ExpandableArticle;
