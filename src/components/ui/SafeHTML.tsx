import React from 'react';

interface SafeHTMLProps {
  html: string;
  className?: string;
}

/**
 * Wrapper an toàn cho dangerouslySetInnerHTML.
 * Strip <script>, event handlers (onerror, onclick...), và các thẻ nguy hiểm.
 *
 * @example
 * <SafeHTML html={product.htmlDescription} className="prose" />
 */
const SafeHTML: React.FC<SafeHTMLProps> = ({ html, className = '' }) => {
  const sanitize = (dirty: string): string => {
    return dirty
      // Remove <script>...</script> tags and content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove <iframe> tags
      .replace(/<iframe\b[^>]*>.*?<\/iframe>/gi, '')
      // Remove <object>, <embed>, <applet> tags
      .replace(/<(object|embed|applet)\b[^>]*>.*?<\/\1>/gi, '')
      // Remove event handlers (onclick, onerror, onload, etc.)
      .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\s*on\w+\s*=\s*\S+/gi, '')
      // Remove javascript: URLs
      .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
      .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""')
      // Remove data: URLs in src (potential XSS vector)
      .replace(/src\s*=\s*["']data:text\/html[^"']*["']/gi, 'src=""');
  };

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    />
  );
};

export default SafeHTML;
