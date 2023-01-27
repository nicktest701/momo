import { Chip, ListItemText } from "@mui/material";
import { currencyFormatter, IMAGES } from "../constants";

export const shopRows = [
  {
    id: 1,
    title: "WAEC RESULTS CHECKERS & SCHOOL PLACEMENT",
    img: IMAGES.waec2,
    content: `Buy school placement check with ease with just a single click`,
    path: "waec-checker",
  },

  {
    id: 2,
    title: "UNIVERSITY & POLYTECHNIC FORMS",
    img: IMAGES.university2,
    content: `Buy school placement check with ease with just a single click`,
    path: "university-form",
  },
  {
    id: 3,
    title: "SECURITY SERVICE FORMS",
    img: IMAGES.security_service,
    content: `Buy school placement check with ease with just a single click`,
    path: "security-service",
  },
  {
    id: 4,
    title: "CINEMA TICKETS",
    img: IMAGES.cinema_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "cinema-ticket",
  },

  {
    id: 5,
    title: "BUS TICKETS",
    img: IMAGES.bus_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "bus-ticket",
  },
  {
    id: 6,
    title: "STADIUM TICKETS",
    img: IMAGES.stadia_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "stadia-ticket",
  },
];

export const checkerColumns = [
  {
    title: "#",
    field: "id",
  },
  {
    title: "Checker",
    field: "checker",
  },
  {
    title: "Price",
    field: "price",
  },
  {
    title: "Total",
    field: "total",
    type: "numeric",
  },
  {
    title: "Used",
    field: "used",
    type: "numeric",
  },
  {
    title: "Available",
    field: "available",
    type: "numeric",
  },
];

export const voucherCategoryColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher Type",
    field: "voucherType",
    // render: (rowData) => {
    //   if (rowData.category === "stadium") {
    //     return `${rowData?.details?.home} Vs ${rowData?.details?.away} (${rowData.voucherType}) `;
    //   }
    //   if (rowData.category === "bus") {
    //     return `${rowData?.details?.from} - ${rowData?.details?.to} (${rowData.voucherType}) `;
    //   }

    //   return rowData.voucherType;
    // },
  },
  {
    title: "Category",
    field: "category",
  },
  {
    title: "Price",
    field: "price",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },

  // {
  //   title: "Total",
  //   field: "total",
  //   type: "numeric",
  // },
  // {
  //   title: "Used",
  //   field: "used",
  //   type: "numeric",
  // },
  // {
  //   title: "Available",
  //   field: "available",
  //   type: "numeric",
  // },
];

export const voucherTypeColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher",
    field: "voucher",
  },
  {
    title: "Pin",
    field: "pin",
  },
  {
    title: "Serial",
    field: "serial",
  },

  {
    title: "Status",
    field: "active",
    render: (rowData) => (
      <Chip
        variant="filled"
        color={rowData.active ? "success" : "error"}
        size="small"
        label={rowData.active ? "Active" : "Used"}
      />
    ),
  },
];

export const busTicketColumns = [
  {
    field: "id",
    title: "ID",
    hidden: true,
  },
  {
    field: "journey",
    title: "Journey",
  },
  {
    field: "date",
    title: "Date/Time",
    render: (rowData) => (
      <ListItemText primary={rowData.date} secondary={rowData.time} />
    ),
  },

  {
    field: "price",
    title: "Fare",
    render: (rowData) => currencyFormatter(rowData.price),
  },
];
export const cinemaTicketColumns = [
  {
    field: "id",
    title: "ID",
    hidden: true,
  },
  {
    field: "movie",
    title: "Movie Title",
  },
  {
    field: "theatre",
    title: "Theatre",
    render: (rowData) => (
      <ListItemText primary={rowData?.theatre} secondary={rowData?.location} />
    ),
  },
  {
    field: "date",
    title: "Date",
    render: (rowData) => (
      <ListItemText primary={rowData.date} secondary={rowData.time} />
    ),
  },
  {
    field: "price",
    title: "Price",
    render: (rowData) => currencyFormatter(rowData.price),
  },
];
export const stadiumTicketColumns = [
  {
    field: "id",
    title: "ID",
    hidden: true,
  },
  {
    field: "match",
    title: "Match",
  },
  {
    field: "venue",
    title: "Venue",
  },
  {
    field: "date",
    title: "Date",
    render: (rowData) => (
      <ListItemText primary={rowData.date} secondary={rowData.time} />
    ),
  },

  {
    field: "price",
    title: "Price",
    render: (rowData) => currencyFormatter(rowData.price),
  },
];
