import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import customizationsRoutes from "./routes/customization.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
// app.use(
//    cors({
//       origin: "http://localhost:5173",
//       credentials: true,
//    })
// );

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customizations", customizationsRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
   connectDB();
});
