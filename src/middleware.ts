import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Chưa đăng nhập → về trang login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      // Nếu không phải admin → chuyển về trang 403
      return NextResponse.redirect(new URL('/403', req.url));
    }

    // Nếu đúng role, cho phép tiếp tục
    return NextResponse.next();

  } catch (err) {
    console.error('[MIDDLEWARE] Invalid token:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Áp dụng middleware cho các route admin
export const config = {
  matcher: ['/dashboard/admin/:path*'],
};
