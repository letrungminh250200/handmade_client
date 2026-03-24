# Hướng Dẫn Sử Dụng - Minh Thư Handmade Next.js

## 📋 Mục Lục

1. [Giới Thiệu](#giới-thiệu)
2. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
3. [Cài Đặt](#cài-đặt)
4. [Cấu Hình](#cấu-hình)
5. [Chạy Ứng Dụng](#chạy-ứng-dụng)
6. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
7. [Tính Năng](#tính-năng)
8. [Quản Lý Dữ Liệu](#quản-lý-dữ-liệu)
9. [Triển Khai](#triển-khai)
10. [Xử Lý Lỗi](#xử-lý-lỗi)

---

## 🎯 Giới Thiệu

**Minh Thư Handmade** là website thương mại điện tử bán sản phẩm thời trang handmade với phong cách tối giản, tự nhiên. Ứng dụng được xây dựng bằng Next.js 14+ với App Router, tích hợp AI Stylist sử dụng Google Gemini API.

### Công Nghệ Sử Dụng

- **Framework**: Next.js 14+ (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Fonts**: Be Vietnam Pro, Lora (Google Fonts)

---

## 💻 Yêu Cầu Hệ Thống

- **Node.js**: Phiên bản 18.0 trở lên
- **npm**: Phiên bản 9.0 trở lên (hoặc yarn, pnpm)
- **Hệ điều hành**: Windows, macOS, hoặc Linux
- **Trình duyệt**: Chrome, Firefox, Safari, Edge (phiên bản mới nhất)

### Kiểm Tra Phiên Bản

```bash
node --version   # Nên >= v18.0.0
npm --version    # Nên >= 9.0.0
```

---

## 📦 Cài Đặt

### Bước 1: Di chuyển vào thư mục dự án

```bash
cd c:\Users\a\OneDrive\Desktop\wordSpace\handmade\handmade-nextjs
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

Quá trình này sẽ cài đặt tất cả các package cần thiết được liệt kê trong `package.json`:
- `next`: Framework Next.js
- `react`, `react-dom`: Thư viện React
- `@google/genai`: SDK Google Gemini AI
- `lucide-react`: Thư viện icon
- `tailwindcss`: Framework CSS
- Và các dependencies khác...

### Bước 3: Kiểm tra cài đặt

Sau khi cài đặt xong, kiểm tra thư mục `node_modules` đã được tạo:

```bash
ls node_modules  # Hoặc dir node_modules trên Windows
```

---

## ⚙️ Cấu Hình

### 1. Cấu Hình Environment Variables

Tạo file `.env.local` trong thư mục gốc của dự án:

```bash
# Tạo file .env.local
touch .env.local  # macOS/Linux
# Hoặc tạo thủ công trên Windows
```

Thêm nội dung sau vào file `.env.local`:

```env
# Google Gemini API Key (Bắt buộc cho tính năng AI Stylist)
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

#### Lấy API Key từ Google AI Studio

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google
3. Click "Create API Key"
4. Copy API key và paste vào file `.env.local`

> **⚠️ Lưu ý**: File `.env.local` không được commit lên Git. Đã được thêm vào `.gitignore`.

### 2. Cấu Hình Next.js (Tùy chọn)

File `next.config.ts` đã được cấu hình sẵn:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

Bạn có thể thêm các cấu hình khác nếu cần.

---

## 🚀 Chạy Ứng Dụng

### Chế Độ Development (Phát Triển)

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

- Hot reload tự động khi bạn chỉnh sửa code
- Hiển thị lỗi chi tiết trên trình duyệt
- Fast Refresh cho React components

### Chế Độ Production (Sản Xuất)

#### Build ứng dụng:

```bash
npm run build
```

Quá trình build sẽ:
- Tối ưu hóa code
- Tạo static files
- Kiểm tra lỗi TypeScript
- Tạo thư mục `.next` chứa output

#### Chạy production server:

```bash
npm start
```

Ứng dụng production sẽ chạy tại: **http://localhost:3000**

### Các Lệnh Khác

```bash
# Kiểm tra lỗi ESLint
npm run lint

# Type checking (không build)
npx tsc --noEmit
```

---

## 📁 Cấu Trúc Dự Án

```
handmade-nextjs/
├── src/                          # Source code chính
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout (bọc toàn bộ app)
│   │   ├── page.tsx             # Trang chủ (/)
│   │   ├── globals.css          # CSS toàn cục
│   │   ├── shop/
│   │   │   └── page.tsx         # Trang cửa hàng (/shop)
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Chi tiết sản phẩm (/product/1)
│   │   ├── news/
│   │   │   ├── page.tsx         # Danh sách tin tức (/news)
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Chi tiết tin tức (/news/1)
│   │   ├── checkout/
│   │   │   └── page.tsx         # Trang thanh toán (/checkout)
│   │   ├── about/
│   │   │   └── page.tsx         # Giới thiệu (/about)
│   │   └── contact/
│   │       └── page.tsx         # Liên hệ (/contact)
│   │
│   ├── components/              # React components
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.tsx      # Thanh điều hướng
│   │   │   ├── Footer.tsx      # Footer
│   │   │   ├── CartSidebar.tsx # Giỏ hàng sidebar
│   │   │   └── AIStylist.tsx   # Chatbot AI
│   │   └── ProductCard.tsx     # Card hiển thị sản phẩm
│   │
│   ├── context/                # React Context
│   │   └── CartContext.tsx     # Quản lý giỏ hàng
│   │
│   ├── lib/                    # Utilities & Constants
│   │   ├── types.ts           # TypeScript types
│   │   └── constants.ts       # Dữ liệu sản phẩm, tin tức
│   │
│   └── services/              # API services
│       └── geminiService.ts   # Google Gemini AI integration
│
├── public/                    # Static files
│   ├── favicon.ico
│   └── ...
│
├── .env.local                # Environment variables (không commit)
├── .env.example              # Template cho .env.local
├── next.config.ts            # Cấu hình Next.js
├── tailwind.config.ts        # Cấu hình Tailwind CSS
├── tsconfig.json             # Cấu hình TypeScript
├── package.json              # Dependencies & scripts
└── README.md                 # Tài liệu dự án
```

---

## ✨ Tính Năng

### 1. Trang Chủ (/)

- Hero section với parallax effect
- Giới thiệu về thương hiệu
- Sản phẩm nổi bật (8 sản phẩm đầu tiên)
- Bài viết blog mới nhất
- Testimonials từ khách hàng

### 2. Cửa Hàng (/shop)

- Hiển thị tất cả sản phẩm
- Lọc theo danh mục (Clothing, Bags, Accessories)
- Tìm kiếm sản phẩm
- Thêm vào giỏ hàng nhanh

### 3. Chi Tiết Sản Phẩm (/product/[id])

- Thông tin chi tiết sản phẩm
- Chọn màu sắc và kích thước
- Đánh giá và nhận xét
- Sản phẩm liên quan
- Thêm vào giỏ hàng

### 4. Giỏ Hàng (Sidebar)

- Xem danh sách sản phẩm trong giỏ
- Cập nhật số lượng
- Xóa sản phẩm
- Tính tổng tiền
- Chuyển đến trang thanh toán

### 5. AI Stylist (Chatbot)

- Tư vấn phối đồ
- Gợi ý sản phẩm phù hợp
- Trả lời câu hỏi về chất liệu, bảo quản
- Powered by Google Gemini AI

### 6. Tin Tức (/news)

- Danh sách bài viết blog
- Chi tiết bài viết
- Sản phẩm liên quan trong bài viết

### 7. Thanh Toán (/checkout)

- Form thông tin khách hàng
- Tổng kết đơn hàng
- Xác nhận đặt hàng

### 8. Giới Thiệu & Liên Hệ

- Thông tin về cửa hàng
- Form liên hệ
- Thông tin liên lạc

---

## 📊 Quản Lý Dữ Liệu

### Sản Phẩm

Dữ liệu sản phẩm được lưu trong `src/lib/constants.ts`:

```typescript
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Đầm Linen Thêu Tay',
    price: 850000,
    originalPrice: 1250000,
    category: 'Clothing',
    image: 'https://...',
    description: '...',
    details: [...],
    variant1: ['Kem', 'Be'],
    variant2: ['S', 'M', 'L'],
    rating: 4.9,
    soldCount: 156
  },
  // ... các sản phẩm khác
];
```

#### Thêm Sản Phẩm Mới

1. Mở file `src/lib/constants.ts`
2. Thêm object mới vào array `PRODUCTS`
3. Đảm bảo có đủ các field bắt buộc: `id`, `name`, `price`, `category`, `image`, `description`, `details`, `variant1`, `variant2`

### Bài Viết Blog

Dữ liệu blog trong `src/lib/constants.ts`:

```typescript
export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Linen - "Hơi thở" của mùa hè nhiệt đới',
    excerpt: '...',
    content: [...],
    date: '15/03/2024',
    author: 'Minh Thư',
    category: 'Kiến Thức',
    image: 'https://...',
    isFeatured: true,
    relatedProducts: ['1', '7']
  }
];
```

### Giỏ Hàng

Giỏ hàng được quản lý bởi `CartContext` và lưu trong `localStorage`:

```typescript
// Thêm sản phẩm vào giỏ
const { addToCart } = useCart();
addToCart({ 
  product, 
  quantity: 1, 
  variant1: 'Kem', 
  variant2: 'M' 
});

// Xóa sản phẩm
const { removeFromCart } = useCart();
removeFromCart(uniqueId);

// Cập nhật số lượng
const { updateQuantity } = useCart();
updateQuantity(uniqueId, newQuantity);
```

---

## 🌐 Triển Khai

### Triển Khai lên Vercel (Khuyến nghị)

1. **Tạo tài khoản Vercel**: https://vercel.com

2. **Import dự án**:
   - Click "New Project"
   - Import từ Git repository
   - Chọn repository của bạn

3. **Cấu hình Environment Variables**:
   - Trong Vercel dashboard, vào Settings → Environment Variables
   - Thêm: `NEXT_PUBLIC_GEMINI_API_KEY`

4. **Deploy**:
   - Click "Deploy"
   - Vercel sẽ tự động build và deploy

5. **Domain**:
   - Vercel cung cấp domain miễn phí: `your-project.vercel.app`
   - Có thể thêm custom domain

### Triển Khai lên Netlify

```bash
# Build dự án
npm run build

# Deploy
npx netlify-cli deploy --prod
```

### Triển Khai lên VPS/Server

```bash
# Build
npm run build

# Chạy với PM2
npm install -g pm2
pm2 start npm --name "handmade-nextjs" -- start

# Hoặc với Docker
docker build -t handmade-nextjs .
docker run -p 3000:3000 handmade-nextjs
```

---

## 🐛 Xử Lý Lỗi

### Lỗi Thường Gặp

#### 1. Module not found

```
Error: Cannot find module '@/lib/constants'
```

**Giải pháp**: Kiểm tra import path và đảm bảo file tồn tại.

#### 2. API Key không hoạt động

```
Gemini API Error: Invalid API key
```

**Giải pháp**:
- Kiểm tra file `.env.local` có tồn tại
- Đảm bảo API key đúng format
- Restart dev server sau khi thêm env variable

#### 3. Build failed

```
Type error: Property 'X' does not exist on type 'Y'
```

**Giải pháp**:
- Kiểm tra TypeScript types trong `src/lib/types.ts`
- Chạy `npx tsc --noEmit` để xem chi tiết lỗi

#### 4. Port 3000 đã được sử dụng

```
Error: Port 3000 is already in use
```

**Giải pháp**:
```bash
# Tìm process đang dùng port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # macOS/Linux

# Kill process hoặc dùng port khác
PORT=3001 npm run dev
```

### Debug Mode

Bật debug mode trong Next.js:

```bash
# Windows
set NODE_OPTIONS='--inspect' && npm run dev

# macOS/Linux
NODE_OPTIONS='--inspect' npm run dev
```

Sau đó mở Chrome DevTools tại `chrome://inspect`

---

## 📝 Ghi Chú Quan Trọng

### 1. "use client" Directive

Các component sử dụng React hooks hoặc browser APIs cần có `"use client"` ở đầu file:

```typescript
"use client";
import { useState } from 'react';
```

### 2. Dynamic Routes

- Sử dụng folder `[id]` cho dynamic routes
- Truy cập params qua props: `params.id`

### 3. Image Optimization

Nên dùng `next/image` thay vì `<img>`:

```typescript
import Image from 'next/image';

<Image 
  src="/path/to/image.jpg" 
  alt="Description"
  width={500}
  height={300}
/>
```

### 4. Metadata & SEO

Thêm metadata cho từng page:

```typescript
export const metadata = {
  title: 'Tên trang',
  description: 'Mô tả trang',
};
```

---

## 🆘 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra console log trong browser (F12)
2. Kiểm tra terminal output
3. Xem Next.js documentation: https://nextjs.org/docs
4. Tham khảo walkthrough.md trong thư mục artifacts

---

## 📄 License

All rights reserved © 2024 Minh Thư Handmade
