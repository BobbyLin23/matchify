import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const resume = pgTable('resume', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('name').notNull(),
  userId: text('user_id').notNull(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  language: text('language').notNull().default('zh_CN'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
})
