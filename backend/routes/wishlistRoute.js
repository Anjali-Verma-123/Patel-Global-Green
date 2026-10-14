import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addToWishlist);

router.get("/", verifyToken, getWishlist);

router.delete("/remove/:productId", verifyToken, removeFromWishlist);

export default router;