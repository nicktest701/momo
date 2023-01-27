import React, { useReducer } from "react";
import { CustomReducer } from "../reducers/CustomReducer";

export const CustomContext = React.createContext();
function CustomProvider({ children }) {
  const initialValues = {
    openSidebar: false,
    openPreviewChecker: false,
    voucherPaymentDetails: {
      open: false,
      data: {},
    },
    loadedChecker: {
      meta: [],
      data: [],
    },
    newCheckers: [],

    category: {
      open: false,
      category: "",
    },
    cinemaCategory: {
      open: false,
      category: "",
    },
    stadiumCategory: {
      open: false,
      category: "",
    },
    busCategory: {
      open: false,
      category: "",
    },

    ///vouchers
    transaction: {},
  };

  const [customState, customDispatch] = useReducer(
    CustomReducer,
    initialValues
  );
  return (
    <CustomContext.Provider value={{ customState, customDispatch }}>
      {children}
    </CustomContext.Provider>
  );
}

export default CustomProvider;
