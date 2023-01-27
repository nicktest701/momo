/* eslint-disable import/no-anonymous-default-export */
import { makePayment, getPayment } from "./paymentAPI";
import { sendVoucherMail } from "./transactionAPI";
import { getAllVouchersCategory, postCategory } from "./categoryAPI";
import {getVoucherByVoucherType} from './voucherAPI'

import { addBeceCard } from "./cardApi";
export default {
  //CATEGORY
  getAllVouchersCategory,
  postCategory,

  //VOUCHERS
  getVoucherByVoucherType,

  makePayment,
  getPayment,

  //bece
  addBeceCard,
  //transaction
  sendVoucherMail,
};
