import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Scrollbar } from "swiper";
import { EffectFade } from "swiper";

// Styles must use direct files imports
import "swiper/css/bundle";
import "swiper/css"; // core Swiper
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { CINEMA_IMAGES } from "../../constants";
import styles from "../../styles/Movie.module.css";
import MovieSwiperContent from "../MovieSwiperContent";
function MovieSwiper() {
  return (
    <Swiper
      className={styles.swiper}
      effect="fade"
      modules={[Autoplay, Pagination, Navigation, A11y, Scrollbar, EffectFade]}
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
      <SwiperSlide className={styles.swiper_slide}>
        <MovieSwiperContent
          img={CINEMA_IMAGES.poster_1}
          content="Frebby Tech Consults"
        />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <MovieSwiperContent
          img={CINEMA_IMAGES.poster_3}
          content="Prepaid Units"
        />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <MovieSwiperContent
          img={CINEMA_IMAGES.poster_4}
          content="Evoucher & Pincodes"
        />
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <MovieSwiperContent
          img={CINEMA_IMAGES.poster_5}
          content="Bulk Airtime & EVD's"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default MovieSwiper;
