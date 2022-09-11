import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, createCategory);
router.route("/").get(protect, getCategories);

export default router;
