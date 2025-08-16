// src/app/api/auth/logIn/route.ts
import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    console.log('[LOGIN] Payload:', { email, password })

    const pool = await getConnection()

    // 🔹 Lấy user từ DB
    const result = await pool
      .request()
      .input('taikhoan', email)
      .query('SELECT TOP 1 * FROM dangnhap WHERE taikhoan = @taikhoan')

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 })
    }

    const userFromDB = result.recordset[0]

    // 🔹 So sánh password hash
    // 🔹 So sánh password
    let isMatch = false;
    if (userFromDB.taikhoan.toLowerCase() === 'admin') {
      // 🔹 Nếu là admin, so sánh trực tiếp
      isMatch = password === userFromDB.pass;
    } else {
      // 🔹 Người dùng khác: so sánh hash
      isMatch = await bcrypt.compare(password, userFromDB.pass);
    }

    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    // 🔹 Tạo JWT
    const userData = {
      name: userFromDB.taikhoan,
      role: userFromDB.quyen,
      avatar: 'https://i.pinimg.com/originals/dc/9d/bc/dc9dbc07f3b08aea6381cd5e8eb0dd5b.png'
    }

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' })

    const res = NextResponse.json({ success: true, message: 'Login successful', user: userData, token })
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    })

    return res

  } catch (err: any) {
    console.error('[LOGIN] Error:', err.message)
    return NextResponse.json({ success: false, message: 'Server error: ' + err.message }, { status: 500 })
  }
}