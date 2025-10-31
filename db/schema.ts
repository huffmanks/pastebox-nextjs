import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export const boxes = pgTable("boxes", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  password: text("password"),
  isProtected: boolean("is_protected").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  boxId: uuid("box_id")
    .notNull()
    .references(() => boxes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).defaultNow().notNull(),
});

export const boxesRelations = relations(boxes, ({ many }) => ({
  files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
  box: one(boxes, {
    fields: [files.boxId],
    references: [boxes.id],
  }),
}));

const _boxInsertSchema = createInsertSchema(boxes);
const _boxSelectSchema = createSelectSchema(boxes);
const _fileInsertSchema = createInsertSchema(files);
const _fileSelectSchema = createSelectSchema(files);

export type BoxInsert = z.infer<typeof _boxInsertSchema>;
export type BoxSelect = z.infer<typeof _boxSelectSchema>;
export type FileInsert = z.infer<typeof _fileInsertSchema>;
export type FileSelect = z.infer<typeof _fileSelectSchema>;
