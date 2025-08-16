import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import sql from 'mssql';

// GET tất cả phòng ban
export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.query('SELECT mapb, tenpb, ghichu FROM phongban');
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST thêm phòng ban mới
export async function POST(req: Request) {
  try {
    const { mapb, tenpb, ghichu } = await req.json();

    if (!mapb || !tenpb) {
      return NextResponse.json({ error: 'Mã và tên phòng ban là bắt buộc' }, { status: 400 });
    }

    const pool = await getConnection();

    // Kiểm tra trùng mapb
    const exists = await pool
      .request()
      .input('mapb', sql.NVarChar, mapb)
      .query('SELECT mapb FROM phongban WHERE mapb=@mapb');

    if (exists.recordset.length > 0) {
      return NextResponse.json({ error: 'Mã phòng ban đã tồn tại' }, { status: 400 });
    }

    await pool
      .request()
      .input('mapb', sql.NVarChar, mapb)
      .input('tenpb', sql.NVarChar, tenpb)
      .input('ghichu', sql.NVarChar, ghichu || null)
      .query('INSERT INTO phongban (mapb, tenpb, ghichu) VALUES (@mapb, @tenpb, @ghichu)');

    return NextResponse.json({ message: 'Thêm phòng ban thành công' }, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
