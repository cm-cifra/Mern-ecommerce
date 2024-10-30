const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Show all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Show product by ID
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find product with ID ${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const productData = { ...req.body };

    // Handle multiple image uploads
    if (req.files) {
      const imagePaths = req.files.map(
        (file) => `/uploads/product/${file.filename}`
      );
      productData.images = imagePaths; // Save image paths array
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle multiple image uploads during update
    if (req.files) {
      const imagePaths = req.files.map(
        (file) => `/uploads/product/${file.filename}`
      );
      updateData.images = imagePaths; // Save updated image paths
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find product with ID ${id}`);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find product with ID ${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
