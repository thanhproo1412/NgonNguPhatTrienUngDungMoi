import sql from "mssql";

// Cấu hình kết nối SQL Server
const config: sql.config = {
  user: process.env.DB_USER || "nextjs",
  password: process.env.DB_PASSWORD || "123456",
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_DATABASE || "QLVT",
  options: {
    encrypt: false, // Đặt true nếu dùng Azure
    trustServerCertificate: true, // Bỏ qua SSL cho local
  },
  port: parseInt(process.env.DB_PORT || "1433"),
};

// Dùng connection pool để tránh lỗi "too many connections"
let pool: sql.ConnectionPool | null = null;

export async function getConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log("✅ SQL Server connected");
    }
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
}
