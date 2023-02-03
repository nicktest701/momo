import { AirplaneTicketRounded } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCinema } from "../../api/cinemaAPI";
import Back from "../../components/Back";
import { CINEMA_IMAGES, currencyFormatter } from "../../constants";
import styles from "../../styles/Movie.module.css";

function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = () => {
    navigate(`buy`, {
      replace: true,
    });
  };

  const movie = useQuery({
    queryKey: ["movie-category"],
    queryFn: () => getCinema(id),
    enabled: !!id,
    onSuccess: (cinemaTicket) => {},
  });

  return (
    <Box
      style={{
        position: "relative",
        background: `linear-gradient(to top ,rgba(0, 0, 0, 1), rgba(0, 0, 0, .3) ),url(${CINEMA_IMAGES.poster_3})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100%",
        padding: 4,
      }}
    >
      <Back color="secondary" bg="primary.main" />

      <div className={styles.movie_content}>
        <Typography variant="h3">{movie?.data?.details?.movie}</Typography>
        <Typography variant="caption">National Theatre</Typography>

        <Typography>
          {moment(movie?.data?.details?.date).format("dddd,Do MMMM YYYY")}
        </Typography>
        <Divider flexItem orientation="vertical" />
        <Typography color="secondary">
          {moment(movie?.data?.details?.time).format("h:mm a")}
        </Typography>

        <Typography variant="h5" color="error">
          {currencyFormatter(movie?.data?.price)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<AirplaneTicketRounded />}
          onClick={handleNavigate}
        >
          Buy Ticket
        </Button>
      </div>
    </Box>
  );
}

export default Movie;
