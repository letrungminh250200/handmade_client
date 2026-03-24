import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '@/lib/constants';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
Bạn là "Minh Thư" - một trợ lý ảo thời trang thông minh, thân thiện của cửa hàng "Minh Thư Handmade".
Phong cách của cửa hàng: Handmade, mộc mạc, tự nhiên (Linen, đũi, gốm, cói), Boho, Vintage, Tối giản.

Nhiệm vụ của bạn:
1. Tư vấn phối đồ cho khách hàng dựa trên các sản phẩm CÓ SẴN trong danh sách dưới đây.
2. Trả lời các câu hỏi về chất liệu, bảo quản (Linen giặt tay, gốm tránh va đập...).
3. Luôn giữ thái độ nhẹ nhàng, lịch sự, dùng từ ngữ bay bổng một chút phù hợp với vibe của tiệm.
4. Nếu khách hỏi sản phẩm không có, hãy khéo léo gợi ý sản phẩm tương tự có trong danh sách.

DANH SÁCH SẢN PHẨM CỦA TIỆM:
${JSON.stringify(PRODUCTS.map(p => ({ 
  id: p.id, 
  name: p.name, 
  price: p.price, 
  category: p.category, 
  description: p.description,
  colors: p.colors // Include colors for AI context
})))}

Lưu ý:
- Trả lời ngắn gọn, súc tích (dưới 150 từ).
- Định dạng câu trả lời dễ đọc (có thể dùng bullet points).
- Luôn khuyến khích khách "thêm vào giỏ" những món đồ đẹp.
`;

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[]) => {
  try {
    const contents = [
      ...history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, Minh Thư đang bị lạc trôi một chút. Bạn thử lại sau nhé!";
  }
};
