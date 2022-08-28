const Product = require("../model/product");
const moment = require('moment')


exports.addProduct = async (req, res) => {
  const { name, quantity, amount } = req.body;
  try {
    const newProduct = await Product.create({ name, quantity, amount });
    if (newProduct) {
      return res.status(201).json(newProduct);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("failed to add product");
  }
};

exports.listAllProducts = async (req, res) => {
    try {
      const allProducts = await Product.find({}).sort({_id:-1});
      if (allProducts) {
        return res.status(200).json(allProducts);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json("failed to add product");
    }
};

exports.topFiveSellingProducts = async (req, res) => {
    try {
      const topFiveProducts = await Product.find({}).sort({quantity:-1}).limit(5);
      if (topFiveProducts) {
        return res.status(200).json(topFiveProducts);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json("failed to get top 5 products");
    }
};

exports.getTodayRevenueAmount = async (req, res) => {
  try {
    const today = moment().startOf('day')
    const todayRevenueAmount = await Product.aggregate([
      {$match:
        {
        createdAt:{$gte: today.toDate(),$lte: moment(today).endOf('day').toDate() }
      }},
      {$group:{ _id : null, amount : {$sum : "$amount"}}},
      {$project:{_id:0}}
    ]);
    if (todayRevenueAmount) {
      return res.status(200).json(todayRevenueAmount);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("failed to get todays revenue amount");
  }
};
