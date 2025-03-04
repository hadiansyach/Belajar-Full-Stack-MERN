import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error in get products ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const {name, price, description, image} = req.body;
    const userId = req.user.id;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ success: false,message: "Please fill all fields" });
    }

    const newProduct = new Product({
        name,
        price,
        description,
        image,
        user: userId
    });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });        
    }
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
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
};

export const getProductById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    try {
        const product = await Product.findById(id);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message});
    }
}