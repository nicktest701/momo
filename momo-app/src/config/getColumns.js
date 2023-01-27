import {
  busTicketColumns,
  cinemaTicketColumns,
  stadiumTicketColumns,
  voucherCategoryColumns,
} from "../mocks/columns";

export function getColumns(category) {
  switch (category) {
    case "bus":
      return busTicketColumns;
    case "cinema":
      return cinemaTicketColumns;
    case "stadium":
      return stadiumTicketColumns;
    default:
      return voucherCategoryColumns;
  }
}
