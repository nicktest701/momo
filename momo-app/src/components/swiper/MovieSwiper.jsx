import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y, Scrollbar } from "swiper";
import { EffectFade } from "swiper";

// Styles must use direct files imports
import "swiper/css/bundle";
import "swiper/css"; // core Swiper
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import _ from "lodash";
import { CINEMA_IMAGES } from "../../constants";
import styles from "../../styles/Movie.module.css";
import MovieSwiperContent from "../MovieSwiperContent";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllVouchersCategory } from "../../api/categoryAPI";
function MovieSwiper() {
  const [movies, setMovies] = useState([]);

  useQuery({
    queryKey: ["movie-category"],
    queryFn: () => getAllVouchersCategory("cinema"),
    onSuccess: (cinemaTickets) => {
      if (!_.isEmpty(cinemaTickets)) {
        const modifiedTickets = _.orderBy(
          _.slice(cinemaTickets, 0, 10),
          "createdAt",
          "desc"
        );

        setMovies(modifiedTickets);
      }
    },
  });

  return (
    <Swiper
      className={styles.swiper}
      effect="fade"
      modules={[Autoplay, Navigation, A11y, Scrollbar, EffectFade]}
      speed={2000}
      spaceBetween={10}
      centeredSlides={true}
      loop
      autoplay={{
        delay: 3000,
      }}
      pagination
    >
      {movies.length !== 0 ? (
        movies.map((movie) => {
          return (
            <SwiperSlide className={styles.swiper_slide} key={movie?._id}>
              <MovieSwiperContent
                id={movie?._id}
                img={CINEMA_IMAGES.poster_1}
                content={movie.details}
              />
            </SwiperSlide>
          );
        })
      ) : (
        <SwiperSlide className={styles.swiper_slide}>
          <MovieSwiperContent
            img={CINEMA_IMAGES.poster_1}
            content="Frebby Tech Consults"
          />
        </SwiperSlide>
      )}

     
    </Swiper>
  );
}

export default MovieSwiper;
