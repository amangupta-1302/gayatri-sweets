import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";

// UTILS
import { connectDB } from "./config/db_connection";
import { HTTP_STATUS } from "./utils/statusCodes";

// ROUTES
import authRouter from "./routes/auth";
import productRouter from "./routes/products";

//Load env variables
dotenv.config();

// constants
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Initialize Express Server
const server = express();

// Basic middlewares
server.use(express.json());
server.use(helmet());
server.use(mongoSanitize());
server.use(xss());
server.use(cookieParser());
server.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Health check
server.get("/health", (_, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Server is running",
  });
});

// API ROUTES
server.use("/auth", authRouter);
server.use("/products", productRouter);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
