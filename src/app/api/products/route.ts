import { NextRequest, NextResponse } from 'next/server';
import { serverProductApi } from '@/services/server-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || undefined;
    const categorySlug = searchParams.get('category_slug') || undefined;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;
    const skip = searchParams.get('skip') ? Number(searchParams.get('skip')) : undefined;
    const sort = (searchParams.get('sort') as 'price_asc' | 'price_desc' | 'newest') || undefined;

    const result = await serverProductApi.getAll({ q, categorySlug, limit, skip, sort });
    return NextResponse.json({ data: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Lỗi lấy danh sách sản phẩm';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
