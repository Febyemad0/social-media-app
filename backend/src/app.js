import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // Fixed typo here (from "mongooese" to "mongoose")
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const url = process.env.DATABASE_URL;
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.HOST, // Your frontend URL
  credentials: true, // Enable credentials
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "media")));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB and start the server
mongoose
  .connect(url)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

// Set up routes
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
