// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    // Ví dụ hardcode: nếu email đã tồn tại thì báo lỗi
    if (email === 'test@example.com') {
      return NextResponse.json({ status: 'error', message: 'Email already exists' }, { status: 400 });
    }

    // Giả lập tạo user thành công
    const fakeUser = {
      id: Date.now(),
      name,
      email,
      token: 'fake-jwt-token-' + Date.now(),
    };

    return NextResponse.json({ status: 'success', data: fakeUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Something went wrong' }, { status: 500 });
  }
}
