const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const Category = require("../models/categoryModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { category } = req.query;
    const categories = await Category.find({ category }).sort({
      voucherType: 1,
    });

    if (_.isEmpty(categories)) {
      return res.status(200).json([]);
    }
    console.log(categories);

    res.status(200).json(categories);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newCategory = req.body;
    const category = await Category.create(newCategory);
    console.log(category);
    res.sendStatus(201);
  })
);

router.put(
  "/",
  asyncHandler((req, res) => {
    res.status(200).json("put");
  })
);

router.delete(
  "/",
  asyncHandler((req, res) => {
    res.status(200).json("delete");
  })
);

module.exports = router;
