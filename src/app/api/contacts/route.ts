import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:5002';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/client/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || 'Gửi liên hệ thất bại' },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau.' },
      { status: 500 },
    );
  }
}
