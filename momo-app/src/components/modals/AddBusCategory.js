import React, { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { postCategory } from "../../api/categoryAPI";
import Transition from "../Transition";
import CustomTimePicker from "../inputs/CustomTimePicker";
import CustomDatePicker from "../inputs/CustomDatePicker";
import moment from "moment";
import { cities_regions } from "../../mocks/cities";
const AddBusCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const [origin, setOrigin] = useState({ id: "", city: "", region: "" });
  const [destination, setDestination] = useState({
    id: "",
    city: "",
    region: "",
  });
  const [voucherType, setVoucherType] = useState(moment());

  const [price, setPrice] = useState(Number(0));

  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [message, setMessage] = useState("");

  const initialValues = {
    category: "bus",
    price,
    origin: origin.city,
    destination: destination.city,
    date: moment(date).format("dddd,Do MMMM YYYY"),
    time: moment(time).format("h:mm a"),
    message,
  };

  const { mutateAsync } = useMutation(postCategory);
  const onSubmit = (values, option) => {
    const newBusTicket = {
      category: values.category,
      voucherType: `${values.origin} to ${values.destination}`,
      price: values.price,
      details: {
        origin: values.origin,
        destination: values.destination,
        date: values.date,
        time: values.time,
        message: values.message,
      },
    };

    console.log(newBusTicket);

    mutateAsync(newBusTicket, {
      onSettled: () => {
        option.setSubmitting(false);

        queryClient.invalidateQueries(["category"]);
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  ///Close Add Category
  const handleClose = () => {
    customDispatch({ type: "openBusCategory", payload: false });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.busCategory.open}
          >
            <DialogTitle>New Bus Ticket</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                {/* <TextField
                  size="small"
                  label="Bus Type"
                  value={values.voucherType}
                  onChange={handleChange("voucherType")}
                  error={Boolean(touched.voucherType && errors.voucherType)}
                  helperText={touched.voucherType && errors.voucherType}
                /> */}
                <Autocomplete
                  options={cities_regions}
                  fullWidth
                  closeText=" "
                  disableClearable
                  isOptionEqualToValue={(option, value) =>
                    value.id === undefined ||
                    value.id === "" ||
                    option.id === value.id
                  }
                  getOptionLabel={(option) =>
                    `${option.city},${option.region}` || ""
                  }
                  value={origin}
                  onChange={(e, value) => setOrigin(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Origin(From)"
                      error={Boolean(touched.origin && errors.origin)}
                      helperText={
                        touched.origin && errors.origin
                          ? errors.origin
                          : "eg. Kumasi"
                      }
                    />
                  )}
                />

                {/* Destination  */}
                <Autocomplete
                  options={cities_regions}
                  fullWidth
                  closeText=" "
                  disableClearable
                  isOptionEqualToValue={(option, value) =>
                    value.id === undefined ||
                    value.id === "" ||
                    option.id === value.id
                  }
                  getOptionLabel={(option) =>
                    `${option.city},${option.region}` || ""
                  }
                  value={destination}
                  onChange={(e, value) => setDestination(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Destination(To)"
                      error={Boolean(touched.destination && errors.destination)}
                      helperText={
                        touched.destination && errors.destination
                          ? errors.destination
                          : "eg. Cape Coast"
                      }
                    />
                  )}
                />

                <TextField
                  size="small"
                  type="number"
                  inputMode="decimal"
                  label="Fare"
                  placeholder="Price here"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>GHS</Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>p</Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />

                <CustomDatePicker
                  value={date}
                  setValue={setDate}
                  customDateInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Date"
                      error={Boolean(touched.date && errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  )}
                />

                <CustomTimePicker
                  value={time}
                  setValue={setTime}
                  customTimeInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Time"
                      error={Boolean(touched.time && errors.time)}
                      helperText={touched.time && errors.time}
                    />
                  )}
                />

                <TextField
                  size="small"
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={Boolean(touched.message && errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 1 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton variant="contained" onClick={handleSubmit}>
                Add
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(AddBusCategory);
