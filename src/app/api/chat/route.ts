import { GoogleGenAI } from "@google/genai";
import { serverProductApi } from '@/services/server-api';
import { NextRequest, NextResponse } from 'next/server';

// Cache danh sách sản phẩm để tránh gọi API mỗi request
let cachedProductList: string | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 phút

async function getProductListForAI(): Promise<string> {
  const now = Date.now();
  if (cachedProductList && (now - cacheTimestamp) < CACHE_TTL) {
    return cachedProductList;
  }
  try {
    const data = await serverProductApi.getAll({ limit: 50 });

    cachedProductList = JSON.stringify(data.items.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      colors: p.colors,
      slug: p.slug,
    })));
    cacheTimestamp = now;
    return cachedProductList;
  } catch {
    return '[]';
  }
}

function buildSystemInstruction(productList: string): string {
  return `
Bạn là "Minh Thư" - một trợ lý ảo thời trang thông minh, thân thiện của cửa hàng "Minh Thư Handmade".
Phong cách của cửa hàng: Handmade, mộc mạc, tự nhiên (Linen, đũi, gốm, cói), Boho, Vintage, Tối giản.

Nhiệm vụ của bạn:
1. Tư vấn phối đồ cho khách hàng dựa trên các sản phẩm CÓ SẴN trong danh sách dưới đây.
2. Trả lời các câu hỏi về chất liệu, bảo quản (Linen giặt tay, gốm tránh va đập...).
3. Luôn giữ thái độ nhẹ nhàng, lịch sự, dùng từ ngữ bay bổng một chút phù hợp với vibe của tiệm.
4. Nếu khách hỏi sản phẩm không có, hãy khéo léo gợi ý sản phẩm tương tự có trong danh sách.

DANH SÁCH SẢN PHẨM CỦA TIỆM:
${productList}

Lưu ý:
- Trả lời ngắn gọn, súc tích (dưới 150 từ).
- Định dạng câu trả lời dễ đọc (có thể dùng bullet points).
- Khi gợi ý sản phẩm, LUÔN tạo link bằng cú pháp markdown: [Tên sản phẩm](/slug-của-sản-phẩm). Slug lấy từ trường "slug" trong danh sách sản phẩm.
- Luôn khuyến khích khách click vào link để xem chi tiết và thêm vào giỏ hàng.
`;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log(apiKey);
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const productList = await getProductListForAI();

    const contents = [
      ...(history || []).map((h: { role: string; text: string }) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents,
      config: {
        systemInstruction: buildSystemInstruction(productList),
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { text: "Xin lỗi, Minh Thư đang bị lạc trôi một chút. Bạn thử lại sau nhé!" },
      { status: 200 }
    );
  }
}
