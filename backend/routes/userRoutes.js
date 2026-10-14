import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, getProfile, updateProfile } from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//user profile 
router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

//Admin profile
router.get("/", verifyToken, isAdmin, getAllUsers);

router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;