import sql from "mssql";

const config: sql.config = {
  user: process.env.DB_USER || "nextjs",
  password: process.env.DB_PASSWORD || "123456",
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_DATABASE || "QLVT",
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  port: parseInt(process.env.DB_PORT || "1433"),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let globalWithPool = global as typeof globalThis & { _sqlPool?: sql.ConnectionPool };

export async function getConnection() {
  if (!globalWithPool._sqlPool) {
    globalWithPool._sqlPool = await sql.connect(config);
    console.log("SQL Server connected");
  } else if (!globalWithPool._sqlPool.connected) {
    console.log("SQL pool was closed, reconnecting...");
    await globalWithPool._sqlPool.close();
    globalWithPool._sqlPool = await sql.connect(config);
  }
  return globalWithPool._sqlPool;
}

async function closeConnection() {
  if (globalWithPool._sqlPool) {
    await globalWithPool._sqlPool.close();
    console.log("SQL Server connection closed");
  }
}

process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeConnection();
  process.exit(0);
});

export { sql };
