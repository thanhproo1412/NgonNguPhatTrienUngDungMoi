import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (token) {
        try {
            jwt.verify(token, JWT_SECRET)
            // Nếu token hợp lệ và đang truy cập login/signup → chuyển về trang chủ
            if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
                return NextResponse.redirect(new URL('/', req.url))
            }
        } catch (err) {
            // Token không hợp lệ → cho qua
        }
    }

    return NextResponse.next()
}

// Chỉ áp dụng cho login và signup
export const config = {
    matcher: ['/login', '/signup'],
}
