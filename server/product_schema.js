const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  images: { type: String },
});

module.exports = mongoose.model("product", product_schema);
