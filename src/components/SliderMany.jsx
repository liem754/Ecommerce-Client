import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/swiper-bundle.min.css";
import Product from "./product";

function SliderMany({ list, news, md, lg }) {
    return (
        <div className="slide-container relative">
            <Swiper
                grabCursor={true}
                effect="cube"
                spaceBetween={30}
                slidesPerView={md ? 2 : lg ? 4 : 1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={800}
                modules={[Autoplay, Pagination, Navigation, Scrollbar]}>
                {list &&
                    list?.map(item => {
                        return (
                            <SwiperSlide key={item._id}>
                                <Product
                                    title={item.title}
                                    img={item.images[1]}
                                    price={item.price}
                                    cate={item.category}
                                    id={item._id}
                                    slug={item.slug}
                                    news={news}
                                    star={item.totalRatings}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
}

export default SliderMany;
