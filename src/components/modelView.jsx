import { memo, useEffect, useState } from "react";
import { Icons } from "ultils/icons";
import ReactImageMagnify from "react-image-magnify";
import { getProduct } from "store/product/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import DOMPurify from "dompurify";

import { Pagination, Navigation, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { format, formatStar } from "ultils/format";
import { apiUpdateCart } from "apis";
import Swal from "sweetalert2";
import * as api from "apis";
import { IdCurrent } from "store/user/userSlice";
const {
    GoDotFill,

    GrFormPrevious,
    GrFormNext,
} = Icons;
function ModalView({ pid, onClick }) {
    const [number, setNumber] = useState(1);

    const [co, setCo] = useState("BLACK");

    const { product } = useSelector(state => state.product);
    const [active, setActive] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct(pid));
    }, [pid]);
    const handle = async () => {
        const rs = await apiUpdateCart({
            pid: pid,
            quantity: number,
            color: co,
            price:
                co !== "BLACK"
                    ? +product?.price * number
                    : +product?.price > 2000000
                    ? (+product?.price - 500000) * number
                    : (+product?.price - 50000) * number,
        });
        if (rs.success) {
            Swal.fire("Congratulation", rs.mes, "success");
            const rss = await api.apiCurrent();
            if (rss.success) {
                dispatch(
                    IdCurrent({
                        idCurrent: rss.rs._id,
                        data: rss.rs,
                    }),
                );
            }
        }
    };
    return (
        <div
            onClick={onClick}
            className="lg:w-[50%] flex gap-8 bg-white z-20 p-5 ">
            <div className="w-[47%]">
                <div className="px-2 py-2 w-full h-[400px] border flex justify-center items-center">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                isFluidWidth: true,
                                src: product?.images[active],
                            },
                            largeImage: {
                                src: product?.images[active],
                                width: 1200,
                                height: 1800,
                            },
                        }}
                    />
                    {/* <img
                            onMouseEnter={() => setHove(true)}
                            onMouseLeave={() => setHove(false)}
                            src={product?.images[active]}
                            alt=""
                            className={`${hove && "scale-150	"}`}
                        /> */}
                </div>
                <div className="w-full p-1 mt-3 relative">
                    <Swiper
                        // effect="coverflow"
                        grabCursor={true}
                        // centeredSlides={true}
                        // loop={true}

                        effect="slide"
                        spaceBetween={10}
                        slidesPerView={3}
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
                        speed={800}
                        modules={[Pagination, Navigation, EffectCoverflow]}>
                        {product?.images &&
                            product?.images?.map((item, index) => {
                                return (
                                    <SwiperSlide>
                                        <div
                                            key={index}
                                            className="flex h-[200px] w-full justify-center">
                                            <div
                                                onClick={() => setActive(index)}
                                                className=" h-[100%] w-full p-2 border-2">
                                                <img
                                                    className="h-full w-[100%]"
                                                    src={item}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                    <a
                        className={`pre cursor-pointer absolute top-[45%] left-4 p-1 bg-gray-300 bg-opacity-50 rounded-[50%] z-30`}>
                        <GrFormPrevious size={"30px"} color={"white"} />
                    </a>

                    <a
                        className={`next cursor-pointer p-1 bg-gray-300 bg-opacity-50 rounded-[50%] absolute top-[45%] right-4 z-30`}>
                        <GrFormNext size={"30px"} />
                    </a>
                </div>
            </div>
            <div className="w-[50%] flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <h2 className=" font-medium text-4xl">
                        {co === "BLACK"
                            ? format(
                                  +product?.price > 2000000
                                      ? +product?.price - 500000
                                      : +product?.price - 50000,
                              )
                            : format(product?.price)}
                    </h2>
                    <div className="flex items-center gap-2 py-2">
                        <div className="flex gap-1 py-1">
                            {formatStar(product?.totalRatings)}
                        </div>
                        <h2 className="text-xs mt-[1px] text-gray-500">{`Đã bạn được ${product?.sold}`}</h2>
                    </div>
                    <div className="">
                        {product?.description?.length > 1 &&
                            product?.description?.map((item, index) => (
                                <h2
                                    key={index}
                                    className="flex items-center gap-1">
                                    <GoDotFill size={"12px"} />
                                    <span>{item}</span>
                                </h2>
                            ))}
                        {product?.description?.length === 1 && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        product?.description[0],
                                    ),
                                }}></div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 py-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-medium">Color:</h2>
                            {product?.color?.split(" ").map(el => (
                                <span
                                    onClick={() => setCo(el)}
                                    className={`p-2 ${
                                        co === el ? "border border-black" : ""
                                    }`}>
                                    {el}
                                </span>
                            ))}
                            {/* <span>{product?.color || "Mặc định"}</span> */}
                        </div>
                        <div className="flex items-center gap-3 py-4">
                            <h2 className="text-sm font-medium">Quantity:</h2>
                            <div className="flex items-center border border-black">
                                <button
                                    className="text-lg px-3 py-1 bg-gray-200 border-r border-black "
                                    onClick={() => {
                                        if (number > 1) {
                                            setNumber(pre => pre - 1);
                                        }
                                    }}>
                                    -
                                </button>
                                <span className="px-4 py-1">{number}</span>
                                <button
                                    className=" text-lg px-3 py-1 bg-gray-200 border-l border-black"
                                    onClick={() => setNumber(pre => pre + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <button
                                onClick={handle}
                                className="p-2 w-full bg-red-600 text-white">
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ModalView);
