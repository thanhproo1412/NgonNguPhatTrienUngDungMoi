// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    const pool = await getConnection();

    // Kiểm tra email đã tồn tại chưa
    const checkUser = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (checkUser.recordset.length > 0) {
      return NextResponse.json({ status: 'error', message: 'Email already exists' }, { status: 400 });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user mới
    await pool
      .request()
      .input('name', name)
      .input('email', email)
      .input('password', hashedPassword)
      .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)');

    return NextResponse.json({ status: 'success', message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', message: 'Something went wrong' }, { status: 500 });
  }
}
