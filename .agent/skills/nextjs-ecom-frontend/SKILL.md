---
name: nextjs-ecom-frontend
description: Skill for working with the handmade-nextjs project — a Next.js 16 storefront with React 19, TailwindCSS v4, AI chatbot, and server/client API layer connecting to ecom_backend.
---

# Next.js E-Commerce Frontend Skill

## Project Overview

**Cửa hàng thời trang handmade Minh Thư** — storefront UI.

| Technology | Version | Purpose |
|---|---|---|
| Next.js | v16 | Framework (App Router) |
| React | v19 | UI library |
| TailwindCSS | v4 | Styling |
| TypeScript | v5 | Type safety |
| Lucide React | — | Icons |
| @google/genai | — | AI chatbot (Gemini) |
| npm | — | Package manager |

**Dev server**: `http://localhost:3001` (default Next.js port)
**Backend API**: `http://localhost:5002` (ecom_backend)

---

## Directory Structure

```
handmade-nextjs/
├── src/
│   ├── app/                          # App Router pages
│   │   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles + TailwindCSS v4
│   │   ├── [slug]/                   # Product detail page (dynamic route)
│   │   ├── shop/                     # Shop/catalog page
│   │   ├── checkout/                 # Checkout page
│   │   ├── about/                    # About page
│   │   ├── contact/                  # Contact page
│   │   ├── news/                     # News listing + detail
│   │   └── api/                      # API routes (server-side proxy)
│   ├── components/
│   │   ├── ProductCard.tsx           # Reusable product card
│   │   ├── layout/                   # Header, Footer, Navigation
│   │   ├── home/                     # Homepage sections
│   │   ├── product/                  # Product detail components
│   │   ├── shop/                     # Shop page components
│   │   └── ui/                       # Generic UI components
│   ├── services/
│   │   ├── api.ts                    # Client-side API (browser fetch)
│   │   ├── server-api.ts             # Server-side API (SSR fetch)
│   │   └── geminiService.ts          # AI chatbot service
│   ├── context/                      # React Context providers
│   └── lib/
│       ├── types.ts                  # All TypeScript interfaces
│       ├── constants.ts              # App constants
│       └── utils.ts                  # Utility functions
├── public/                           # Static assets
├── .env                              # Environment variables
├── next.config.ts
├── tailwind.config (v4 in CSS)
├── package.json
└── tsconfig.json
```

---

## API Layer — Client vs Server

| File | Dùng khi | Base URL env |
|---|---|---|
| `api.ts` | Client components (`"use client"`) | `NEXT_PUBLIC_API_URL` |
| `server-api.ts` | Server components, API routes | `API_URL` |

Cả hai đều unwrap response format `{ data: ... }` từ backend:
```typescript
const json = await res.json();
return (json.data !== undefined ? json.data : json) as T;
```

> [!IMPORTANT]
> **KHÔNG import `server-api.ts` trong client components** (`"use client"`).
> `server-api.ts` sử dụng `next: { revalidate: N }` cho ISR caching.

---

## Key Types (src/lib/types.ts)

| Interface | Mô tả |
|---|---|
| `Product` | Frontend product model (mapped từ BackendVariantItem) |
| `CartItem` | Product + quantity + selected variants |
| `CategoryItem` | `{ id, name, slug, image? }` |
| `BackendVariantItem` | Raw variant data từ backend |
| `BackendProductDetail` | Chi tiết sản phẩm (variants, attributes, images) |
| `ApiListResponse<T>` | Paginated list: `{ total, items, limit?, skip?, category? }` |
| `OrderResponse` | Order creation/lookup response |
| `CartVariant` | Cart validation response |
| `NewsItem` | News article (defined in server-api.ts) |

---

## Image Resolution

Backend trả path dạng `/files/09/2025/image.png`. Frontend resolve thành full URL:
```typescript
function resolveImageUrl(path: string | undefined): string {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http')) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
```

---

## Page Routes

| Route | File | Type | Mô tả |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Homepage |
| `/shop` | `app/shop/page.tsx` | — | Catalog + filters |
| `/[slug]` | `app/[slug]/page.tsx` | — | Product detail |
| `/checkout` | `app/checkout/page.tsx` | — | Checkout flow |
| `/about` | `app/about/page.tsx` | — | About page |
| `/contact` | `app/contact/page.tsx` | — | Contact page |
| `/news` | `app/news/page.tsx` | — | News listing |

---

## Environment Variables

| Variable | Scope | Description | Default |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Client (browser) | Backend URL for client-side fetch | `http://localhost:5002` |
| `API_URL` | Server only | Backend URL for SSR fetch | `http://localhost:5002` |
| `GEMINI_API_KEY` | Server only | Google Gemini API key | — |

---

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Code Conventions

- **TailwindCSS v4** — config in CSS file, NOT `tailwind.config.js`
- **App Router** — use `app/` directory, NOT `pages/`
- **Server Components by default** — add `"use client"` only when needed (hooks, events, browser APIs)
- Client-side API calls: use `api.ts` → `productApi`, `categoryApi`, `orderApi`, `addressApi`
- Server-side API calls: use `server-api.ts` → `serverProductApi`, `serverCategoryApi`, etc.
- Images from backend: always use `resolveImageUrl()` helper
