import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

console.log("KEY:", process.env.RAZORPAY_KEY_ID);

console.log(process.env.MONGODB_URI);

connectDB();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://patel-global-green-swart.vercel.app",
    ],
    credentials: true,
  })
);


app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  next();
});

app.use(express.json());

// app.post("/test", (req, res) => {
//   console.log("Body:", req.body);
//   res.json(req.body);
// });



app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Patel Global Green Nursery API 🌱");
});

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your profile",
    user: req.user,
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});