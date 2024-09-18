const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/", (req, res) => {
  res.send("Cart route");
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price });
    }

    await cart.save();

    res.status(201).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating cart" });
  }
});

module.exports = router;
