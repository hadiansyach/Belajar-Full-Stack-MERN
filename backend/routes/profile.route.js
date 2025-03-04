import express from 'express';
import { getUserProfile,editProfile } from '../controller/profile.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Get user profile
router.get("/", authMiddleware, getUserProfile);

// Edit profile
router.put("/", authMiddleware, editProfile);

export default router; // export the router