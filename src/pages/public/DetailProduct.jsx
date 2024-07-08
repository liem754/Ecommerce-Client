import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "store/product/asyncActions";
import { useParams } from "react-router-dom";

import { Breadcrumb, ColorItem, Tag } from "components";
import { format, formatStar } from "ultils/format";
import { Icons } from "ultils/icons";
import * as api from "apis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper";
import ReactImageMagnify from "react-image-magnify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { apiGetProdcuts, apiUpdateCart } from "apis";
import SliderMany from "components/SliderMany";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { IdCurrent } from "store/user/userSlice";
const {
    GoDotFill,
    AiFillSafetyCertificate,
    MdLocalShipping,
    AiTwotoneGift,
    FaPhone,
    BsSignTurnLeftFill,
    GrFormPrevious,
    GrFormNext,
} = Icons;
function DetailProduct() {
    const { pid, title, category } = useParams();
    const [number, setNumber] = useState(1);
    const [size, setSize] = useState("M");

    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.product);
    const { data } = useSelector(state => state.user);

    const [active, setActive] = useState(1);
    const [co, setCo] = useState("BLACK");

    const [products, setProducts] = useState([]);
    const fetch = async () => {
        const rs = await apiGetProdcuts({
            subcategory: product?.subcategory,
            category: category,
            limit: 10,
        });
        if (rs.success) setProducts(rs.products);
    };
    useEffect(() => {
        fetch();
    }, [product]);

    useEffect(() => {
        dispatch(getProduct(pid));
    }, [update]);
    const rerender = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    useEffect(() => {
        dispatch(getProduct(pid));
    }, [pid]);
    const handleCart = async e => {
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
            title: product?.title,
            thumb: product?.images[0],
            size,
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
        <div className="w-full flex flex-col items-center justify-center ">
            <div className="bg-gray-100 w-full flex justify-center">
                <div className="lg:w-4/5 py-4 w-[95%] ">
                    <span className="font-medium block mb-1 text-lg">
                        {product?.title}
                    </span>
                    <Breadcrumb title={title} category={category} />
                </div>
            </div>
            <div className="lg:w-4/5 w-[95%] flex flex-col  md:flex-row sm:items-start   gap-8 my-10">
                <div className="lg:w-[37%] md:w-[49%] w-full">
                    <div className="px-2 py-2 w-full  border flex justify-center items-center">
                        <img
                            src={product?.images[active]}
                            alt=""
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full p-2 mt-10 relative ">
                        <Swiper
                            grabCursor={true}
                            effect="slide"
                            spaceBetween={30}
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
                                                    onClick={() =>
                                                        setActive(index)
                                                    }
                                                    className=" h-[90%] w-full p-2 border-2">
                                                    <img
                                                        className="h-full w-[90%]"
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
                <div className="lg:w-[60%] md:w-[50%] w-full flex   gap-2">
                    <div className="flex flex-col gap-2 md:w-[65%] w-full justify-center items-center md:items-start">
                        <h2 className=" font-medium text-4xl">
                            {co === "BLACK"
                                ? format(
                                      +product?.price > 2000000
                                          ? (+product?.price - 500000) * number
                                          : (+product?.price - 50000) * number,
                                  )
                                : format(product?.price * number)}
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
                        <div className="flex flex-col gap-3 w-full">
                            <h2>Size:</h2>
                            <div className=" flex items-center gap-8 w-full ">
                                <h2
                                    onClick={() => setSize("M")}
                                    className={`py-2 ${
                                        size === "M"
                                            ? "scale-[1.1]  border-2 border-indigo-600"
                                            : "hover:scale-105"
                                    }  sc  w-[12%] md:w-[16%] text-center cursor-pointer border border-black `}>
                                    M
                                </h2>
                                <h2
                                    onClick={() => setSize("L")}
                                    className={`${
                                        size === "L"
                                            ? "scale-[1.1]  border-2 border-indigo-600"
                                            : "hover:scale-105"
                                    } py-2  border w-[12%] md:w-[16%] text-center cursor-pointer border-black  `}>
                                    L
                                </h2>
                                <h2
                                    onClick={() => setSize("XL")}
                                    className={`${
                                        size === "XL"
                                            ? "scale-[1.1]  border-2 border-indigo-600"
                                            : "hover:scale-105"
                                    } py-2   w-[12%] md:w-[16%] text-center cursor-pointer border border-black `}>
                                    XL
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-2 bg-y w-full  ">
                            <h2 className="text-sm font-medium">Color:</h2>
                            <div className="flex items-center gap-5 my-3">
                                {product?.color?.split(" ").map((el, index) => (
                                    <ColorItem setCo={setCo} co={co} el={el} />
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-sm font-medium">
                                    Quantity:
                                </h2>
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
                                        onClick={() =>
                                            setNumber(pre => pre + 1)
                                        }>
                                        +
                                    </button>
                                </div>
                            </div>
                            {data?.role === "2000" && (
                                <div className="mt-3 w-full">
                                    <button
                                        onClick={e => handleCart(e)}
                                        className="p-2 w-full bg-red-600 text-white rounded-md">
                                        Add to cart
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-[35%] hidden lg:block ">
                        <div className=" p-2 border flex items-center gap-3">
                            <AiFillSafetyCertificate size={"28px"} />

                            <div className="">
                                <h2 className="text-sm font-medium">
                                    Guarantee
                                </h2>
                                <h3 className="text-xs text-gray-600">
                                    Quality Checked
                                </h3>
                            </div>
                        </div>
                        <div className=" p-2 border my-1 flex items-center gap-3">
                            <MdLocalShipping size={"28px"} />

                            <div className="">
                                <h2 className="text-sm font-medium">
                                    Free Shipping
                                </h2>
                                <h3 className="text-xs text-gray-600">
                                    Free On All Products
                                </h3>
                            </div>
                        </div>

                        <div className=" p-2 border my-1 flex items-center gap-3">
                            <AiTwotoneGift size={"28px"} />

                            <div className="">
                                <h2 className="text-sm font-medium">
                                    Special Gift Cards
                                </h2>
                                <h3 className="text-xs text-gray-600">
                                    Special Gift Cards
                                </h3>
                            </div>
                        </div>
                        <div className=" p-2 border my-1 flex items-center gap-3">
                            <BsSignTurnLeftFill size={"28px"} />

                            <div className="">
                                <h2 className="text-sm font-medium">
                                    Free Return
                                </h2>
                                <h3 className="text-xs text-gray-600">
                                    Within 7 Days
                                </h3>
                            </div>
                        </div>
                        <div className=" p-2 border my-1 flex items-center gap-3">
                            <FaPhone size={"24px"} />

                            <div className="">
                                <h2 className="text-sm font-medium">
                                    Consultancy
                                </h2>
                                <h3 className="text-xs text-gray-600">
                                    Lifetime 24/7/356
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-4/5 w-[96%]">
                <Tag
                    update={update}
                    rerender={rerender}
                    pid={product?._id}
                    description={product?.description}
                    total={product?.ratings}
                    totalratings={product?.totalRatings}
                    category={product?.subcategory}
                />
            </div>
            <div className="w-4/5 mb-8">
                <div className="mt-8 w-full">
                    <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                        OTHER CUSTOMERS ALSO BUY:
                    </h1>
                    <div className=" mt-5 w-full hidden lg:block">
                        <SliderMany
                            list={products.filter(item => item?._id !== pid)}
                            lg
                        />
                    </div>
                    <div className=" mt-5 w-full hidden lg:hidden md:block ">
                        <SliderMany
                            list={products.filter(item => item?._id !== pid)}
                            md
                        />
                    </div>
                    <div className=" mt-5 w-full md:hidden ">
                        <SliderMany
                            list={products.filter(item => item?._id !== pid)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
