import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  filterByCategory,
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  verifyToken,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// ADD PRODUCT
// =====================================================

router.post(
  "/add",
  verifyToken,
  isAdmin,
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "additionalImages",
      maxCount: 10,
    },
  ]),
  addProduct
);

// =====================================================
// SEARCH
// =====================================================

router.get(
  "/search",
  searchProduct
);

// =====================================================
// FILTER CATEGORY
// =====================================================

router.get(
  "/category/:categoryId",
  filterByCategory
);

// =====================================================
// GET ALL PRODUCTS
// Supports:
//
// /products
// /products?space=bedroom
// /products?sunlight=low
// /products?careLevel=easy
//
// =====================================================

router.get(
  "/",
  getProducts
);

// =====================================================
// SINGLE PRODUCT
// =====================================================

router.get(
  "/:id",
  getSingleProduct
);

// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "additionalImages",
      maxCount: 20,
    },
    {
      name: "newAdditionalImages",
      maxCount: 20,
    },
  ]),
  updateProduct
);

// =====================================================
// DELETE
// =====================================================

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteProduct
);

export default router;