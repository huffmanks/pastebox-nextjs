import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
  originalName: text("original_name").notNull(),
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

export type BoxInsert = InferInsertModel<typeof boxes>;
export type BoxSelect = InferSelectModel<typeof boxes>;

export type FileInsert = InferInsertModel<typeof files>;
export type FileSelect = InferSelectModel<typeof files>;
