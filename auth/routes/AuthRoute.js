import express from "express";
import { register, login, verifyToken } from "../controllers/AuthController.js";

// Rute ini menangani endpoint terkait otentikasi, 
// seperti /register untuk mendaftar pengguna baru 
// dan /login untuk proses login.

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verifyToken);

export default router;
