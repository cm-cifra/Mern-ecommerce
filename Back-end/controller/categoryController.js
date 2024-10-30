const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

//show all product
const getCategories = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json(category);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
// show product by id
const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//create product
const createCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//update product by id
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body);
    if (!category) {
      res.status(404);
      throw new Error(`connot find any product with ID ${id}`);
    }
    const updateCategory = await Category.findById(id);
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
//delete product by id
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
module.exports = {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
