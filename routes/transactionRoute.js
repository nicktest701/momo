const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const sendMail = require("../config/mail");
const generatePDF = require("../config/generatePDF");
const generateVoucher = require("../config/generatePDF");
const generateVoucherTemplate = require("../config/generateVoucherTemplate");
//model
const Transaction = require("../models/transactionModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const transaction = await Transaction.find();
    res.status(200).json(transaction);
  })
);

router.post(
  "/send-mail",
  asyncHandler(async (req, res) => {
    const id = req.body.id;

    const transaction = await Transaction.findById(id);

    if (_.isEmpty(transaction)) {
      return res
        .status(404)
        .json("Error processing your request.Please try again later");
    }

    //Check if voucher pdf already exists
    if (fs.existsSync(path.join(process.cwd(), "/vouchers/", `${id}.pdf`))) {
      //
      if (process.env.NODE_ENV === "production") {
        await sendMail(id,transaction?.info?.agentEmail);
      }
    } else {
      //Generate voucher template
      const template = await generateVoucherTemplate(transaction);

      //Print  voucher template in pdf
      await generateVoucher(template, id);

      //
      if (process.env.NODE_ENV === "production") {
        await sendMail(id,transaction?.info?.agentEmail);
      }
    }

    res.status(200).send(id);
  })
);

router.get(
  "/:transactionId",
  asyncHandler(async (req, res) => {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findById(transactionId);
    res.status(200).json(transaction);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newTransaction = req.body;

    const transaction = await Transaction.create(newTransaction);
    if (!transaction) {
      res.status(404).json("Error saving pins.Please try again later");
    }
    res.sendStatus(201);
  })
);

module.exports = router;
