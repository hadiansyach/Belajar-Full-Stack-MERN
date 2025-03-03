import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import auth from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import profileRoutes from "./routes/profile.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow to accept json data in the req.body

app.use("/api/", auth)
app.use("/api/products", productRoutes)
app.use("/api/profile", profileRoutes)

app.listen(5000, () => {
    connectDB();
    console.log("Server started on http://localhost:"+PORT);
})
