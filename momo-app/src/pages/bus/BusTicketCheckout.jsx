import React, { useCallback, useMemo, useState } from "react";
import {
  Add,
  MoneyRounded,
  Remove,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { currencyFormatter, getCode, IMAGES } from "../../constants";

function BusTicketCheckout() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(parseInt(1));
  const [price, setPrice] = useState(200);

  const addItem = useCallback(() => setQuantity((prev) => prev + 1), []);
  const removeItem = useCallback(
    () => setQuantity((prev) => (prev <= 1 ? 1 : prev - 1)),
    []
  );

  const totalAmount = useMemo(
    () => parseFloat(quantity) * parseFloat(price),
    [quantity, price]
  );

  ///Service Provider Info
  const getServiceProviderInfo = useMemo(() => {
    return getCode(phoneNumber);
  }, [phoneNumber]);
  return (
    <Container sx={{ minHeight: "calc(100vh - 120px)", paddingX: 4 }}>
      <Stack direction="row" justifyContent="flex-end" spacing={2} paddingY={2}>
        <Typography variant="h5">Check Out</Typography>
        <ShoppingCartCheckoutRounded sx={{ width: 30, height: 30 }} />
      </Stack>
      <Divider />
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          bgcolor: "secondary.main",
          color: "primary.contrastText",
          padding: 1,
          marginTop: 1,
        }}
      >
        Bus Details
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        height="inherit"
        spacing={3}
        paddingY={2}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          width="100%"
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <img
            loading="lazy"
            src={IMAGES.bus1}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain",
            }}
            alt="bus_image"
          />
          <Stack spacing={1}>
            <Typography color="secondary" sx={{ fontWeight: "bold" }}>
              Kumasi to Accra
            </Typography>
            <Typography variant="body2">
              {moment().format("dddd,Do MMMM YYYY")}
            </Typography>

            <Typography variant="body2">
              {moment().format("h:mm:ss a")}
            </Typography>
            <Typography variant="h6">{currencyFormatter(price)}</Typography>

            <ButtonGroup sx={{ paddingTop: 2, borderRadius: 0 }} size="small">
              <Button
                color="secondary"
                startIcon={<Add />}
                onClick={addItem}
              ></Button>
              <Button size="large" sx={{ width: 80 }}>
                {quantity}
              </Button>
              <Button
                variant="contained"
                startIcon={<Remove />}
                onClick={removeItem}
              ></Button>
            </ButtonGroup>
          </Stack>
        </Stack>

        <Stack
          width={{ xs: "100%", md: "40%" }}
          spacing={2}
          border="solid 1px #000"
          borderRadius={2}
          padding={2}
        >
          <Typography
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              padding: 1,
              textAlign: "center",
              width: "100%",
            }}
          >
            Payment Details
          </Typography>
          <List>
            <ListItem divider>
              <ListItemText primary="Price" />
              <ListItemSecondaryAction>
                {currencyFormatter(price)}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Quantity" />
              <ListItemSecondaryAction>
                <IconButton color="primary">{quantity}</IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="TOTAL"
                primaryTypographyProps={{
                  fontWeight: "bold",
                }}
              />
              <ListItemSecondaryAction>
                {currencyFormatter(totalAmount)}
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <Typography variant="caption">Personal Info</Typography>
          <TextField
            size="small"
            type="email"
            variant="outlined"
            label="Email Address"
            required
            // value={values.email}
            onChange={(e) => setEmail(e.target.value)}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          <TextField
            size="small"
            type="tel"
            inputMode="tel"
            variant="outlined"
            label="Phone Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            // error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            // helperText={touched.phoneNumber && errors.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar
                    variant="square"
                    src={getServiceProviderInfo?.image}
                    sx={{ width: 25, height: 20, marginRight: 2 }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton startIcon={<MoneyRounded />} variant="contained">
            Make Payment
          </LoadingButton>
        </Stack>
      </Stack>
      <Divider />
    </Container>
  );
}

export default BusTicketCheckout;
