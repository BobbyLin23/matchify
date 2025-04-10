import process from 'node:process'
import { drizzle } from 'drizzle-orm/neon-http'

export const db = drizzle(process.env.DATABASE_URL as string)
