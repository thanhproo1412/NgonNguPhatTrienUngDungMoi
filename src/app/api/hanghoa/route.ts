import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import sql from "mssql";

export async function GET() {
  try {
    const conn = await getConnection();
    const result = await conn.request().query(`
      SELECT h.*, ISNULL(t.tonkho,0) AS tonkho
      FROM hanghoa h
      LEFT JOIN tonkho t ON h.mahang = t.mahang
    `);
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.mahang || !data.tenhang)
      return NextResponse.json({ error: "Thiếu mã hoặc tên hàng" }, { status: 400 });

    const conn = await getConnection();

    // Thêm sản phẩm
    const request = new sql.Request(conn);
    request.input("mahang", sql.NVarChar, data.mahang);
    request.input("tenhang", sql.NVarChar, data.tenhang);
    request.input("malh", sql.NVarChar, data.malh || null);
    request.input("dvt", sql.NVarChar, data.dvt || null);
    request.input("thue", sql.Int, data.thue || 0);
    request.input("price", sql.Float, data.price || 0);
    request.input("ghichu", sql.NVarChar, data.ghichu || null);
    request.input("imageURL", sql.NVarChar, data.imageURL || null);
    request.input("isNew", sql.Bit, data.isNew ? 1 : 0);

    await request.query(`
      INSERT INTO hanghoa (mahang, tenhang, malh, dvt, thue, price, ghichu, imageURL, isNew)
      VALUES (@mahang, @tenhang, @malh, @dvt, @thue, @price, @ghichu, @imageURL, @isNew)
    `);

    // Khởi tạo tồn kho = 0
    const stockReq = new sql.Request(conn);
    stockReq.input("mahang", sql.NVarChar, data.mahang);
    await stockReq.query(`INSERT INTO tonkho (mahang, tonkho) VALUES (@mahang, 0)`);

    return NextResponse.json({ message: "Thêm sản phẩm thành công" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Thiếu id" }, { status: 400 });
    if (!data.tenhang) return NextResponse.json({ error: "Thiếu tên hàng" }, { status: 400 });
    if (!data.malh) return NextResponse.json({ error: "Thiếu loại hàng" }, { status: 400 });

    const conn = await getConnection();
    const request = conn.request();
    request.input("id", sql.Int, data.id);
    request.input("tenhang", sql.NVarChar, data.tenhang);
    request.input("malh", sql.NVarChar, data.malh);
    request.input("dvt", sql.NVarChar, data.dvt || null);
    request.input("thue", sql.Int, data.thue || 0);
    request.input("price", sql.Float, data.price || 0);
    request.input("ghichu", sql.NVarChar, data.ghichu || null);
    request.input("imageURL", sql.NVarChar, data.imageURL || null);
    request.input("isNew", sql.Bit, data.isNew ? 1 : 0);

    const result = await request.query(`
      UPDATE hanghoa
      SET tenhang=@tenhang, malh=@malh, dvt=@dvt, thue=@thue,
          price=@price, ghichu=@ghichu, imageURL=@imageURL, isNew=@isNew
      WHERE id=@id
    `);

    if (result.rowsAffected[0] === 0)
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });

    return NextResponse.json({ message: "Cập nhật sản phẩm thành công" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Thiếu id" }, { status: 400 });

    const conn = await getConnection();

    // Xóa tồn kho theo id
    await conn.request()
      .input("id", sql.Int, Number(id))
      .query(`DELETE t
              FROM tonkho t
              JOIN hanghoa h ON h.mahang = t.mahang
              WHERE h.id = @id`);

    // Xóa sản phẩm theo id
    const result = await conn.request()
      .input("id", sql.Int, Number(id))
      .query(`DELETE FROM hanghoa WHERE id=@id`);

    if (result.rowsAffected[0] === 0)
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });

    return NextResponse.json({ message: "Xóa sản phẩm và tồn kho thành công" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
