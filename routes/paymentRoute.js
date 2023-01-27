const router = require("express").Router();
const crypto = require("crypto");
const fs = require("fs");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");
const asyncHandler = require("express-async-handler");
const Voucher = require("../models/voucherModel");
const Transaction = require("../models/transactionModel");
const { requestPayment } = require("../api/transaction");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      totalAmount,
      categoryType,
      quantity,
      agentName,
      agentPhoneNumber,
      agentEmail,
      dataURL,
    } = req.body;
    const voucher = await Voucher.find({
      category: ObjectId(categoryType?.id),
      active: true,
    })
      .populate("category")
      .limit(quantity);

    if (_.isEmpty(voucher)) {
      return res
        .status(404)
        .json("Error processing your request.Please try again later");
    }

    const modifiedVoucher = voucher.map(({ category, serial, pin, _id }) => {
      return {
        id: _id,
        voucherType: category.voucherType,
        price: Number(category.price),
        serial,
        pin,
      };
    });

    const transactionInfo = {
      info: {
        transaction_id: crypto.randomUUID(),
        amount: totalAmount,
        agentName,
        agentPhoneNumber,
        agentEmail,
        dataURL,
        voucherCategory: voucher[0].category.category,
      },
      vouchers: modifiedVoucher,
    };

    // const data = await requestPayment(agentPhoneNumber);

    const transaction = await Transaction.create(transactionInfo);

    if (_.isEmpty(transaction)) {
      return res
        .status(400)
        .json("Error processing your request.Please try again");
    }
    console.log(transaction?.info);

    res.status(200).json(transaction);
  })
);

// router.get(
//   "/generate-pdf",
//   asyncHandler(async (req, res) => {
//     // const { transactionId } = req.body;

//     await generateVoucher(g);

//     res.sendStatus(200);
//   })
// );

module.exports = router;
