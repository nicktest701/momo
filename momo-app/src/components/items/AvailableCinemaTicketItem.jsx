import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { CINEMA_IMAGES, currencyFormatter } from "../../constants";
function AvailableCinemaTicketItem({ _id, price, details }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`movie/${_id}`);
  };

  return (
    <Box
      // boxShadow="0 2px 3px rgba(0,0,0,0.9)"
      borderRadius={4}
      bgcolor="#161616"
      sx={{
        transition: "all 150ms ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          translate: "(10px,20px)",
        },
        overflow: "hidden",
      }}
      onClick={handleNavigate}
    >
      <img
        alt="album"
        src={
          // `${process.env.REACT_APP_API_LOCAL}/images/cinema/${details.cinema}` ??
          CINEMA_IMAGES.poster_10
        }
        style={{
          width: "100%",
          height: "60%",
          objectFit: "cover",
        }}
      />
      <Stack spacing={1} padding={2}>
        {/* <Avatar
          variant="rounded"
          src={CINEMA_IMAGES.poster_1}
          sx={{ width: 70, height: 100 }}
        /> */}
        <Typography
          color="secondary"
          variant="h6"
          fontWeight="500"
          sx={{ textShadow: "0 2px 3px rgba(0,0,0,0.9)" }}
        >
          {details?.movie}
        </Typography>
        <Typography color="error" fontWeight="500">
          {currencyFormatter(price)}
        </Typography>

        <Typography variant="caption" color="gray">
          {details?.theatre} | {details?.location}
        </Typography>

        {/* <Typography variant="caption" color="gray">
          {moment(details?.date).format("dddd,Do MMMM YYYY")}
        </Typography>
        <Typography variant="caption" color="gray">
          {moment(details?.time).format("h:mm a")}
        </Typography> */}
        <IconButton
          color="secondary"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleNavigate}
        >
          <ArrowForwardRounded />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default AvailableCinemaTicketItem;
