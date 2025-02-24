const express = require("express");
const productUplaod = require("../middlewares/photoUpload");
const {
  createProduct,
  getProductsByCategory,
} = require("../controllers/productContoller");

const productRouter = express.Router();

productRouter.post(
  "/postproducts",
  productUplaod.single("photo"),
  createProduct
);

productRouter.get("/category/:category", getProductsByCategory);

module.exports = productRouter;
