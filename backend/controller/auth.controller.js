import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    const { name, email, phoneNumber, role, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }``

    try {
        // check if email is already registered
        const userExist = await User.findOne({ email });
        if(userExist) return res.status(400).json({ success: false, message: "User already exists" });

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save new user
        const newUser = new User({ name, email, phoneNumber, role, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ success: true, message: "User created successfully"});
    }
    catch (error) {
        console.error("Error in update user ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("JWT SECRET, ", process.env.JWT_SECRET);

    try {
        // check if user exists
        const user = await User.findOne({ email });
        
        if(!user) return res.status(400).json({ status: false, message: "User not found" });

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials!" });

        // generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Error in login ",error.message);
        res.status(500).json({ success: false, message: "Server Error ", error: error.message });
    }
}