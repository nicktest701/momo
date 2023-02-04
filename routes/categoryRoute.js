const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const multer = require("multer");
const Category = require("../models/categoryModel");
const { randomUUID } = require("crypto");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/cinema/");
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split(".")[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});
const upload = multer({ storage: Storage });

//GET Voucher by category
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

//GET BUS BY DESTINATION
router.get(
  "/bus",
  asyncHandler(async (req, res) => {
    const { voucherType } = req.query;
    console.log(voucherType);
    const bus = await Category.find({
      voucherType: { $regex: voucherType, $options: "i" },
    });

    if (_.isEmpty(bus)) {
      return res.status(200).json([]);
    }
    console.log(bus);

    res.status(200).json(bus);
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

//@POST new movie ticket
router.post(
  "/cinema",
  upload.single("cinema"),
  asyncHandler(async (req, res) => {
    const newCinemaTicket = req.body;
    const movieImg = req.file?.filename;
    // console.log(req.body);

    const newTicket = {
      category: newCinemaTicket.category,
      voucherType: newCinemaTicket.voucherType,
      price: newCinemaTicket.price,
      details: {
        cinema: movieImg,
        movie: newCinemaTicket.movie,
        theatre: newCinemaTicket.theatre,
        location: newCinemaTicket.location,
        date: newCinemaTicket.date,
        time: newCinemaTicket.time,
        description: newCinemaTicket.description,
        message: newCinemaTicket.message,
      },
    };

    const category = await Category.create(newTicket);

    if (_.isEmpty(category)) {
      return res.status(404).json("Error adding category.Please try later!!!");
    }

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
