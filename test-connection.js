// test-connection.js
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log('✅ Connected! Result:', result);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

testConnection();
