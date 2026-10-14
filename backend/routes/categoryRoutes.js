import express from "express";

import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, isAdmin, upload.single("image"), addCategory);

router.get("/", getCategories);

router.put("/:id", verifyToken, isAdmin, upload.single("image"), updateCategory);

router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;