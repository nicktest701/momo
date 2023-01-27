/* eslint-disable import/no-anonymous-default-export */
import { checkerData } from "./data";
import {
  checkerColumns,
  voucherCategoryColumns,
  voucherTypeColumns,
  shopRows,
  busTicketColumns,
  stadiumTicketColumns,
  cinemaTicketColumns,
} from "./columns";
import { towns } from "./towns";
import { cities, cities_regions } from "./cities";

export default {
  //Data
  checkerData,

  shopRows,
  towns,
  cities,
  cities_regions,

  //Columns
  checkerColumns,
  voucherCategoryColumns,
  voucherTypeColumns,
  busTicketColumns,
  stadiumTicketColumns,
  cinemaTicketColumns,
};
