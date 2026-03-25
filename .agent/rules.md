# Frontend Rules — handmade-nextjs

## Đọc Skills trước khi code

- Đọc `.agent/skills/nextjs-ecom-frontend/SKILL.md` khi làm việc với frontend
- Đọc integration skill tại `ecom_backend/.agent/skills/ecom-fullstack-integration/SKILL.md` khi sửa API calls hoặc types

## API Usage

- **Client components** (`"use client"`): import từ `services/api.ts`
- **Server components / API routes**: import từ `services/server-api.ts`
- KHÔNG import `server-api.ts` trong client components
- Khi thay đổi API call → kiểm tra backend controller có hỗ trợ params/body format đó không

## Styling

- Dùng **TailwindCSS v4** — config nằm trong CSS file, KHÔNG có `tailwind.config.js`
- KHÔNG dùng syntax TailwindCSS v3 (`@apply` vẫn OK, nhưng config khác)

## Component Pattern

- **Server Components by default** — chỉ thêm `"use client"` khi cần hooks, events, browser APIs
- Images từ backend: luôn dùng `resolveImageUrl()` helper
- Types: import từ `@/lib/types`

## Cross-Project Awareness

- Khi thêm/sửa type trong `lib/types.ts` → đảm bảo khớp với backend response
- Khi thêm API method mới → kiểm tra endpoint tồn tại trong backend `src/modules/client/controllers/`

## Auto-Run Commands

Khi cần test:
```bash
# Start dev server
npm run dev

# Build kiểm tra lỗi
npm run build

# Lint
npm run lint
```

## Package Manager

Luôn dùng `npm`, KHÔNG dùng `pnpm` hay `yarn`.
