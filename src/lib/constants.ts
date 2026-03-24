
import { Product, BlogPost } from '@/lib/types';

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

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Đầm Linen Thêu Tay',
    price: 850000,
    originalPrice: 1250000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1000&auto=format&fit=crop',
    description: 'Chiếc đầm linen thoáng mát với họa tiết hoa nhí thêu tay tỉ mỉ. Phù hợp cho những ngày hè nhẹ nhàng.',
    details: ['Chất liệu: 100% Linen tự nhiên', 'Size: S, M, L', 'Màu sắc: Kem, Be', 'Giặt tay hoặc giặt máy chế độ nhẹ'],
    colors: ['Cream', 'Beige'],
    variant1: ['Kem', 'Be'],
    variant2: ['S', 'M', 'L'],
    rating: 4.9,
    soldCount: 156
  },
  {
    id: '2',
    name: 'Túi Tote Vải Canvas Mộc',
    price: 250000,
    originalPrice: 320000,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    description: 'Túi tote canvas dày dặn, bền bỉ, thích hợp đi học, đi làm hoặc dạo phố. Thiết kế tối giản.',
    details: ['Kích thước: 35x40cm', 'Có ngăn nhỏ bên trong', 'Quai đeo chắc chắn', 'Vẽ tay họa tiết lá cây'],
    colors: ['Beige'],
    variant1: ['Mộc', 'Trắng'],
    variant2: ['Tiêu chuẩn'],
    rating: 4.8,
    soldCount: 342
  },
  {
    id: '3',
    name: 'Khuyên Tai Gốm Sứ',
    price: 120000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=1000&auto=format&fit=crop',
    description: 'Khuyên tai làm từ gốm sứ nung nhiệt độ cao, tráng men bóng. Mỗi cặp là độc bản.',
    details: ['Chất liệu: Gốm, chốt bạc 925', 'Trọng lượng: Siêu nhẹ', 'Màu men: Xanh ngọc', 'Sản xuất thủ công'],
    colors: ['Green', 'Blue'],
    variant1: ['Xanh ngọc', 'Xanh lam', 'Trắng men'],
    variant2: ['Free size'],
    rating: 4.7,
    soldCount: 89
  },
  {
    id: '4',
    name: 'Áo Khoác Kimono Voan',
    price: 650000,
    originalPrice: 780000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1617019114583-affb43d14350?q=80&w=1000&auto=format&fit=crop',
    description: 'Áo khoác dáng Kimono cách điệu, chất liệu voan tơ mềm mại, bay bổng.',
    details: ['Chất liệu: Voan tơ', 'Dáng rộng thoải mái', 'Họa tiết nhuộm tie-dye thủ công', 'Phù hợp khoác ngoài váy dây'],
    colors: ['White', 'Blue'],
    variant1: ['Trắng loang', 'Xanh mây'],
    variant2: ['S/M', 'L/XL'],
    rating: 5.0,
    soldCount: 42
  },
  {
    id: '5',
    name: 'Váy Yếm Đũi Dáng Dài',
    price: 480000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
    description: 'Váy yếm chất đũi mềm, dáng suông rộng rãi che khuyết điểm tốt.',
    details: ['Chất liệu: Đũi lụa', 'Màu sắc: Nâu đất, Xanh rêu', 'Độ dài: 110cm'],
    colors: ['Brown', 'Green'],
    variant1: ['Nâu đất', 'Xanh rêu'],
    variant2: ['S', 'M', 'L'],
    rating: 4.6,
    soldCount: 215
  },
  {
    id: '6',
    name: 'Mũ Cói Vành Rộng',
    price: 180000,
    originalPrice: 220000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop',
    description: 'Mũ cói đan tay với dải ruy băng lụa xinh xắn.',
    details: ['Chất liệu: Cói tự nhiên', 'Vành mũ: 10cm', 'Có dây điều chỉnh size'],
    colors: ['Beige'],
    variant1: ['Cói vàng', 'Cói trắng'],
    variant2: ['Free size'],
    rating: 4.8,
    soldCount: 560
  },
  {
    id: '7',
    name: 'Áo Sơ Mi Linen Cổ Tàu',
    price: 420000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
    description: 'Áo sơ mi dáng cơ bản, cổ tàu thanh lịch, chất liệu linen bột cực mát.',
    details: ['Chất liệu: Linen bột', 'Cúc áo: Gỗ tự nhiên', 'Form: Regular fit'],
    colors: ['White', 'Blue'],
    variant1: ['Trắng', 'Xanh pastel', 'Xám'],
    variant2: ['M', 'L', 'XL'],
    rating: 4.9,
    soldCount: 128
  },
  {
    id: '8',
    name: 'Túi Xách Lục Bình Đan',
    price: 320000,
    originalPrice: 450000,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
    description: 'Túi xách tay làm từ sợi lục bình phơi khô, lót vải cotton bên trong.',
    details: ['Chất liệu: Lục bình', 'Quai cầm: Mây', 'Lót: Vải thô nhắm'],
    colors: ['Brown'],
    variant1: ['Tự nhiên'],
    variant2: ['S', 'M'],
    rating: 4.7,
    soldCount: 75
  },
  {
    id: '9',
    name: 'Vòng Tay Kết Hạt Gỗ',
    price: 85000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop',
    description: 'Vòng tay handmade từ hạt gỗ đàn hương và đá tự nhiên.',
    details: ['Hạt gỗ: 8mm', 'Dây thun co giãn', 'Mùi thơm nhẹ'],
    colors: ['Brown'],
    variant1: ['Gỗ mun', 'Gỗ hương'],
    variant2: ['Dây co giãn'],
    rating: 4.5,
    soldCount: 912
  },
  {
    id: '10',
    name: 'Quần Culottes Linen',
    price: 450000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1000&auto=format&fit=crop',
    description: 'Quần ống rộng lưng thun thoải mái, phù hợp mặc hằng ngày.',
    details: ['Chất liệu: Linen premium', 'Cạp cao tôn dáng', 'Có 2 túi sườn'],
    colors: ['Cream', 'Brown'],
    variant1: ['Kem', 'Nâu', 'Đen'],
    variant2: ['S', 'M', 'L'],
    rating: 4.8,
    soldCount: 164
  },
  {
    id: '11',
    name: 'Khăn Turban Tơ Tằm',
    price: 150000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop',
    description: 'Khăn lụa tơ tằm mềm mại, họa tiết vẽ tay thủ công.',
    details: ['Chất liệu: 100% Tơ tằm', 'Kích thước: 50x50cm', 'Nhuộm màu tự nhiên'],
    colors: ['Blue', 'Green'],
    variant1: ['Hoa nhí xanh', 'Lá mùa thu'],
    variant2: ['50x50cm'],
    rating: 4.9,
    soldCount: 45
  },
  {
    id: '12',
    name: 'Chân Váy Xòe Đũi',
    price: 390000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    description: 'Chân váy xòe vintage, cạp cao, có lót trong êm ái.',
    details: ['Chất liệu: Đũi nhăn', 'Độ dài: 75cm', 'Vòng xòe rộng'],
    colors: ['White', 'Beige'],
    variant1: ['Trắng tinh khôi', 'Be sữa'],
    variant2: ['S', 'M'],
    rating: 4.7,
    soldCount: 82
  },
  {
    id: '13',
    name: 'Áo Len Móc Yếm Hở Lưng',
    price: 350000,
    originalPrice: 450000,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1000&auto=format&fit=crop',
    description: 'Mẫu áo bra len móc thủ công với thiết kế yếm hở lưng quyến rũ. Chất len mềm mại, thoáng mát.',
    details: ['Chất liệu: Len Milk Cotton loại 1', 'Kiểu dáng: Bra yếm', 'Sản phẩm đan móc 100% thủ công'],
    colors: ['Beige', 'White', 'Brown'],
    variant1: ['Be', 'Trắng', 'Nâu'],
    variant2: ['S', 'M', 'L'],
    htmlDescription: `<div class="container details_description"><div class="details_description_title font-bold text-2xl mb-4 border-b-2 border-primary inline-block pb-1">MÔ TẢ SẢN PHẨM</div><p>Sản phẩm len móc thủ công từ Minh Thư Handmade mang lại vẻ đẹp độc bản cho bạn.</p></div>`,
    rating: 5.0,
    soldCount: 31
  },
  {
    id: '14',
    name: 'Ví Cầm Tay Thêu Hoa',
    price: 210000,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?q=80&w=1000&auto=format&fit=crop',
    description: 'Ví cầm tay nhỏ gọn, thêu họa tiết hoa cúc họa mi sắc sảo.',
    details: ['Kích thước: 15x10cm', 'Vải: Canvas thô', 'Khóa kéo YKK bền bỉ'],
    colors: ['White'],
    variant1: ['Trắng thêu hoa', 'Đen thêu hoa'],
    variant2: ['Mini'],
    rating: 4.8,
    soldCount: 112
  },
  {
    id: '15',
    name: 'Băng Đô Tóc Len Móc',
    price: 65000,
    originalPrice: 95000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1576185056158-72b226e64936?q=80&w=1000&auto=format&fit=crop',
    description: 'Băng đô cài tóc nhẹ nhàng cho nàng thơ.',
    details: ['Chất liệu: Len cotton', 'Màu sắc vintage', 'Đan tay hoàn toàn'],
    colors: ['Cream', 'Green'],
    variant1: ['Kem đào', 'Xanh bơ'],
    variant2: ['Free size'],
    rating: 4.9,
    soldCount: 289
  }
];


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
