import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.ATLAS_URI as string);

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // only accept requests from defined URL, and cookie must be included in request
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// register endpoint with Express
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
