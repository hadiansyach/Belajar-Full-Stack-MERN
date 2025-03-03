import express from 'express';

import { createProduct, getProducts, updateProduct, deleteProduct, getProductById } from '../controller/product.controller.js';

const router = express.Router();

// Get all Products
router.get("/", getProducts);

// Get single Product
router.get("/:id", getProductById);

// Create new Product
router.post("/" ,createProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router; // export the router