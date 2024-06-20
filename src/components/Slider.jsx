import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Icons } from "../ultils/icons";
import { useState } from "react";
import Product from "./product";

const { GrFormNext, GrFormPrevious } = Icons;
function Slider({ list, many }) {
    const [hove, setHove] = useState(false);
    return (
        <div
            onMouseEnter={() => setHove(true)}
            onMouseLeave={() => setHove(false)}
            className="slide-container relative">
            <Swiper
                // effect="coverflow"
                grabCursor={true}
                // centeredSlides={true}
                // loop={true}

                effect="cube"
                spaceBetween={30}
                slidesPerView={1}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                navigation={{
                    nextEl: ".next",
                    prevEl: ".pre",
                    clickable: true,
                }}
                loop={true}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={800}
                modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}>
                {list &&
                    list?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="flex w-full justify-center">
                                    <div className="h-[550px] w-full">
                                        <img
                                            className=" h-[100%] w-[100%] object-cover"
                                            src={item.img}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>

            <a
                className={`pre ${
                    hove ? "flex" : "hidden"
                } cursor-pointer absolute top-[45%] left-4 p-1 bg-yellow-400 rounded-[50%] z-30`}>
                <GrFormPrevious size={"30px"} color={"white"} />
            </a>

            <a
                className={`${
                    hove ? "flex" : "hidden"
                } next cursor-pointer p-1 bg-yellow-400 rounded-[50%] absolute top-[45%] right-4 z-30`}>
                <GrFormNext size={"30px"} />
            </a>
        </div>
    );
}

export default Slider;
