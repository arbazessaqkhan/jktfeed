import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { registerRoutes } from "./routes";
import { db } from "./db";
import { products } from "@shared/schema";

const app = express();

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow CORS for frontend during development
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Use env var or default to localhost
  credentials: false,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log API requests
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalJson = res.json;
  res.json = function (body, ...args) {
    capturedJsonResponse = body;
    return originalJson.apply(res, [body, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 120) logLine = logLine.slice(0, 119) + "…";
      console.log(logLine);
    }
  });

  next();
});

// ✅ Optional: Health check
app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const result = await db.select().from(products).limit(1);
    res.json({ ok: true, result });
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// ✅ Main function to register routes and start server
(async () => {
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("❌ Global Error:", err);
    res.status(status).json({ error: message });
  });

  // ✅ Serve frontend build (after `vite build`)
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // ✅ For SPA: serve index.html fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  const port = process.env.PORT || 5000;
  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
})();
