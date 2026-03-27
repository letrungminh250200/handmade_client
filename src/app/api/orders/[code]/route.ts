import { NextRequest, NextResponse } from 'next/server';
import { serverOrderApi } from '@/services/server-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const data = await serverOrderApi.getByCode(code);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Không tìm thấy đơn hàng';
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
