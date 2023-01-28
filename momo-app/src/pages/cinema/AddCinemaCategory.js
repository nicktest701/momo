import React, { useContext, useState, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import {
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
import Transition from "../../components/Transition";
import moment from "moment";
import CustomTimePicker from "../../components/inputs/CustomTimePicker";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
const AddCinemaCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const [voucherType, setVoucherType] = useState("");
  const [theatre, setTheatre] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [price, setPrice] = useState(Number(0));
  const [message, setMessage] = useState("");

  const initialValues = {
    category: "cinema",
    voucherType,
    price,
    theatre,
    location,
    date: moment(date),
    time: moment(time),
    message,
  };

  const { mutateAsync } = useMutation(postCategory);
  const onSubmit = (values, option) => {
    const newCinemaTicket = {
      category: values.category,
      voucherType: values.voucherType,
      price: values.price,
      details: {
        movie: values.voucherType,
        theatre: values.theatre,
        location: values.location,
        date: values.date,
        time: values.time,
        message: values.message,
      },
    };

    console.log(newCinemaTicket);
    mutateAsync(newCinemaTicket, {
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
    customDispatch({ type: "openAddCinemaCategory", payload: false });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, errors, touched, handleSubmit }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.cinemaCategory.open}
          >
            <DialogTitle>New Cinema Ticket</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <TextField
                  size="small"
                  label="Movie Name"
                  value={values.voucherType}
                  onChange={(e) => setVoucherType(e.target.value)}
                  error={Boolean(touched.voucherType && errors.voucherType)}
                  helperText={touched.voucherType && errors.voucherType}
                />

                <TextField
                  size="small"
                  type="number"
                  inputMode="numeric"
                  label="Price"
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
                <TextField
                  size="small"
                  label="Cinema/Theatre Name"
                  value={theatre}
                  onChange={(e) => setTheatre(e.target.value)}
                  error={Boolean(touched.theatre && errors.theatre)}
                  helperText={touched.theatre && errors.theatre}
                />
                <TextField
                  size="small"
                  label="Cinema/Theatre Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
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

export default React.memo(AddCinemaCategory);
