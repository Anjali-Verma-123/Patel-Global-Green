import express from "express";
import {
  addReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Review
router.post("/add", verifyToken, addReview);

// Get Reviews of Product
router.get("/:productId", getProductReviews);

export default router;