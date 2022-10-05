import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategoryById
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id").delete(protect, admin, deleteCategory);
router.route("/:id").put(protect, admin, updateCategory);
router.route("/").post(protect, admin, createCategory);
router.route("/").get(getCategories);
router.route("/:id").get(getCategoryById);

export default router;
