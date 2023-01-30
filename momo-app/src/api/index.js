/* eslint-disable import/no-anonymous-default-export */
import { makePayment, getPayment } from "./paymentAPI";
import { sendVoucherMail } from "./transactionAPI";
import {
  getAllVouchersCategory,
  getCategory,
  postCategory,
  editCategory,
  deleteCategory,
} from "./categoryAPI";
import { getVoucherByVoucherType } from "./voucherAPI";
import { getBusByVoucherType } from "./busAPI";
import { addBeceCard } from "./cardApi";
export default {
  //CATEGORY
  getAllVouchersCategory,
  getCategory,
  postCategory,
  editCategory,
  deleteCategory,

  //Bus
  getBusByVoucherType,

  //VOUCHERS
  getVoucherByVoucherType,

  makePayment,
  getPayment,

  //bece
  addBeceCard,
  //transaction
  sendVoucherMail,
};
