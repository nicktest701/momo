import { AirplaneTicketRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import styles from "../styles/Movie.module.css";
function MovieSwiperContent({ content, img }) {
  return (
    <>
      <div className={styles.swiper_content}>
        <Typography variant="h4">The Sin City</Typography>
        <Typography variant='body2'>{new Date().toUTCString()}</Typography>
        <Typography variant="caption">National Theatre</Typography>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<AirplaneTicketRounded />}
        >
          Buy Ticket
        </Button>
      </div>
      <img src={img} alt="swiper-img" />
    </>
  );
}
export default MovieSwiperContent;
