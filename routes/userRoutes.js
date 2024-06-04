import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  forgotPassword,
  listAllUsers,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list-all-users", authMiddleware, listAllUsers);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

export default router;
