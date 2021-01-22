const express = require("express");

const Product = require("../../db").Product;
// const Review = require("../../db").Review;

const router = express.Router();

// Create new product
router.post("/", async (req, res) => {
  try {
    const newProd = await Product.create(req.body);
    return res.status(201).send(newProd);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
