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
    // console.log(categories);

    res.status(200).json(categories);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (_.isEmpty(category)) {
      return res.status(200).json({});
    }
    console.log(category);

    res.status(200).json(category);
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
  asyncHandler(async (req, res) => {
    const id = req.body.id;

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (_.isEmpty(updatedCategory)) {
      return res
        .status(404)
        .json("Error updating category.Please try later!!!");
    }
    console.log(updatedCategory);

    res.status(200).json("Category has been updated successfully!!!");
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const id = req.query.id;

    const deletedCategory = await Category.findByIdAndRemove(id, {
      new: true,
    });

    if (_.isEmpty(deletedCategory)) {
      return res
        .status(404)
        .json("Error removing category.Please try later!!!");
    }

    res.status(200).json("Category has been removed successfully!!!");
  })
);

module.exports = router;
