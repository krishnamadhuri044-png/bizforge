import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import brandRoutes from "./src/routes/brand";
import marketingRoutes from "./src/routes/marketing";
import sentimentRoutes from "./src/routes/sentiment";
import paletteRoutes from "./src/routes/palette";
import chatbotRoutes from "./src/routes/chatbot";
import logoRoutes from "./src/routes/logo";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use("/api/brand", brandRoutes);
  app.use("/api/marketing", marketingRoutes);
  app.use("/api/sentiment", sentimentRoutes);
  app.use("/api/palette", paletteRoutes);
  app.use("/api/chatbot", chatbotRoutes);
  app.use("/api/logo", logoRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "BizForge API is running" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
