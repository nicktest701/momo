import React, { useContext, useState, forwardRef } from "react";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Box, DialogContent, IconButton, Stack } from "@mui/material";
import Slide from "@mui/material/Slide";
import { LoadingButton } from "@mui/lab";
import { CloseSharp, MoneyRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CustomContext } from "../../context/providers/CustomProvider";
import { currencyFormatter } from "../../constants";
import { makePayment } from "../../api/paymentAPI";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function VoucherPaymentDetails() {
  const { customState, customDispatch } = useContext(CustomContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // [msg, setMsg] = useState({ severity: "", text: "" });

  ///payment details
  const open = customState.voucherPaymentDetails.open;
  const payload = customState.voucherPaymentDetails.data;

  //Make Payment
  const paymentMutate = useMutation(makePayment);

  const handlePayment = () => {
    setLoading(true);

    paymentMutate.mutateAsync(payload, {
      onSuccess: (data) => {
        if (data) {
          // if (data.code === "201") {
          //   window.location.href = data?.data?.paylinkUrl;
          // }
          customDispatch({ type: "loadVouchers", payload: data });
          console.log("Payment done!");

          navigate(`/checkout`, {
            replace: true,
            state: {
              transactionId: data?.info?.transaction_id,
              voucherCategory: data?.info.voucherCategory,
            },
          });

          customDispatch({
            type: "getVoucherPaymentDetails",
            payload: { open: false, data: {} },
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  //close Payment Details
  const handleClose = () => {
    customDispatch({
      type: "getVoucherPaymentDetails",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  const PlaceholderItem = ({ title, value }) => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            fontWeight="bold"
            sx={{ fontSize: 14, color: "primary.main" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ maxWdith: 200 }}>
            {value}
          </Typography>
        </Box>
      </>
    );
  };

  return (
    <Dialog
      keepMounted
      TransitionComponent={Transition}
      open={open}
      maxWidth="xs"
      fullWidth
    >
      {loading ? null : (
        <IconButton
          sx={{ alignSelf: "end", marginTop: 1 }}
          onClick={handleClose}
        >
          <CloseSharp />
        </IconButton>
      )}
      <DialogTitle sx={{ textAlign: "center", color: "secondary.main" }}>
        Payment Details
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {payload?.categoryType?.voucherType} VOUCHER
        </Typography>

        <Stack spacing={1} paddingY={3}>
          <PlaceholderItem title="Quantity" value={payload?.quantity} />
          <PlaceholderItem
            title="Total"
            value={currencyFormatter(payload?.totalAmount)}
          />
          <Avatar
            src={payload.serviceProviderImage}
            variant="square"
            sx={{ width: 80, height: 40, marginY: 4, alignSelf: "center" }}
          />

          {payload?.fullName && (
            <PlaceholderItem title="Name" value={payload?.fullName} />
          )}
          <PlaceholderItem title="Email" value={payload?.email} />
          <PlaceholderItem title="Phone Number" value={payload?.phoneNumber} />
        </Stack>
        <LoadingButton
          variant="contained"
          onClick={handlePayment}
          fullWidth
          loading={loading}
          loadingPosition="end"
          endIcon={<MoneyRounded />}
        >
          {loading ? "Please Wait..." : " Proceed to pay"}
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(VoucherPaymentDetails);
