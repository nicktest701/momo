const db = require("../db/dbConnection");

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    voucherType: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    details: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("Category", CategorySchema);
