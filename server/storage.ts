import { 
  users, contacts, products, orders, orderItems, cart, inventory, showcaseImages,
  type User, type InsertUser, type Contact, type InsertContact,
  type Product, type InsertProduct, type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem, type CartItem, type InsertCart,
  type Inventory, type InsertInventory, type ShowcaseImage, type InsertShowcaseImage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact management
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Product management
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  
  // Order management
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Cart management
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCart): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Inventory management
  getInventoryMovements(productId?: number): Promise<Inventory[]>;
  createInventoryMovement(movement: InsertInventory): Promise<Inventory>;
  updateProductStock(productId: number, quantity: number): Promise<void>;
  
  // Showcase image management
  getShowcaseImages(): Promise<ShowcaseImage[]>;
  getShowcaseImage(id: number): Promise<ShowcaseImage | undefined>;
  createShowcaseImage(image: InsertShowcaseImage): Promise<ShowcaseImage>;
  updateShowcaseImage(id: number, image: Partial<InsertShowcaseImage>): Promise<ShowcaseImage>;
  deleteShowcaseImage(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Contact management
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const contactList = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
    return contactList;
  }

  // Product management
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product> {
    const [product] = await db
      .update(products)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Order management
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db
      .insert(orderItems)
      .values(insertOrderItem)
      .returning();
    return orderItem;
  }

  // Cart management
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await db.select().from(cart).where(eq(cart.sessionId, sessionId));
  }

  async addToCart(insertCart: InsertCart): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cart)
      .where(and(eq(cart.sessionId, insertCart.sessionId), eq(cart.productId, insertCart.productId)));

    if (existingItem) {
      // Update quantity
      const [updated] = await db
        .update(cart)
        .set({ quantity: existingItem.quantity + insertCart.quantity })
        .where(eq(cart.id, existingItem.id))
        .returning();
      return updated;
    } else {
      // Add new item
      const [cartItem] = await db
        .insert(cart)
        .values(insertCart)
        .returning();
      return cartItem;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const [cartItem] = await db
      .update(cart)
      .set({ quantity })
      .where(eq(cart.id, id))
      .returning();
    return cartItem;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cart).where(eq(cart.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cart).where(eq(cart.sessionId, sessionId));
  }

  // Inventory management
  async getInventoryMovements(productId?: number): Promise<Inventory[]> {
    if (productId) {
      return await db
        .select()
        .from(inventory)
        .where(eq(inventory.productId, productId))
        .orderBy(desc(inventory.createdAt));
    }
    return await db.select().from(inventory).orderBy(desc(inventory.createdAt));
  }

  async createInventoryMovement(insertInventory: InsertInventory): Promise<Inventory> {
    const [movement] = await db
      .insert(inventory)
      .values(insertInventory)
      .returning();
    return movement;
  }

  async updateProductStock(productId: number, quantity: number): Promise<void> {
    await db
      .update(products)
      .set({ stockQuantity: quantity, updatedAt: new Date() })
      .where(eq(products.id, productId));
  }

  // Showcase image management
  async getShowcaseImages(): Promise<ShowcaseImage[]> {
    return await db
      .select()
      .from(showcaseImages)
      .orderBy(showcaseImages.order, desc(showcaseImages.createdAt));
  }

  async getShowcaseImage(id: number): Promise<ShowcaseImage | undefined> {
    const [image] = await db
      .select()
      .from(showcaseImages)
      .where(eq(showcaseImages.id, id));
    return image;
  }

  async createShowcaseImage(insertImage: InsertShowcaseImage): Promise<ShowcaseImage> {
    const [image] = await db
      .insert(showcaseImages)
      .values(insertImage)
      .returning();
    return image;
  }

  async updateShowcaseImage(id: number, updateData: Partial<InsertShowcaseImage>): Promise<ShowcaseImage> {
    const [image] = await db
      .update(showcaseImages)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(showcaseImages.id, id))
      .returning();
    return image;
  }

  async deleteShowcaseImage(id: number): Promise<void> {
    await db.delete(showcaseImages).where(eq(showcaseImages.id, id));
  }
}

export const storage = new DatabaseStorage();
