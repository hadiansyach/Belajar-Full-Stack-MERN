import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");

        if(!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error in get user ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
}

export const editProfile = async (req, res) =>  {
    try {
        const {id} = req.params;
        let {password} = req.body;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if(!user) return res.status(404).json({ success: false, message: "User not found" });

        if (password) {
            // hash password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }

        // Update user fields
        user.password = password || user.password;

        const updatedUser = await user.save();

        res.json({ success: true, data: updatedUser });
    }
    catch (error) {
        console.error("Error in update user ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
}