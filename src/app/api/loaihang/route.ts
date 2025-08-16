import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import sql from 'mssql';

export async function GET() {
  const conn = await getConnection();
  const result = await conn.query('SELECT * FROM loaihang');
  return NextResponse.json(result.recordset);
}

export async function POST(req: Request) {
  const { tenlh } = await req.json();
  if (!tenlh) return NextResponse.json({ error: 'Thiếu tên loại hàng' }, { status: 400 });

  const conn = await getConnection();
  const request = new sql.Request(conn);
  request.input('tenlh', sql.NVarChar, tenlh);
  await request.query(`INSERT INTO loaihang (tenlh) VALUES (@tenlh)`);

  // Lấy malh mới
  const res = await conn.query(`SELECT TOP 1 * FROM loaihang ORDER BY malh DESC`);
  return NextResponse.json(res.recordset[0]);
}
