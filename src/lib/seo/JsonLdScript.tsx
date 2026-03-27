import React from 'react';

interface JsonLdScriptProps {
  data: Record<string, unknown>;
}

/**
 * Reusable component to render JSON-LD structured data.
 * Usage: <JsonLdScript data={myJsonLdObject} />
 */
export default function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
