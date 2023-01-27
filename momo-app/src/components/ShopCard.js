import React from "react";
import { Typography, Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function ShopCard({ title, img, content, path }) {
  const cardStyles = () => {
    return {
      backgroundColor: "#fff",
      borderRadius: 1,
      justifyContent: "center",
      alignItems: "center",
      borderTop: "solid 2px #008000",
      padding: 2,
      transition: "all 250ms ease-in-out",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      "&:hover": {
        transform: "scale(1.04)",
      },
    };
  };
  return (
    <Stack sx={cardStyles()} spacing={3}>
      <Typography
        title={title}
        sx={{ textAlign: "center",}}
        variant="h6"
      >
        {title}
      </Typography>
      <Avatar
        variant="square"
        src={img}
        alt="imag"
        sx={{ width: 80, height: 80 }}
      />

      <Typography variant="body2">{content}</Typography>
      <Link className="button-link" to={path}>
        Proceed to buy
      </Link>
    </Stack>
  );
}

export default ShopCard;
