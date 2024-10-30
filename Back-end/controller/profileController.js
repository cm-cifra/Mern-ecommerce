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
    res.status(200).json(product);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    // Create product object from req.body
    const newProduct = { ...req.body };

    // Handle image upload if file exists
    if (req.file) {
      newProduct.image = `/uploads/product/${req.file.filename}`;
    }

    // Create and save the product to the database
    const product = await Product.create(newProduct);

    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update product by ID
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the product by ID
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }

    // Update product object from req.body
    const updatedData = { ...req.body };

    // Handle image upload if file exists
    if (req.file) {
      updatedData.image = `/uploads/product/${req.file.filename}`;
    }

    // Update product in the database
    await Product.findByIdAndUpdate(id, updatedData);

    // Fetch the updated product
    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
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
      throw new Error(`Cannot find any product with ID ${id}`);
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
