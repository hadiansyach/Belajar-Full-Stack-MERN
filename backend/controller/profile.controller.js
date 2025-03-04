import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId).select("-password");

        if(!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error in get user ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
}

export const editProfile = async (req, res) =>  {
    try {
        const userId = req.user.id;
        let {name, email, phoneNumber, password} = req.body;

        const userExist = await User.findOne({ email });
        if (userExist && userExist._id.toString() !== userId) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const user = await user.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (password) {
            // hash password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.password = password || user.password;

        const updatedUser = await user.save();

        res.json({ success: true, data: updatedUser });
    }
    catch (error) {
        console.error("Error in update user ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
}