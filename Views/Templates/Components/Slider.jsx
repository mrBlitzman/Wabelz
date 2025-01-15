import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import img1 from '../../Assets/Images/slider-img/3.png';
import img2 from '../../Assets/Images/slider-img/6.png';
import img3 from '../../Assets/Images/slider-img/9.png';
import img4 from '../../Assets/Images/slider-img/12.png';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Slider(){
    return (
        <div className='slider-container'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={0}
                loop={true}
                coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
                }}
                initialSlide={2}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
            >
                <SwiperSlide><img src={img1} alt="" className='slide-img' /></SwiperSlide>
                <SwiperSlide><img src={img2} alt="" className='slide-img' /></SwiperSlide>
                <SwiperSlide><img src={img3} alt="" className='slide-img' /></SwiperSlide>
                <SwiperSlide><img src={img4} alt="" className='slide-img' /></SwiperSlide>
            </Swiper>
        </div>
      );
}