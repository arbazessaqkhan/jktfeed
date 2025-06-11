import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertProductSchema, insertOrderSchema, insertCartSchema, insertShowcaseImageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Product Management Routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      
      // Create initial inventory entry
      await storage.createInventoryMovement({
        productId: product.id,
        movementType: "in",
        quantity: product.stockQuantity,
        reason: "Initial stock",
        referenceId: `initial-${product.id}`
      });
      
      res.json({ success: true, product });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid product data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create product" });
      }
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const updateData = req.body;
      
      // If stock quantity is being updated, create inventory movement
      if (updateData.stockQuantity !== undefined) {
        const currentProduct = await storage.getProduct(productId);
        if (currentProduct) {
          const quantityDiff = updateData.stockQuantity - currentProduct.stockQuantity;
          if (quantityDiff !== 0) {
            await storage.createInventoryMovement({
              productId: productId,
              movementType: quantityDiff > 0 ? "in" : "out",
              quantity: Math.abs(quantityDiff),
              reason: "Manual adjustment",
              referenceId: `adjustment-${Date.now()}`
            });
          }
        }
      }
      
      const product = await storage.updateProduct(productId, updateData);
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      await storage.deleteProduct(productId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Cart Management Routes
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.params.sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartData = insertCartSchema.parse(req.body);
      const cartItem = await storage.addToCart(cartData);
      res.json({ success: true, cartItem });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid cart data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to add to cart" });
      }
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const cartId = parseInt(req.params.id);
      const { quantity } = req.body;
      const cartItem = await storage.updateCartItem(cartId, quantity);
      res.json({ success: true, cartItem });
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const cartId = parseInt(req.params.id);
      await storage.removeFromCart(cartId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  // Order Management Routes
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      const orderItems = await storage.getOrderItems(orderId);
      res.json({ ...order, items: orderItems });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const { items, ...orderInfo } = req.body;
      
      // Create order
      const order = await storage.createOrder(orderInfo);
      
      // Create order items and update inventory
      for (const item of items) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        });
        
        // Update product stock
        const product = await storage.getProduct(item.productId);
        if (product) {
          const newStock = product.stockQuantity - item.quantity;
          await storage.updateProductStock(item.productId, newStock);
          
          // Create inventory movement
          await storage.createInventoryMovement({
            productId: item.productId,
            movementType: "out",
            quantity: item.quantity,
            reason: "Order sale",
            referenceId: `order-${order.id}`
          });
        }
      }
      
      res.json({ success: true, order });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid order data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create order" });
      }
    }
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { status } = req.body;
      const order = await storage.updateOrderStatus(orderId, status);
      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  // Inventory Management Routes
  app.get("/api/inventory", async (req, res) => {
    try {
      const productId = req.query.productId ? parseInt(req.query.productId as string) : undefined;
      const movements = await storage.getInventoryMovements(productId);
      res.json(movements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory movements" });
    }
  });

  // Showcase Images Management Routes
  app.get("/api/showcase-images", async (req, res) => {
    try {
      const images = await storage.getShowcaseImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch showcase images" });
    }
  });

  app.get("/api/showcase-images/:id", async (req, res) => {
    try {
      const imageId = parseInt(req.params.id);
      const image = await storage.getShowcaseImage(imageId);
      if (!image) {
        return res.status(404).json({ error: "Showcase image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch showcase image" });
    }
  });

  app.post("/api/showcase-images", async (req, res) => {
    try {
      const imageData = insertShowcaseImageSchema.parse(req.body);
      const image = await storage.createShowcaseImage(imageData);
      res.json({ success: true, image });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid image data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create showcase image" });
      }
    }
  });

  app.put("/api/showcase-images/:id", async (req, res) => {
    try {
      const imageId = parseInt(req.params.id);
      const updateData = insertShowcaseImageSchema.partial().parse(req.body);
      const image = await storage.updateShowcaseImage(imageId, updateData);
      res.json({ success: true, image });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid image data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update showcase image" });
      }
    }
  });

  app.delete("/api/showcase-images/:id", async (req, res) => {
    try {
      const imageId = parseInt(req.params.id);
      await storage.deleteShowcaseImage(imageId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete showcase image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
