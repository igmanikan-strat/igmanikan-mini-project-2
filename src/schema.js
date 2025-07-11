import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: varchar('summary').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  
})

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  blogId: integer('blog_id').notNull(), // Corrected
  name: varchar('name', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});