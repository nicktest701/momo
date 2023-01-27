import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants";

function BusPreviewItem() {
  const navigate = useNavigate();

  const handleBuyTicket = () => {
    navigate("buy");
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: 1,
          borderLeft: "2px #008000 solid",
        }}
      >
        <img
          loading="lazy"
          src={IMAGES.bus1}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
          alt="bus_image"
        />
        <Stack spacing={1}>
          <Typography color="secondary" sx={{ fontWeight: "bold" }}>
            Kumasi to Accra
          </Typography>
          <Typography variant="body2">
            {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="body2">{new Date().toTimeString()}</Typography>
          <Divider />
          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end", borderRadius: 2 }}
            onClick={handleBuyTicket}
            size="small"
          >
            Buy Ticket
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default BusPreviewItem;
