import express from 'express';

import { createProduct, getProducts, updateProduct, deleteProduct, getProductById } from '../controller/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all Products
router.get("/", getProducts);

// Get single Product
router.get("/:id", getProductById);

// Create new Product
router.post("/",authMiddleware ,createProduct);

// Update Product
router.put("/:id",authMiddleware,updateProduct);

// Delete Product
router.delete("/:id",authMiddleware, deleteProduct);

export default router; // export the router