import express from "express";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);

router.get("/", verifyToken, getCart);

router.delete("/remove/:productId", verifyToken, removeFromCart);

router.put("/update/:productId", verifyToken, updateQuantity);


export default router;