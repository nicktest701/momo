import React, { useContext, useState, useMemo } from "react";
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
import { addCategoryOptions } from "../../config/addCategoryOptions";
import Transition from "../Transition";

const AddCategory = () => {
  const category = localStorage.getItem("category");

  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);

  //state
  const [voucherType, setVoucherType] = useState("");

  //load options
  const options = useMemo(() => {
    setVoucherType("");
    return addCategoryOptions(category);
  }, [category]);

  const initialValues = {
    category: category ?? "",
    voucherType,
    price: Number(0),
  };

  const { mutateAsync } = useMutation(postCategory);
  const onSubmit = (values, option) => {
    mutateAsync(values, {
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
    customDispatch({ type: "openAddCategory", payload: false });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.category.open}
            onClose={handleClose}
          >
            <DialogTitle>New {options.autocompleteLabel}</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <Autocomplete
                  options={options.cat}
                  freeSolo
                  noOptionsText="No option avaiable"
                  value={voucherType || null}
                  onInputChange={(e, value) => setVoucherType(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField {...props} label={options.autocompleteLabel} />
                  )}
                />
                <TextField
                  type="number"
                  inputMode="decimal"
                  label="Price"
                  placeholder="Price here"
                  value={values.price}
                  onChange={handleChange("price")}
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

export default React.memo(AddCategory);
