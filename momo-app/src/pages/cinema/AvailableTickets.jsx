import React, { useState } from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllVouchersCategory } from "../../api/categoryAPI";
import AvailableCinemaTicketItem from "../../components/items/AvailableCinemaTicketItem";

function AvailableTickets() {
  const [movies, setMovies] = useState([]);

  useQuery({
    queryKey: ["movie-category"],
    queryFn: () => getAllVouchersCategory("cinema"),
    onSuccess: (cinemaTickets) => {
  
      setMovies(cinemaTickets);
    },
  });

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        gap: 5,
      }}
    >
      {movies?.length !== 0
        ? movies?.map((movie) => (
            <AvailableCinemaTicketItem key={movie?._id} {...movie} />
          ))
        : null}
    </Container>
  );
}

export default AvailableTickets;
