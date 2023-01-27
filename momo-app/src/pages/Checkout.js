import { ArrowBackIosSharp, Check } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { sendVoucherMail } from "../api/transactionAPI";
import logo from "../assets/images/coat_of_arms.png";
import success from "../assets/images/success.png";
import CheckOutItem from "../components/items/CheckOutItem";
import { CustomContext } from "../context/providers/CustomProvider";

function Checkout() {
  const navigate = useNavigate();

  const {
    customState: { transaction },
  } = useContext(CustomContext);

  // useEffect(() => {
  //   if (!transaction) {
  //     navigate("/evoucher", { replace: true });
  //   }
  // }, [transaction, navigate]);

  const [loading, setLoading] = useState(true);

  const [previewLoading, setPreviewLoading] = useState(false);

  // Public  vouchers to email
  const sendVoucher = useQuery(
    ["publish-vouchers"],
    () => sendVoucherMail(transaction?._id),
    {
      enabled: !!transaction?._id,
      onSuccess: (data) => {
        setLoading(false);
      },

      onError: (error) => {
        setLoading(false);
      },
    }
  );

  const handlePreviewCheckouts = () => {
    setPreviewLoading(true);
    navigate("/checkout-print", {
      replace: false,
      state: {
        id: transaction?._id,
      },
    });
    setPreviewLoading(false);
  };
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Box
        sx={{
          minHeight: "60px",
          backgroundColor: "#333",
          padding: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <IconButton edge="start">
          <Avatar src={logo} alt="logo.png" />
        </IconButton>
        <Typography>Frebby Tech Consults</Typography>
      </Box>
      <Container
        sx={{
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            minHeight: 500,
            minWidth: { xs: 350, md: 700 },
            padding: 6,
          }}
        >
          <IconButton href="evoucher">
            <ArrowBackIosSharp />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Payment Succesful</Typography>
            <Avatar src={success} />
          </Box>
          <Divider />

          <Stack spacing={2} paddingTop={6} paddingBottom={4}>
            <CheckOutItem title="Invoice No." value="8739248739827" />
            <CheckOutItem title="Date" value="22/34/2033" />
            <CheckOutItem title="Payment Type." value="Mobile Money" />
            <CheckOutItem title="Agent" value="Mtn" />
            <CheckOutItem title="Mobile No." value="0248798798" />
            <CheckOutItem title="Email Address" value="Akwasi@gmail.com" />
            <CheckOutItem title="Transaction id" value="0248798798" />
            <Divider flexItem />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            paddingY={2}
          >
            <LoadingButton
              loading={previewLoading}
              variant="contained"
              onClick={handlePreviewCheckouts}
            >
              Preview Voucher
            </LoadingButton>
          </Stack>

          <Stack justifyContent="center">
            <LoadingButton
              loading={loading}
              onClick={() => sendVoucher.refetch()}
              endIcon={sendVoucher.data ? <Check /> : null}
            >
              {sendVoucher.isLoading && "Processing"}
              {sendVoucher.data && "Email Sent"}
              {sendVoucher.isError && "Didn't get Email? Send Again"}
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Copyright &copy; frebbytech Consults || FrebbyTech Consults </p>
      </Box>
    </div>
  );
}

export default Checkout;
