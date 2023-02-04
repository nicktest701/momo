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
const generateQRCode = require("../config/qrcode");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      category,
      totalAmount,
      categoryType,
      quantity,
      agentName,
      agentPhoneNumber,
      agentEmail,
    } = req.body;

    const voucher = await Voucher.find({
      category: ObjectId(categoryType?.id),
      active: true,
    })
      .populate("category")
      .limit(quantity);
    // console.log(voucher);

    if (_.isEmpty(voucher)) {
      return res
        .status(404)
        .json("Error processing your request.Please try again later");
    }

    let transactionInfo = {};

    if (["waec", "university", "security"].includes(category)) {
      const modifiedVoucher = voucher.map(({ category, serial, pin, _id }) => {
        return {
          id: _id,
          voucherType: category.voucherType,
          price: Number(category.price),
          serial,
          pin,
        };
      });

      transactionInfo = {
        info: {
          transaction_id: crypto.randomUUID(),
          amount: totalAmount,
          agentName,
          agentPhoneNumber,
          agentEmail,
          dataURL: categoryType.details?.voucherURL,
          voucherCategory: category,
        },
        vouchers: modifiedVoucher,
      };
    }

    if (category === "bus" || category === "cinema") {
      await Promise.all(
        voucher.map(async ({ category, serial, pin, _id }) => {
          const code = await generateQRCode(serial);
          return {
            id: _id,
            voucherType: category.voucherType,
            price: Number(category.price),
            serial,
            pin,
            qrCode: code,
          };
        })
      ).then((vouchers) => {
        if (category === "bus") {
          transactionInfo = {
            info: {
              transaction_id: crypto.randomUUID(),
              amount: totalAmount,
              agentPhoneNumber,
              agentEmail,
              voucherCategory: category,
              origin: voucher[0].category?.details?.origin?.city,
              destination: voucher[0].category?.details?.destination?.city,
              date: voucher[0].category?.details?.date,
              time: voucher[0].category?.details?.time,
            },
            vouchers: vouchers,
          };
          return;
        }

        if (category === "cinema") {
          transactionInfo = {
            info: {
              transaction_id: crypto.randomUUID(),
              amount: totalAmount,
              agentPhoneNumber,
              agentEmail,
              voucherCategory: category,
              movie: voucher[0].category?.details?.movie,
              theatre: voucher[0].category?.details?.theatre,
              location: voucher[0].category?.details?.location,
              date: voucher[0].category?.details?.date,
              time: voucher[0].category?.details?.time,
            },
            vouchers: vouchers,
          };

          return;
        }
      });
    }

    // const data = await requestPayment(agentPhoneNumber);

    const transaction = await Transaction.create(transactionInfo);

    if (_.isEmpty(transaction)) {
      return res
        .status(400)
        .json("Error processing your request.Please try again");
    }

    // transaction._doc.info.date = new Date(transaction.createdAt).toUTCString();
     console.log(transaction);
    // res.status(200).json("helo");
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
