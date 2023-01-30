import React, { useContext, useState } from "react";
import  LoadingButton  from "@mui/lab/LoadingButton";
 import Autocomplete from '@mui/material/Autocomplete'
 import Button from '@mui/material/Button'
 import Dialog from '@mui/material/Dialog'
 import DialogActions from '@mui/material/DialogActions'
 import DialogContent from '@mui/material/DialogContent'
 import DialogTitle from '@mui/material/DialogTitle'
 import InputAdornment from '@mui/material/InputAdornment'
 import Stack from '@mui/material/Stack'
 import TextField from '@mui/material/TextField'
 import Typography from '@mui/material/Typography'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { editCategory, getCategory } from "../../api/categoryAPI";
import Transition from "../../components/Transition";
import CustomTimePicker from "../../components/inputs/CustomTimePicker";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import moment from "moment";
import { cities_regions } from "../../mocks/cities";
const EditBusCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);

  const editData = customState.editBusCategory;
  const [origin, setOrigin] = useState({ id: "", city: "", region: "" });
  const [destination, setDestination] = useState({
    id: "",
    city: "",
    region: "",
  });

  const [price, setPrice] = useState(Number(0));

  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [message, setMessage] = useState("");

  const initialValues = {
    category: "bus",
    price,
    origin: origin,
    destination: destination,
    date: moment(date),
    time: moment(time),
    message,
  };

  const bus = useQuery({
    queryKey: ["category", editData?.data],
    queryFn: () => getCategory(editData?.data),
    enabled: !!editData?.data,
    onSuccess: (bus) => {
      setOrigin(bus.details.origin);
      setDestination(bus.details.destination);
      setPrice(bus.price);
      setTime(bus.details.time);
      setDate(bus.details.date);
      setMessage(bus.details.message);
    },
  });

  const { mutateAsync } = useMutation(editCategory);
  const onSubmit = (values, option) => {
    const newBusTicket = {
      id: bus?.data?._id,
      category: values.category,
      voucherType: `${values.origin.city} to ${values.destination.city}`,
      price: values.price,
      details: {
        origin: values.origin,
        destination: values.destination,
        date: values.date,
        time: values.time,
        message: values.message,
      },
    };

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

  ///Close Edit Bus Category
  const handleClose = () => {
    customDispatch({ type: "closeEditBusCategory" });
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
            open={editData.open}
          >
            <DialogTitle>Edit Bus Ticket</DialogTitle>
            {bus.isFetching && <Typography>Loading.....</Typography>}
            {bus.data && (
              <>
                <DialogContent>
                  <Stack rowGap={2} paddingY={2}>
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
                          error={Boolean(
                            touched.destination && errors.destination
                          )}
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
                      value={price || "0"}
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
                      value={message || ""}
                      onChange={(e) => setMessage(e.target.value)}
                      error={Boolean(touched.message && errors.message)}
                      helperText={touched.message && errors.message}
                    />
                  </Stack>
                </DialogContent>
                <DialogActions sx={{ padding: 1 }}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <LoadingButton variant="contained" onClick={handleSubmit}>
                    Save Changes
                  </LoadingButton>
                </DialogActions>
              </>
            )}
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(EditBusCategory);
