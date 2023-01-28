import React, { useContext, useEffect, useRef } from "react";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomContext } from "../context/providers/CustomProvider";
import ReactToPrint from "react-to-print";
import Scrollbars from "react-custom-scrollbars";
import PrintPreview from "../components/items/PrintPreview";

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
          <PrintPreview
            info={transaction.info}
            vouchers={transaction.vouchers}
          />
        </div>
      </Scrollbars>
    </Container>
  );
};

export default CheckoutPrint;
