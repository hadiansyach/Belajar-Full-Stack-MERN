import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user",
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true // createdAt, updatedAt
});

const User = mongoose.model("User", userSchema);

export default User;