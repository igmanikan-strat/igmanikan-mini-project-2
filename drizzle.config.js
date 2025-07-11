import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// ✅ Make sure this matches your env file name
config({ path: '.env.local' }); // or use `.env.local` if needed

export default defineConfig({
  schema: './src/schema.js',         // adjust if you're not using src/
  out: './drizzle/migrations',       // or wherever you want migrations
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,   // ✅ no "!" here since this is JS
  },
});
