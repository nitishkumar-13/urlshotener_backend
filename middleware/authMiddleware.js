import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid Token" });
  }
};
