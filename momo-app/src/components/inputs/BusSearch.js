import React from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { cities_regions } from "../../mocks/cities";

const BusSearch = ({ label, value, setValue, icon }) => {
  return (
    <Autocomplete
      options={cities_regions}
      fullWidth
      closeText=" "
      isOptionEqualToValue={(option, value) =>
        value.id === undefined || value.id === "" || option.id === value.id
      }
      getOptionLabel={(option) => `${option.city},${option.region}` || ""}
      value={value}
      onChange={(e, value) => setValue(value)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            placeholder={label}
            fullWidth
            size="medium"
            InputProps={{
              ...params.InputProps,
              sx: {
                borderRadius: 4,
              },

              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end"></InputAdornment>,
            }}
          />
        );
      }}
    />
  );
};

export default BusSearch;
