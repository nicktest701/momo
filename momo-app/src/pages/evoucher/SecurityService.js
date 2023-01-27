import React, { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  Avatar,
  MenuItem,
  Breadcrumbs,
  Grid,
} from "@mui/material";
import logo from "../../assets/images/waec.jpg";
// import logo2 from "../../assets/images/waec2.jpg";
import WaecCheckerPayment from "../../components/modals/VoucherPaymentDetails";
import { Link } from "react-router-dom";
import mtn from "../../assets/images/mtn.png";
import { COLORS } from "../../constants";

function SecurityService() {
  const [openWaec, setOpenWaec] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "inherit",
            padding: 2,
            backgroundColor: "whitesmoke",
          }}
        >
          <Breadcrumbs sx={{ paddingBottom: 2 }}>
            <Typography variant="body2">
              <Link to="/"> Home</Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/evoucher">E-Voucher</Link>
            </Typography>
            <Typography variant="body2" >
              Security Service
            </Typography>
          </Breadcrumbs>

          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar src={logo} sx={{ width: 30, height: 30 }} />
            <Typography sx={{ fontWeight: "700" }}>
              Security Service Forms E-Voucher
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "150vh", md: "90vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(to top right,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${logo})`,
            backgroundSize: "cover",
            // filter: "blur(3px)",
          
          }}
        ></Box>

        <Paper
          elevation={1}
          sx={{
            position: "absolute",
            width: { xs: 280, sm: 400, md: 800 },
            padding: 3,
            borderTop: "2px solid green",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: 0.9,
            top: 220,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={3} paddingBottom={8}>
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Box
                  sx={{
                    backgroundColor: COLORS.secondary,
                    width: "inherit",
                    padding: 1,
                    color: "#fff",
                  }}
                >
                  <Typography>Voucher Details</Typography>
                </Box>
                <TextField
                  size="small"
                  select
                  variant="outlined"
                  placeholder="Select University"
                  label="Select University"
                  required
                  fullWidth
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                >
                  <MenuItem>BECE</MenuItem>
                  <MenuItem>WASSCE (School),WASSCE (Private)</MenuItem>
                  <MenuItem> NOV-DEC</MenuItem>
                  <MenuItem>SSCE,ABCE,GBCE</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  select
                  variant="outlined"
                  placeholder="Select Form-Type"
                  label="Select Form-Type"
                  required
                  fullWidth
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                  helperText="Price-GHS220.00"
                >
                  <MenuItem>BECE</MenuItem>
                  <MenuItem>WASSCE (School),WASSCE (Private)</MenuItem>
                  <MenuItem> NOV-DEC</MenuItem>
                  <MenuItem>SSCE,ABCE,GBCE</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  type="number"
                  variant="outlined"
                  placeholder="Enter Quantity"
                  label="Quantity"
                  InputProps={{
                    inputProps: { min: 1, max: 1000, maxLength: 4 },
                  }}
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                  // onInput={(e) => {
                  //   e.target.value = Math.max(0, parseInt(e.target.value))
                  //     .toString()
                  //     .slice(1, 4);
                  // }}
                  required
                  fullWidth
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
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Box
                  sx={{
                    backgroundColor: COLORS.secondary,
                    width: "inherit",
                    padding: 1,
                    color: "#fff",
                  }}
                >
                  <Typography>Personal Details</Typography>
                </Box>

                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Enter your Name"
                  label="Full Name"
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                  required
                  fullWidth
                />

                <TextField
                  size="small"
                  type="email"
                  variant="outlined"
                  placeholder="Enter Email Address here"
                  label="Email Address"
                  required
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                />

                <TextField
                  size="small"
                  type="tel"
                  variant="outlined"
                  placeholder="Enter Phone Number"
                  label="Phone Number"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          variant="square"
                          src={mtn}
                          sx={{ width: 25, height: 20, marginRight: 2 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: COLORS.secondary,
                    },
                  }}
                />
              </Stack>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            disableElevation
            disableRipple
            size="large"
            sx={{ paddingX: 12 }}
            onClick={() => setOpenWaec(true)}
          >
            Buy
          </Button>
        </Paper>
      </Box>

      <WaecCheckerPayment open={openWaec} setOpen={setOpenWaec} />
    </>
  );
}

export default SecurityService;
