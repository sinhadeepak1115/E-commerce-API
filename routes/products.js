const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const vertifyToken = require("../middleware/authMiddleware");

router.get("/", vertifyToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Products not found" });
  }
});

router.post("/add", vertifyToken, async (req, res) => {
  try {
    const { name, description, price, quantity, brand } = req.body;
    const product = new Product({ name, description, price, quantity, brand });
    await product.save();
    res.status(201).json({ message: "Product saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Product not found" });
  }
});

module.exports = router;
