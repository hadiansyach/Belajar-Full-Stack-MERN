import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); // allow to accept json data in the req.body

// Get all Products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error in get products ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
});

// Create new Product
app.post("/api/products" ,async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.description || !product.image) {
        return res.status(400).json({ success: false,message: "Please fill all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });        
    }
});

// Update Product
app.put("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in update product ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
})

// Delete Product
app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.error("Error in delete product ",error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started on http://localhost:5000");
})
