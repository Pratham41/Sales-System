const router = require("express").Router();
const {
  addProduct,
  listAllProducts,
  topFiveSellingProducts,
  getTodayRevenueAmount,
} = require("../controller/product");
// MIDDLEWARES
const { protect, admin } = require("../middleware/auth");

router.route("/add").post(protect, admin, addProduct);
router.route("/").post( listAllProducts);
router
  .route("/getTopFiveSellingProducts")
  .post(protect, topFiveSellingProducts);
router.route("/getTodaySale").post(protect, getTodayRevenueAmount);

module.exports = router;
