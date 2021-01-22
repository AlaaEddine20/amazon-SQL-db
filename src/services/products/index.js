const express = require("express");

const Product = require("../../db").Product;
const Review = require("../../db").Review;

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

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: Review }] });
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one specific product with its reviews
router.get("/:id", async (req, res) => {
  try {
    const requestedProd = await Product.findAll({
      include: [{ model: Review }],
      where: { id: req.params.id },
    });
    res.send(requestedProd);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Modify a Product
router.put("/:id", async (req, res) => {
  try {
    const updatedProd = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.send(updatedProd[1]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a prod
router.delete("/:id", async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } }).then(
      (rowsDeleted) => {
        if (rowsDeleted === 1) res.send("Deleted");
      }
    );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
module.exports = router;
