import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  schema: './db/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
