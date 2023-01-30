import React, { useContext, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import { CustomContext } from "../context/providers/CustomProvider";
import ReactToPrint from "react-to-print";
import Scrollbars from "react-custom-scrollbars";
import PrintPreview from "../components/items/PrintPreview";
import UniversityTemplate from "../components/template/UniversityTemplate";
import BusTemplate from "../components/template/BusTemplate";

const CheckoutPrint = () => {
  const navigate = useNavigate();
  const componentRef = useRef();

  const {
    customState: { transaction },
  } = useContext(CustomContext);

  useEffect(() => {
    if (!transaction?._id) {
      navigate("/evoucher", { replace: true });
    }
  }, [transaction?._id, navigate]);

  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Typography variant="h4">Vouchers</Typography>
        <ReactToPrint
          pageStyle={'width:8.5in";min-height:11in"; margin:auto",padding:8px;'}
          trigger={() => <Button>Print Vouchers</Button>}
          content={() => componentRef.current}
          documentTitle="Vouchers"
        />
      </Stack>
      <Divider />
      <Scrollbars autoHide style={{ minHeight: "100vh" }}>
        <div ref={componentRef}>
          {transaction.info?.voucherCategory === "university" && (
            <UniversityTemplate {...transaction} />
          )}

          {transaction.info?.voucherCategory === "waec" && (
            <PrintPreview
              info={transaction.info}
              vouchers={transaction.vouchers}
            />
          )}
          {transaction.info?.voucherCategory === "bus" && (
            <BusTemplate {...transaction} />
          )}
        </div>
      </Scrollbars>
    </Container>
  );
};

export default CheckoutPrint;
