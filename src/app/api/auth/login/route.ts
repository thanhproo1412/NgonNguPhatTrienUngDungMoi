import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getConnection } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // 🔹 Kết nối SQL Server
    const pool = await getConnection()

    // 🔹 Query kiểm tra tài khoản trong bảng dangnhap
    const result = await pool
      .request()
      .input('taikhoan', email)
      .input('pass', password)
      .query(
        'SELECT TOP 1 * FROM dangnhap WHERE taikhoan = @taikhoan AND pass = @pass'
      )

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 🔹 Lấy dữ liệu user từ DB
    const userFromDB = result.recordset[0]

    const userData = {
      name: userFromDB.taikhoan,
      role: userFromDB.quyen,
      avatar:
        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?...',
    }

    // 🔹 Tạo token JWT
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' })

    return NextResponse.json({
      success: true,
      token,
      user: userData,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
