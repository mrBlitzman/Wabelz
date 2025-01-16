import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import img1 from "../../Assets/Images/slider-img/fluxoria.png";
import img2 from "../../Assets/Images/slider-img/novatio.png";
import img3 from "../../Assets/Images/slider-img/ecofuture.png";
import img4 from "../../Assets/Images/slider-img/brightsparkai.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import useMediaQuery from "../../Assets/Scripts/Hooks/useMediaQuery.js";

export default function Slider() {
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  return (
    <div className="slider-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={isSmallScreen ? 1 : 3}
        spaceBetween={0}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        initialSlide={0}
        pagination={true}
        navigation={{
          enabled: true,
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        <SwiperSlide>
          <img src={img1} alt="" className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" className="slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" className="slide-img" />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
}
