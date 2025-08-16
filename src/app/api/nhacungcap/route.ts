import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import sql from 'mssql';

interface Supplier {
  id?: number;
  mancc: string;
  tenncc: string;
  diachi?: string;
  sdt?: string;
  mail?: string;
  ghichu?: string;
}

function bindParams(request: sql.Request, data: Supplier) {
  request.input('mancc', sql.NVarChar, data.mancc);
  request.input('tenncc', sql.NVarChar, data.tenncc);
  request.input('diachi', sql.NVarChar, data.diachi || null);
  request.input('sdt', sql.NVarChar, data.sdt || null);
  request.input('mail', sql.NVarChar, data.mail || null);
  request.input('ghichu', sql.NVarChar, data.ghichu || null);
}

export async function GET() {
  try {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM nhacungcap ORDER BY id DESC');
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Cannot fetch suppliers', detail: (error as any).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data: Supplier = await req.json();
    if (!data.mancc || !data.tenncc) {
      return NextResponse.json({ error: 'mancc và tenncc là bắt buộc' }, { status: 400 });
    }

    const conn = await getConnection();
    const request = new sql.Request(conn);
    bindParams(request, data);

    // Thêm và trả về id mới
    const result = await request.query(`
      INSERT INTO nhacungcap (mancc, tenncc, diachi, sdt, mail, ghichu)
      OUTPUT INSERTED.*
      VALUES (@mancc, @tenncc, @diachi, @sdt, @mail, @ghichu)
    `);

    return NextResponse.json({ message: 'Thêm thành công', supplier: result.recordset[0] });
  } catch (error: any) {
    return NextResponse.json({ error: 'Cannot add supplier', detail: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data: Supplier = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: 'Thiếu id' }, { status: 400 });
    }

    const conn = await getConnection();
    const request = new sql.Request(conn);
    bindParams(request, data);
    request.input('id', sql.Int, data.id);

    const result = await request.query(`
      UPDATE nhacungcap
      SET mancc=@mancc, tenncc=@tenncc, diachi=@diachi, sdt=@sdt, mail=@mail, ghichu=@ghichu
      OUTPUT INSERTED.*
      WHERE id=@id
    `);

    if (result.recordset.length === 0)
      return NextResponse.json({ error: 'Không tìm thấy nhà cung cấp' }, { status: 404 });

    return NextResponse.json({ message: 'Cập nhật thành công', supplier: result.recordset[0] });
  } catch (error: any) {
    return NextResponse.json({ error: 'Cannot update supplier', detail: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu id' }, { status: 400 });

    const conn = await getConnection();
    const request = new sql.Request(conn);
    request.input('id', sql.Int, Number(id));

    const result = await request.query(`
      DELETE FROM nhacungcap
      OUTPUT DELETED.*
      WHERE id=@id
    `);

    if (result.recordset.length === 0)
      return NextResponse.json({ error: 'Không tìm thấy nhà cung cấp' }, { status: 404 });

    return NextResponse.json({ message: 'Xóa thành công', supplier: result.recordset[0] });
  } catch (error: any) {
    return NextResponse.json({ error: 'Cannot delete supplier', detail: error.message }, { status: 500 });
  }
}
