import React, { useMemo, useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../assets/images/waec.jpg";
import { currencyFormatter, getCode } from "../../constants";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useGetVoucherCategory } from "../../hooks/useGetVoucherCategory";
import { universityValidationSchema } from "../../config/validationSchema";
function UniversityForms() {
  const { customDispatch } = useContext(CustomContext);

  const [categoryType, setCategoryType] = useState({
    id: "",
    voucherType: "",
    price: 0,
  });
  const [fullName, setFullName] = useState("Nana Akwasi");
  const [email, setEmail] = useState("akwasi@gmail.com");
  const [quantity, setQuantity] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("0244192837");

  ///Get All waec categories
  const { categories } = useGetVoucherCategory("university");

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
    category: "university",
    categoryType,
    quantity,
    totalAmount: grandTotal,
    fullName,
    email,
    phoneNumber,
  };

  const onSubmit = (values, options) => {
    values.serviceProvider = getServiceProviderInfo.providerName;
    values.serviceProviderImage = getServiceProviderInfo.image;
    values.agentName = fullName;
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
          height: "100%",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography>UNIVERSITY FORM E-VOUCHER</Typography>

          <Breadcrumbs>
            <Typography variant="body2">
              <Link to="/"> Home</Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/evoucher">E-Voucher</Link>
            </Typography>
            <Typography variant="body2">University Forms</Typography>
          </Breadcrumbs>
        </Container>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(to top right,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${logo})`,
            backgroundSize: "cover",
            paddingX: 3,
            paddingY: 5,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={universityValidationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            {({ errors, values, touched, handleSubmit }) => {
              return (
                <Container
                  sx={{
                    padding: 3,
                    bgcolor: "primary.contrastText",
                  }}
                  maxWidth="md"
                >
                  <Grid container spacing={3} paddingBottom={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            bgcolor: "secondary.main",
                            width: "inherit",
                            padding: 1,
                            color: "#fff",
                          }}
                        >
                          <Typography>Voucher Details</Typography>
                        </Box>
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
                                label="Select University"
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
                        <small style={{ textAlign: "center" }}>
                          Price- {currencyFormatter(categoryType?.price)}
                        </small>

                        <TextField
                          size="small"
                          type="number"
                          inputMode="numeric"
                          label="Quantity"
                          required
                          fullWidth
                          value={values.quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          error={Boolean(touched.quantity && errors.quantity)}
                          helperText={touched.quantity && errors.quantity}
                        />
                        <TextField
                          size="small"
                          placeholder="Total Amount"
                          label="Total Amount"
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                GH¢
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">p</InputAdornment>
                            ),
                            readOnly: true,
                          }}
                          value={values.totalAmount}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            bgcolor: "secondary.main",
                            width: "inherit",
                            padding: 1,
                            color: "#fff",
                          }}
                        >
                          <Typography>Personal Details</Typography>
                        </Box>

                        <TextField
                          size="small"
                          placeholder="Enter your Name"
                          label="Full Name"
                          required
                          value={values.fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          error={Boolean(touched.fullName && errors.fullName)}
                          helperText={touched.fullName && errors.fullName}
                        />

                        <TextField
                          size="small"
                          type="email"
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
                          label="Phone Number"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          error={Boolean(
                            touched.phoneNumber && errors.phoneNumber
                          )}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Avatar
                                  variant="square"
                                  src={getServiceProviderInfo?.image}
                                  sx={{ width: 25, height: 20, marginRight: 1 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ width: { xs: "100%", sm: 250 } }}
                    >
                      Buy
                    </Button>
                  </Stack>
                </Container>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

export default UniversityForms;
