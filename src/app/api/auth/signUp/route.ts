// src/app/api/auth/signUp/route.ts
import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    console.log('[SIGNUP] Payload:', { name, email, password })

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    const pool = await getConnection()

    // Kiểm tra user đã tồn tại
    const checkUser = await pool
      .request()
      .input('taikhoan', email)
      .query('SELECT * FROM dangnhap WHERE taikhoan = @taikhoan')
    console.log('[SIGNUP] Check user:', checkUser.recordset)

    if (checkUser.recordset.length > 0) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('[SIGNUP] Hashed password:', hashedPassword)

    // Thêm user mới
    await pool
      .request()
      .input('taikhoan', email)
      .input('pass', hashedPassword)
      .input('quyen', 'user')
      .query('INSERT INTO dangnhap (taikhoan, pass, quyen) VALUES (@taikhoan, @pass, @quyen)')
    console.log('[SIGNUP] User inserted')

    const userData = { name, role: 'user', avatar: 'https://i.pinimg.com/originals/dc/9d/bc/dc9dbc07f3b08aea6381cd5e8eb0dd5b.png' }
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' })

    const res = NextResponse.json({ success: true, message: 'Signup successful', user: userData, token })
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    })

    return res

  } catch (err: any) {
    console.error('[SIGNUP] Error:', err.message)
    return NextResponse.json({ success: false, message: 'Server error: ' + err.message }, { status: 500 })
  }
}
