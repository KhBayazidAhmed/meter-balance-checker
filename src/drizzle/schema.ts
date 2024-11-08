import { InferInsertModel } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

// Users Table Definition
export const UsersTable = pgTable("users", {
  id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(), // Auto-increment integer ID
  mobileNumber: t.varchar("mobile_number", { length: 11 }).notNull().unique(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
});

// Meters Table Definition
export const MetersTable = pgTable("meters", {
  id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(), // Auto-increment integer ID
  name: t.varchar("name").notNull(), // Meter name
  meterId: t.varchar("meter_id").notNull(), // Unique meter ID
  userId: t
    .integer("user_id")
    .notNull()
    .references(() => UsersTable.id), // Foreign key referencing UsersTable
});

export type UserInsert = InferInsertModel<typeof UsersTable>;
export type MeterInsert = InferInsertModel<typeof MetersTable>;
