const express = require("express");
const router = express.Router();
const vertifyToken = require("../middleware/authMiddleware");

router.get("/", vertifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route" });
});

module.exports = router;
