import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token =  req.header("Authorization").replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "No token, authorization denied" });

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password");

        if(!user) return res.status(404).json({ message: "User not found" });
        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({ message: "Invalid or Expired Token!" });
    }
}

export default authMiddleware;