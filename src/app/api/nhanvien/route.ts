import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import sql from 'mssql';

// Bind params, bao gồm cả id
function bindParams(request: sql.Request, data: any) {
  request.input('id', sql.Int, data.id || null);
  request.input('manv', sql.NVarChar, data.manv || null);
  request.input('tennv', sql.NVarChar, data.tennv);
  request.input('mapb', sql.NVarChar, data.mapb || null);
  request.input('diachi', sql.NVarChar, data.diachi || null);
  request.input('sdt', sql.NVarChar, data.sdt || null);
  request.input('ghichu', sql.NVarChar, data.ghichu || null);
  request.input('email', sql.NVarChar, data.email || null);
  request.input('ngaysinh', sql.Date, data.ngaysinh || null);
  request.input('chucvu', sql.NVarChar, data.chucvu || null);
  request.input('trangthai', sql.Bit, data.trangthai ?? 1);
  request.input('ngayvao', sql.Date, data.ngayvao || null);
}

export async function GET() {
  try {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM nhanvien');
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Cannot fetch employees' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Kiểm tra field bắt buộc
    const requiredFields = [
      { name: 'tennv', label: 'Tên NV' },
      { name: 'mapb', label: 'Mã PB' }
    ];
    for (const field of requiredFields) {
      if (!data[field.name]) {
        return NextResponse.json(
          { error: `Thiếu thông tin`, detail: `${field.label} là bắt buộc` },
          { status: 400 }
        );
      }
    }

    const conn = await getConnection();
    const request = new sql.Request(conn);
    bindParams(request, data);

    // Nếu manv không có → tự sinh: NV + id sequence
    const insertQuery = !data.manv
      ? `
      INSERT INTO nhanvien (manv, tennv, mapb, diachi, sdt, ghichu, email, ngaysinh, chucvu, trangthai, ngayvao)
      OUTPUT INSERTED.id, INSERTED.manv
      VALUES ('NV' + CAST((SELECT ISNULL(MAX(id),0)+1 FROM nhanvien) AS NVARCHAR), 
              @tennv, @mapb, @diachi, @sdt, @ghichu, @email, @ngaysinh, @chucvu, @trangthai, @ngayvao)
      `
      : `
      INSERT INTO nhanvien (manv, tennv, mapb, diachi, sdt, ghichu, email, ngaysinh, chucvu, trangthai, ngayvao)
      OUTPUT INSERTED.id, INSERTED.manv
      VALUES (@manv, @tennv, @mapb, @diachi, @sdt, @ghichu, @email, @ngaysinh, @chucvu, @trangthai, @ngayvao)
      `;

    const result = await request.query(insertQuery);

    return NextResponse.json({ message: 'Employee added', employee: result.recordset[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Cannot add employee', detail: (error as any).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: 'Thiếu id nhân viên' }, { status: 400 });
    }
    const conn = await getConnection();
    const request = new sql.Request(conn);
    bindParams(request, data);

    const result = await request.query(`
      UPDATE nhanvien
      SET manv=@manv, tennv=@tennv, mapb=@mapb, diachi=@diachi, sdt=@sdt, ghichu=@ghichu,
          email=@email, ngaysinh=@ngaysinh, chucvu=@chucvu, trangthai=@trangthai, ngayvao=@ngayvao
      WHERE id=@id
    `);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json({ error: 'Không tìm thấy nhân viên' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Employee updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Cannot update employee', detail: (error as any).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Thiếu id nhân viên' }, { status: 400 });
    }
    const conn = await getConnection();
    const request = new sql.Request(conn);
    request.input('id', sql.Int, Number(id));

    const result = await request.query(`DELETE FROM nhanvien WHERE id=@id`);
    if (result.rowsAffected[0] === 0) {
      return NextResponse.json({ error: 'Không tìm thấy nhân viên' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Cannot delete employee', detail: (error as any).message }, { status: 500 });
  }
}
