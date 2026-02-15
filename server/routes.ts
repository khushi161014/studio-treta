import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // Products Routes
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // Protected Admin Routes
  app.post(api.products.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.products.create.input.parse(req.body);
      const product = await storage.createProduct(input);
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.products.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.products.update.input.parse(req.body);
      const product = await storage.updateProduct(Number(req.params.id), input);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.products.delete.path, isAuthenticated, async (req, res) => {
    await storage.deleteProduct(Number(req.params.id));
    res.status(204).send();
  });

  // Orders
  app.post(api.orders.create.path, async (req, res) => {
    try {
        const input = api.orders.create.input.parse(req.body);
        const order = await storage.createOrder(input);
        res.status(201).json(order);
    } catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        throw err;
    }
  });

  app.get(api.orders.list.path, isAuthenticated, async (req, res) => {
      const orders = await storage.getOrders();
      res.json(orders);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
    const existing = await storage.getProducts();
    if (existing.length === 0) {
        const products = [
            {
                name: "Structured Linen Blazer",
                description: "A tailored blazer made from 100% organic linen. Features sharp shoulders and a relaxed fit, embodying the balance of structure and fluidity.",
                price: 18900, // $189.00
                imageUrl: "/images/img_3_1769605774163.png",
                category: "Outerwear",
                stock: 10,
                isFeatured: true
            },
            {
                name: "Flowing Silk Tunic",
                description: "Soft, breathable silk tunic that drapes elegantly. Perfect for everyday wear or layering.",
                price: 12500, // $125.00
                imageUrl: "/images/img_2_1769605774160.png",
                category: "Tops",
                stock: 15,
                isFeatured: true
            },
            {
                name: "Wide Leg Pleated Trousers",
                description: "High-waisted trousers with deep pleats for movement and comfort. A staple piece for any wardrobe.",
                price: 14500, // $145.00
                imageUrl: "/images/img_4_1769605774165.png",
                category: "Bottoms",
                stock: 12,
                isFeatured: true
            },
             {
                name: "Handwoven Scarf",
                description: "Artisanal scarf featuring intricate weave patterns. Adds a touch of texture to any outfit.",
                price: 6500, // $65.00
                imageUrl: "/images/img_1_1769605774157.png",
                category: "Accessories",
                stock: 20,
                isFeatured: false
            },
            {
                name: "Minimalist Trench Coat",
                description: "Classic trench coat reimagined with clean lines and minimal detailing. Water-resistant and durable.",
                price: 24500, // $245.00
                imageUrl: "/images/img_5_1769605774167.png",
                category: "Outerwear",
                stock: 8,
                isFeatured: true
            }
        ];

        for (const p of products) {
            await storage.createProduct(p);
        }
        console.log("Seeded database with products");
    }
}
