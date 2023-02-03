/* eslint-disable import/no-anonymous-default-export */
import { makePayment, getPayment } from "./paymentAPI";
import { sendVoucherMail } from "./transactionAPI";
import {
  getAllVouchersCategory,
  getCategory,
  postCategory,
  editCategory,
  deleteCategory,
  postCinemaTicketCategory,
} from "./categoryAPI";
import { getVoucherByVoucherType } from "./voucherAPI";
import { getBusByVoucherType } from "./busAPI";
import { getCinema } from "./cinemaAPI";
import { addBeceCard } from "./cardApi";
export default {
  //CATEGORY
  getAllVouchersCategory,
  getCategory,
  postCategory,
  editCategory,
  deleteCategory,
  //cinema
  postCinemaTicketCategory,
  getCinema,
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
