import { db } from "./db";
import {
  products,
  orders,
  type InsertProduct,
  type Product,
  type InsertOrder,
  type Order
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { authStorage, type IAuthStorage } from "./replit_integrations/auth"; // Import auth storage

export interface IStorage extends IAuthStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
    // Auth methods (delegated or re-implemented if needed, but easier to use the imported one or mixin)
    // Since we need to implement IStorage which extends IAuthStorage, we can just proxy calls to authStorage
    // OR, better yet, we can't easily extend a const.
    // Let's implement the methods by calling the authStorage instance.

  async getUser(id: string) {
      return authStorage.getUser(id);
  }

  async upsertUser(user: any) {
      return authStorage.upsertUser(user);
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.id));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product> {
    const [updated] = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
}

export const storage = new DatabaseStorage();
