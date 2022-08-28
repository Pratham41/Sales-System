// MONGOOSE
const mongoose = require('mongoose');

// USER SCHEMA
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
        type: Number,
        default: 0,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model('Product', productSchema);
module.exports = Product;