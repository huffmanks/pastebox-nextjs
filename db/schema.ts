import { createId } from "@paralleldrive/cuid2";
import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const boxes = sqliteTable("boxes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  password: text("password"),
  isProtected: integer("is_protected", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const files = sqliteTable("files", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  boxId: text("box_id")
    .notNull()
    .references(() => boxes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  originalName: text("original_name").notNull(),
  type: text("type").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  uploadedAt: integer("uploaded_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
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

export type BoxInsert = InferInsertModel<typeof boxes>;
export type BoxSelect = InferSelectModel<typeof boxes>;

export type FileInsert = InferInsertModel<typeof files>;
export type FileSelect = InferSelectModel<typeof files>;
