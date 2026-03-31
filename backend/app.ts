import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import { config } from "./utils/config";

// routes
import authRoutes from "./routes/auth";
import propertiesRoutes from "./routes/properties";
import favouritesRoutes from "./routes/favourites";

const app = express();

// Middleware

app.use(
  cors({
    origin: [config.FRONTEND_URL],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// request logger
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/favourites", favouritesRoutes);

// Error handling

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error." });
  },
);

export default app;
