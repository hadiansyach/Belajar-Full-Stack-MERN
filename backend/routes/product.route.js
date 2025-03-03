import express from 'express';
import mongoose from 'mongoose';

import { createProduct, getProducts, updateProduct, deleteProduct } from '../controller/product.controller.js';

const router = express.Router();

// Get all Products
router.get("/", getProducts);

// Create new Product
router.post("/" ,createProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router; // export the router