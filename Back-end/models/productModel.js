const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please enter a product name"] },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please select a category"],
    },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    images: [{ type: String, required: false }], // Changed to array
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please specify the user"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
