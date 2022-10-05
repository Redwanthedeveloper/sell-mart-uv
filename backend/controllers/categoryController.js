import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "category removed" });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    const updatedProduct = await category.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

export {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
