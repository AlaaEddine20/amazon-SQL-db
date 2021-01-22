const express = require("express");

const Review = require("../../db").Review;
const Product = require("../../db").Product;

const router = express.Router();

// ADD A REVIEW TO A SPECIFIC PRODUCT
router.post("/", async (req, res) => {
  try {
    const newRev = await Review.create(req.body);
    res.send(newRev);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.send(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// edit reviews
router.put("/:id", async (req, res) => {
  try {
    const updateRev = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.send(updateRev[1]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// delete a review
router.delete("/:id", async (req, res) => {
  try {
    await Review.destroy({
      where: { id: req.params.id },
    }).then((rowsDeleted) => {
      if (rowsDeleted === 1) res.send("Deleted");
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
