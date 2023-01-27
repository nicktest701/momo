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
import Transition from "../Transition";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomTimePicker from "../inputs/CustomTimePicker";
import moment from "moment";
const AddStadiumCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const [voucherType, setVoucherType] = useState("");
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [venue, setVenue] = useState("");
  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [price, setPrice] = useState(Number(0));
  const [message, setMessage] = useState("");

  const initialValues = {
    category: "stadium",
    voucherType,
    home,
    away,
    price,
    venue,
    date: moment(date).format("dddd,Do MMMM YYYY"),
    time: moment(time).format("h:mm a"),
    message,
  };

  const { mutateAsync } = useMutation(postCategory);
  const onSubmit = (values, option) => {
    const newMatchTicket = {
      category: values.category,
      voucherType: `${values.home} Vs ${values.away}(${values.voucherType})`,
      price: Number(values.price),
      details: {
        matchType: values.voucherType,
        home: values.home,
        away: values.away,
        venue: values.venue,
        date: values.date,
        time: values.time,
        message: values.message,
      },
    };

    mutateAsync(newMatchTicket, {
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
    customDispatch({ type: "openStadiumCategory", payload: false });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, handleSubmit }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.stadiumCategory.open}
          >
            <DialogTitle>New Stadium Ticket</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <TextField
                  size="small"
                  label="Match Type"
                  value={voucherType}
                  onChange={(e) => setVoucherType(e.target.value)}
                  error={Boolean(touched.voucherType && errors.voucherType)}
                  helperText={
                    touched.voucherType && errors.voucherType
                      ? errors.voucherType
                      : "eg.Friendly Match,Cup Final,League Match"
                  }
                />
                <TextField
                  size="small"
                  label="Home Team"
                  value={home}
                  onChange={(e) => setHome(e.target.value)}
                  error={Boolean(touched.home && errors.home)}
                  helperText={
                    touched.home && errors.home ? errors.home : "eg. TeamA"
                  }
                />
                <TextField
                  size="small"
                  label="Away Team"
                  value={away}
                  onChange={(e) => setAway(e.target.value)}
                  error={Boolean(touched.away && errors.away)}
                  helperText={
                    touched.away && errors.away ? errors.away : "eg. TeamB"
                  }
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
                  label="Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  error={Boolean(touched.venue && errors.venue)}
                  helperText={
                    touched.venue && errors.venue
                      ? errors.venue
                      : "eg. Kumasi,Ghana"
                  }
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

export default React.memo(AddStadiumCategory);
