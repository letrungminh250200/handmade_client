
import { BlogPost } from '@/lib/types';

export const THEME_COLORS = {
  primary: '#e07a5f', // Màu cam đất chủ đạo (Terracotta)
  secondary: '#81b29a', // Màu xanh sage
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    800: '#292524',
    900: '#1c1917',
  }
};

// Products are now fetched from backend API via services/api.ts
// PRODUCTS array has been removed — use productApi.getAll() etc.

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Linen - "Hơi thở" của mùa hè nhiệt đới',
    excerpt: 'Tại sao Linen lại được mệnh danh là loại vải biết thở? Cùng Minh Thư tìm hiểu về nguồn gốc và đặc tính tuyệt vời của chất liệu này nhé.',
    content: [
      'Có bao giờ bạn tự hỏi, tại sao giữa cái nắng oi ả của tháng sáu, người ta lại khao khát được khoác lên mình một chiếc áo Linen (vải lanh) đến thế? Không phải ngẫu nhiên mà Linen được mệnh danh là "vải biết thở".',
      'Được dệt từ thân cây lanh tự nhiên, Linen mang trong mình sự thô mộc nhưng đầy tinh tế. Khác với cotton hay các loại vải tổng hợp, sợi lanh rỗng bên trong, cho phép không khí lưu thông dễ dàng. Đó là lý do khi mặc Linen, bạn luôn cảm thấy bề mặt da mình khô thoáng, mát lạnh.',
      'Dưới ánh mặt trời rực rỡ, chất vải Linen không chỉ bảo vệ làn da mà còn tạo nên một phong thái tự do, phóng khoáng. Đó không chỉ là quần áo, đó là một lối sống trân trọng thiên nhiên.'
    ],
    date: '15/03/2024',
    author: 'Minh Thư',
    category: 'Kiến Thức',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
    isFeatured: true,
    relatedProducts: ['1', '7']
  }
];
