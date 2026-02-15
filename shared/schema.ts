import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Export auth models
export * from "./models/auth";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in cents
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").notNull().default(0),
  isFeatured: boolean("is_featured").default(false),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id"), // Optional: link to registered user if available
  status: text("status").notNull().default("pending"), // pending, completed, cancelled
  total: integer("total").notNull(),
  customerEmail: text("customer_email"),
  customerName: text("customer_name"),
  createdAt: timestamp("created_at").defaultNow(),
  items: jsonb("items").notNull(), // Array of { productId, quantity, price } snapshot
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
