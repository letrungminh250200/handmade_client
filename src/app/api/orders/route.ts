import { NextRequest, NextResponse } from 'next/server';
import { serverOrderApi } from '@/services/server-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, statusCode } = await serverOrderApi.create(body);
    return NextResponse.json({ data, statusCode }, { status: statusCode });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Lỗi tạo đơn hàng';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
