import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Scrollbar } from "swiper";
import { EffectCube} from "swiper";

// Styles must use direct files imports
import "swiper/css/bundle";
import "swiper/css"; // core Swiper
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";


import { Button, Typography } from "@mui/material";
import { IMAGES } from "../constants";

function HomeSwiper() {
  const SwiperContent = ({ content, img }) => {
    return (
      <>
        <div className="swiper-content">
          <Typography
            paddingBottom={2}
            sx={{ fontSize: { xs: 36, md: 48, lg: 72 } }}
          >
            {content}
          </Typography>
          <Typography variant="body2" paddingBottom={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            nihil.
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            disableElevation
            sx={{ paddingX: 5 }}
          >
            Learn More
          </Button>
        </div>
        <img src={img} alt="swiper-img" />
      </>
    );
  };

  return (
    <Swiper
      className="swiper"
      effect="cube"
      modules={[Autoplay, Pagination, Navigation, A11y, Scrollbar, EffectCube]}
      speed={2000}
      spaceBetween={30}
      centeredSlides={true}
      loop
      autoplay={{
        delay: 5000,
        // disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
    >
      <SwiperSlide className="swiper-slide" style={{ position: "relative" }}>
        <SwiperContent img={IMAGES.bgImage1} content="Frebby Tech Consults" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage2} content="Prepaid Units" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage3} content="Evoucher & Pincodes" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage5} content="Bulk Airtime & EVD's" />
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeSwiper;
