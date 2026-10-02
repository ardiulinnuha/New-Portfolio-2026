import express from "express";
import fs from "fs";
import path from "path";

async function startServer() {
  const app = express();

  // Differentiate between production (dist/server.cjs or NODE_ENV=production) and development (tsx server.ts)
  const isProd =
    process.env.NODE_ENV === "production" ||
    (typeof __filename !== "undefined" && __filename.includes("dist"));
  const isDev = !isProd;

  // In development, the dev server MUST bind to port 3000 (nginx forwards port 8080 -> 3000).
  // In production (Cloud Run standalone container), bind to process.env.PORT (defaults to 8080).
  const targetPort = isDev
    ? 3000
    : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8080;

  app.use(express.json());

  // Health check routes for Cloud Run startup/liveness probes and monitoring
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/_health", (_req, res) => {
    res.status(200).send("OK");
  });

  // Vite middleware for development vs static files for production
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Locate the dist directory whether executed from project root or inside dist
    let distPath = path.join(process.cwd(), "dist");
    if (!fs.existsSync(path.join(distPath, "index.html"))) {
      if (fs.existsSync(path.join(process.cwd(), "index.html"))) {
        distPath = process.cwd();
      } else if (typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "index.html"))) {
        distPath = __dirname;
      }
    }

    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(targetPort, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${targetPort} (${isProd ? "production" : "development"})`);
  });

  // In production, if targetPort is not 3000, also bind port 3000 as secondary listener for internal proxies
  let secondaryServer: ReturnType<typeof app.listen> | null = null;
  if (isProd && targetPort !== 3000) {
    try {
      secondaryServer = app.listen(3000, "0.0.0.0", () => {
        console.log(`Secondary listener active on http://0.0.0.0:3000`);
      });
      secondaryServer.on("error", () => {
        // Port 3000 might already be bound or unavailable; safe to ignore
      });
    } catch {
      // Ignore
    }
  }

  // Graceful shutdown handling for Cloud Run
  const handleShutdown = () => {
    console.log("Shutting down gracefully...");
    server.close(() => {
      if (secondaryServer) {
        secondaryServer.close();
      }
      process.exit(0);
    });
  };

  process.on("SIGTERM", handleShutdown);
  process.on("SIGINT", handleShutdown);
}

startServer();
