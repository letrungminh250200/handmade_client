import { NextRequest, NextResponse } from 'next/server';
import { serverAddressApi } from '@/services/server-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const wards = await serverAddressApi.getWards(code);
    return NextResponse.json({ data: wards });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Lỗi lấy danh sách huyện';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
