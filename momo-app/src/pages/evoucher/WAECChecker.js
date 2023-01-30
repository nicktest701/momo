import React, { useState, useMemo, useContext } from "react";
import {
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  Avatar,
  Breadcrumbs,
  Container,
  Autocomplete,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik } from "formik";
//components

import { currencyFormatter, getCode, IMAGES } from "../../constants";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useGetVoucherCategory } from "../../hooks/useGetVoucherCategory";
import { waecValidationSchema } from "../../config/validationSchema";

function WAECChecker() {
  const { customDispatch } = useContext(CustomContext);

  const [categoryType, setCategoryType] = useState({
    id: "",
    voucherType: "",
    price: 0,
  });
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState("");

  ///Get All waec categories
  const { categories } = useGetVoucherCategory("waec");

  ///Service Provider Info
  const getServiceProviderInfo = useMemo(() => {
    return getCode(phoneNumber);
  }, [phoneNumber]);

  //Calculate total amount
  const grandTotal = useMemo(() => {
    const total = Number(categoryType?.price || 0) * Number(quantity);
    return total;
  }, [categoryType, quantity]);

  const initialValues = {
    category: "waec",
    categoryType,
    quantity,
    totalAmount: grandTotal,
    email,
    phoneNumber,
  };
  const onSubmit = (values) => {
    // values.voucherType=`${categoryType.voucherType} Voucher`
    values.serviceProvider = getServiceProviderInfo.providerName;
    values.serviceProviderImage = getServiceProviderInfo.image;
    values.agentName = "Nana Akwasi";
    values.agentPhoneNumber = phoneNumber;
    values.agentEmail = email;

    customDispatch({
      type: "getVoucherPaymentDetails",
      payload: { open: true, data: values },
    });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "whitesmoke",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            paddingY: 2,
          }}
        >
          <Breadcrumbs sx={{ paddingBottom: 2 }}>
            <Typography variant="body2">
              <Link to="/"> Home</Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/evoucher">E-Voucher</Link>
            </Typography>
            <Typography variant="body2">WAEC Checker</Typography>
          </Breadcrumbs>

          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar src={IMAGES.waec1} sx={{ width: 30, height: 30 }} />
            <Typography variant="h6">WAEC Results E-Voucher</Typography>
          </Stack>
        </Container>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(to top right,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${IMAGES.waec1})`,
            backgroundSize: "cover",
            paddingY: 5,
            minHeight: "80vh",
          }}
        >
          <Paper
            sx={{
              width: { xs: 260, md: 350 },
              padding: { xs: 2, sm: 3 },
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={waecValidationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {({
                errors,
                values,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => {
                return (
                  <Stack spacing={2}>
                    <Autocomplete
                      options={categories}
                      size="small"
                      value={categoryType}
                      onChange={(e, value) => setCategoryType(value)}
                      noOptionsText="No Voucher available"
                      isOptionEqualToValue={(option, value) =>
                        value.id === undefined ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.voucherType || ""}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            label=" Voucher Type"
                            size="small"
                            error={Boolean(
                              touched?.categoryType?.voucherType &&
                                errors?.categoryType?.voucherType
                            )}
                            helperText={
                              touched?.categoryType?.voucherType &&
                              errors?.categoryType?.voucherType
                            }
                          />
                        );
                      }}
                    />
                    <small>
                      Price- {currencyFormatter(categoryType?.price)}
                    </small>

                    <TextField
                      size="small"
                      type="number"
                      inputMode="numeric"
                      variant="outlined"
                      label="Quantity"
                      InputProps={{
                        inputProps: { min: 1, max: 1000, maxLength: 4 },
                      }}
                      required
                      fullWidth
                      value={values.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      error={Boolean(touched.quantity && errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Total Amount"
                      label="Total Amount"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">GH¢</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">p</InputAdornment>
                        ),
                        readOnly: true,
                      }}
                      value={values.totalAmount}
                    />
                    <TextField
                      size="small"
                      type="email"
                      variant="outlined"
                      label="Email Address"
                      required
                      value={values.email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
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
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
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
                    <Stack spacing={1} paddingY={1}>
                      <Button variant="contained" onClick={handleSubmit}>
                        Buy
                      </Button>
                    </Stack>
                  </Stack>
                );
              }}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default WAECChecker;
