// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import sql from 'mssql'

const config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  options: { encrypt: true, trustServerCertificate: true },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const malh = searchParams.get('malh') || ''
  const minPrice = parseInt(searchParams.get('minPrice') || '0')
  const maxPrice = parseInt(searchParams.get('maxPrice') || '1000000000')
  const skip = (page - 1) * limit

  let pool: sql.ConnectionPool | undefined

  try {
    pool = await sql.connect(config)

    let query = `
      SELECT TOP (@limit) *
      FROM hanghoa
      WHERE price BETWEEN @minPrice AND @maxPrice
    `
    if (malh) query += ` AND malh=@malh`

    query += `
      AND mahang NOT IN (
        SELECT TOP (@skip) mahang
        FROM hanghoa
        WHERE price BETWEEN @minPrice AND @maxPrice ${malh ? 'AND malh=@malh' : ''}
        ORDER BY mahang
      )
      ORDER BY mahang
    `

    const request = pool.request()
      .input('limit', sql.Int, limit)
      .input('skip', sql.Int, skip)
      .input('minPrice', sql.Int, minPrice)
      .input('maxPrice', sql.Int, maxPrice)

    if (malh) request.input('malh', sql.NVarChar, malh)

    const result = await request.query(query)
    return NextResponse.json({ success: true, products: result.recordset })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  } finally {
    if (pool) await pool.close()
  }
}
