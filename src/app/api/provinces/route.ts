import { NextResponse } from 'next/server';
import { serverAddressApi } from '@/services/server-api';

export async function GET() {
  try {
    const provinces = await serverAddressApi.getProvinces();
    return NextResponse.json({ data: provinces });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Lỗi lấy danh sách tỉnh';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
