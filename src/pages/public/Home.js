import { useEffect, useState } from "react";
import {
    Banner,
    DailyDeal,
    ModalView,
    ProductFeatures,
    Sidebar,
    Slider,
} from "../../components";
import im from "../../assets/images/Just-over-half-of-the-worlds-population-uses-smartphones.jpg";
import { Banners } from "../../ultils/contans";
import { apiGetProdcuts } from "../../apis/product";
import Product from "../../components/product";
import SliderMany from "../../components/SliderMany";
import { Link } from "react-router-dom";
import AllCollection from "./AllCollection";
import { useDispatch, useSelector } from "react-redux";
function Home() {
    const [bestSeller, setBestSeller] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [bestStar, setBestStar] = useState([]);
    const [bestShow, setBestShow] = useState(false);
    const dispatch = useDispatch();

    const { view, pid } = useSelector(state => state.product);
    const fetch = async () => {
        const response = await Promise.all([
            apiGetProdcuts({ sort: "-sold" }),
            apiGetProdcuts({ sort: "-createdAt", limit: 12 }),
            apiGetProdcuts({ sort: "-totalRatings -sold", limit: 9 }),
        ]);

        if (response[0]?.success) setBestSeller(response[0]?.products);
        if (response[1]?.success) setNewProduct(response[1]?.products);
        if (response[2]?.success) setBestStar(response[2]?.products);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className="w-[96%] lg:w-4/5 mt-5">
            <div className="md:flex  gap-5">
                <div className="md:w-[25%] w-full flex md:block  ">
                    <div className="border shadow-md pb-2 w-[50%] md:w-full">
                        <div className="py-2 pl-5 bg-blue-600 text-white">
                            All Colections
                        </div>
                        <div className="pl-5">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="w-[50%] md:w-full">
                        {/* <DailyDeal /> */}
                        <img
                            src="https://bibliocloudimages.s3-eu-west-1.amazonaws.com/389/supportingresources/292138/jpg_rgb_1500h.jpg"
                            className="w-full h-[500px]"
                            alt=""
                        />
                        {/* <Link
                            to={`/laptop`}
                            className="cursor-pointer flex-1 lg:shadow-md   ">
                            <img
                                className=" w-full h-[200px] lg:h-[250px]"
                                src="https://laptops.vn/uploads/722x354_laptop-thinkpad_180423_1682397886.png"
                                alt=""
                            />
                        </Link> */}
                    </div>
                </div>
                <div className="w-full md:w-[75%]">
                    <Slider list={Banners} />
                    <div className="flex flex-col mt-5 w-full">
                        <div className="border-b-2 border-red-600 pb-1 flex  text-lg font-medium">
                            <div
                                onClick={() => setBestShow(false)}
                                className={`pr-3 ${
                                    !bestShow ? "text-red-600" : ""
                                } border-r-2 border-gray-200 cursor-pointer hover:text-gray-500`}>
                                BEST SELLER
                            </div>
                            <div
                                onClick={() => setBestShow(true)}
                                className={`${
                                    bestShow ? "text-red-600" : ""
                                } pl-3 cursor-pointer hover:text-gray-500`}>
                                NEW ARRIVALS
                            </div>
                        </div>
                        <div className="mt-3 hidden lg:block">
                            {bestShow ? (
                                <SliderMany list={newProduct} lg news="New" />
                            ) : (
                                <SliderMany
                                    list={bestSeller}
                                    lg
                                    news="Trending"
                                />
                            )}
                        </div>
                        <div className="mt-3 hidden lg:hidden md:block">
                            {bestShow ? (
                                <SliderMany list={newProduct} news="New" md />
                            ) : (
                                <SliderMany
                                    list={bestSeller}
                                    news="Trending"
                                    md
                                />
                            )}
                        </div>
                        <div className="mt-3 md:hidden">
                            {bestShow ? (
                                <SliderMany list={newProduct} news="New" />
                            ) : (
                                <SliderMany list={bestSeller} news="Trending" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 w-full">
                <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                    FEATURAS PRODUCTS
                </h1>
                <div className="flex flex-wrap gap-5 mt-5">
                    {bestStar &&
                        bestStar.map((item, index) => (
                            <div
                                key={index}
                                className="xl:w-[32%] sm:w-[47%] w-full">
                                <ProductFeatures
                                    title={item.title}
                                    img={item.images[1]}
                                    price={item.price}
                                    star={item.totalRatings}
                                    cate={item.category}
                                    id={item._id}
                                    slug={item.slug}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className="mt-7">
                <Banner />
            </div>
            <div className="mt-8 w-full">
                <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                    NEWS PRODUCTS
                </h1>

                <div className=" mt-5 w-full hidden lg:block">
                    <SliderMany list={newProduct} lg />
                </div>
                <div className=" mt-5 w-full hidden lg:hidden md:block ">
                    <SliderMany list={newProduct} md />
                </div>
                <div className=" mt-5 w-full md:hidden ">
                    <SliderMany list={newProduct} />
                </div>
            </div>
            <div className="mt-8 w-full">
                <AllCollection home />
            </div>
        </div>
    );
}

export default Home;
