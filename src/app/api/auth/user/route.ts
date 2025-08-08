// src/app/api/auth/user/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123' // lưu trong env

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    // Xác thực token
    const decoded = jwt.verify(token, JWT_SECRET) as { name: string; role: string; avatar?: string }

    // Có thể gọi DB để lấy user từ decoded.id nếu cần
    return NextResponse.json({
      name: decoded.name,
      role: decoded.role,
      avatar: decoded.avatar || 'https://via.placeholder.com/150'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}
