import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import sql from "mssql";

export async function POST(req: Request) {
  try {
    const { productId, quantity, type } = await req.json();

    // Kiểm tra dữ liệu đầu vào
    if (!productId || !quantity || !type) {
      return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
    }

    const conn = await getConnection();
    const request = new sql.Request(conn);

    // Input đúng kiểu dữ liệu
    request.input("id", sql.NVarChar, productId);  // mahang là nvarchar
    request.input("quantity", sql.Int, quantity); // quantity là int

    // Thực hiện tăng hoặc giảm tồn kho
    if (type === "IN") {
      await request.query(`
        UPDATE tonkho 
        SET tonkho = ISNULL(tonkho,0) + @quantity 
        WHERE mahang = @id
      `);
    } else if (type === "OUT") {
      await request.query(`
        UPDATE tonkho 
        SET tonkho = CASE WHEN ISNULL(tonkho,0)-@quantity < 0 THEN 0 ELSE tonkho-@quantity END 
        WHERE mahang = @id
      `);
    } else {
      return NextResponse.json({ error: "Type không hợp lệ" }, { status: 400 });
    }

    return NextResponse.json({ message: "Cập nhật tồn kho thành công" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
