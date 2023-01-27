import { KeyboardArrowRight } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";

import evoucher from "../assets/images/ges.jpg";

function VoucherSlide() {
  return (
    <div className="evoucher-slide">
      <Typography variant='h3'>E-Voucher Sales.....</Typography>
      <div>
        <img src={evoucher} alt="evoucher-img" />
      </div>

      <div>
        <p>Buy </p>
        <ul>
          <li>BECE results checker</li>
          <li>SSCE, WASSCE, WASSCE NOVDEC, ABCE checker</li>
        </ul>
        <Button endIcon={<KeyboardArrowRight />}>Proceed to buy</Button>
      </div>
    </div>
  );
}

export default VoucherSlide;
