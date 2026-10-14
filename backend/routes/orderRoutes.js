import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", verifyToken, placeOrder);

router.get("/my-orders", verifyToken, getMyOrders);

router.get("/", verifyToken, isAdmin, getAllOrders);

router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;
