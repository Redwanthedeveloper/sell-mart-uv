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
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     await product.remove();
//     res.json({ message: "Product removed" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

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
// const updateProduct = asyncHandler(async (req, res) => {
//   const { name, price, description, image, brand, category, countInStock } =
//     req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     product.name = name;
//     product.price = price;
//     product.description = description;
//     product.image = image;
//     product.brand = brand;
//     product.category = category;
//     product.countInStock = countInStock;

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

export { createCategory, getCategories };