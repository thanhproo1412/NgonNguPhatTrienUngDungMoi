// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ✅ Giả lập thông tin đăng nhập hợp lệ
    const mockEmail = 'admin123@yopmail.com';
    const mockPassword = 'admin123';

    if (email !== mockEmail || password !== mockPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // ✅ Giả lập thông tin user
    const userData = {
      name: 'Justina Clark',
      role: 'Admin',
      avatar:
        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?...',
    };

    // ✅ Tạo token JWT
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({
      success: true,
      token,
      user: userData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
