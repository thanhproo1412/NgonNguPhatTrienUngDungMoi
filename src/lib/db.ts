import sql, { ConnectionPool, config as SQLConfig } from 'mssql';

const config: SQLConfig = {
  server: process.env.DB_SERVER || '',
  database: process.env.DB_DATABASE || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true,
  },
  authentication: {
    type: 'ntlm',
    options: {
      domain: process.env.DB_DOMAIN || '',
      userName: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
    },
  },
};

let pool: ConnectionPool | null = null;

export async function getConnection(): Promise<ConnectionPool> {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log('✅ Connected to MSSQL');
    } catch (err) {
      console.error('❌ Database connection failed:', err);
      throw err;
    }
  }
  return pool;
}
export async function closeConnection(): Promise<void> {
  if (pool) {
    try {
      await pool.close();
      console.log('✅ Connection closed');
    } catch (err) {
      console.error('❌ Error closing connection:', err);
    } finally {
      pool = null;
    }
  }
}