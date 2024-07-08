import { useEffect, useState } from "react";
import { BlogFeature, ParallaxItem, ProductFeatures, Slider } from "components";
import { Banners, collection } from "ultils/contans";
import { apiGetProdcuts } from "apis/product";
import SliderMany from "components/SliderMany";
import bn6 from "assets/images/parallax.png";
import { apiGetBlogs, getCategory } from "apis";
import { Link } from "react-router-dom";
import slugify from "slugify";
function Home() {
    const [newProduct, setNewProduct] = useState([]);
    const [bestStar, setBestStar] = useState([]);
    const [men, setMen] = useState([]);
    const [girl, setGirl] = useState([]);
    const [kids, setKids] = useState([]);

    const [category, setCategory] = useState([]);
    const [blogs, setBlogs] = useState([]);

    // const { view, pid } = useSelector(state => state.product);
    const fetch = async () => {
        const response = await Promise.all([
            apiGetProdcuts({ sort: "-createdAt", limit: 12 }),
            apiGetProdcuts({ sort: "-totalRatings -sold", limit: 9 }),
            apiGetProdcuts({ category: "men", limit: 9 }),
            apiGetProdcuts({ category: "girl", limit: 9 }),
            apiGetProdcuts({ category: "kids", limit: 9 }),
        ]);

        if (response[0]?.success) setNewProduct(response[0]?.products);
        if (response[1]?.success) setBestStar(response[1]?.products);
        if (response[2]?.success) setMen(response[2]?.products);
        if (response[3]?.success) setGirl(response[3]?.products);
        if (response[4]?.success) setKids(response[4]?.products);
    };

    const fetchCategory = async () => {
        const rs = await getCategory();
        if (rs.success) setCategory(rs.categorys);
    };
    const fetchBlog = async data => {
        const rs = await apiGetBlogs(data);
        if (rs?.success) setBlogs(rs?.blogs);
    };

    useEffect(() => {
        fetch();
        fetchCategory();
        fetchBlog();
    }, []);
    return (
        <div className="w-[100%] flex flex-col justify-center items-center ">
            <div className="w-full">
                <Slider list={Banners} />
            </div>
            <div className="flex flex-col justify-center items-center py-10 gap-9  w-4/5">
                <h2 className=" text-xl py-2 border-y-2 w-full border-gray-700 text-center font-medium ">
                    COLLECTION
                </h2>
                <section className="w-full flex justify-around p">
                    {collection?.map(item => (
                        <p
                            key={item.id}
                            className="border-x-2 text-black w-[30%] text-center">
                            {item.title}
                        </p>
                    ))}
                </section>

                <section className=" w-[95%]  flex justify-between items-center gap-5">
                    {collection?.map(item => (
                        <Link
                            to={`/${item.title}`}
                            key={item.id}
                            className="w-31%  ">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-[90%] hover:scale-105 cursor-pointer transition delay-75"
                            />
                        </Link>
                    ))}
                </section>
            </div>
            <div className="mt-8 w-4/5 ">
                <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                    FEATURAS PRODUCTS
                </h1>
                <div className="flex flex-wrap gap-5 mt-5 w-full">
                    {bestStar.length > 0 &&
                        bestStar.map(item => (
                            <div
                                key={item._id}
                                className="xl:w-[32%] sm:w-[47%] w-full hover:shadow-md hover:shadow-blue-600">
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

            <div className="mt-8 w-4/5">
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
            <div className="mt-8 w-4/5 ">
                <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                    MEN PRODUCTS
                </h1>
                <div className="flex flex-wrap gap-5 mt-5 w-full">
                    {men.length > 0 &&
                        men.map(item => (
                            <div
                                key={item._id}
                                className="xl:w-[32%] sm:w-[47%] w-full hover:shadow-md hover:shadow-blue-600">
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
            <div className="mt-8 w-4/5 ">
                <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                    WOMEN PRODUCTS
                </h1>
                <div className="flex flex-wrap gap-5 mt-5 w-full">
                    {girl.length > 0 &&
                        girl.map(item => (
                            <div
                                key={item._id}
                                className="xl:w-[32%] sm:w-[47%] w-full hover:shadow-md hover:shadow-blue-600">
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
            <div className="mt-8 w-4/5 ">
                <h1 className="text-xl font-bold py-3 border-b-2 border-red-600">
                    KIDS PRODUCTS
                </h1>
                <div className="flex flex-wrap gap-5 mt-5 w-full">
                    {kids.length > 0 &&
                        kids.map(item => (
                            <div
                                key={item._id}
                                className="xl:w-[32%] sm:w-[47%] w-full hover:shadow-md hover:shadow-blue-600">
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
            <div className="w-full mt-32">
                <ParallaxItem
                    img={bn6}
                    content={
                        <div className="flex flex-col justify-center items-center gap-2">
                            <h2 className="text-2xl font-bold">MOSASHOP</h2>
                            <h2 className="text-2xl font-bold">FASHION</h2>
                        </div>
                    }
                />
            </div>
            <div className="mt-8 w-4/5 mb-16">
                <h2 className="py-3 border-b-2 w-full border-red-600 font-medium text-xl mb-3">
                    BLOGS
                </h2>
                {category?.map(item => (
                    <Link
                        key={item._id}
                        to={`/blogs/${slugify(item.title)}`}
                        className="block">
                        <p className="cursor-pointer hover:text-red-600 py-2">
                            {item.title}
                        </p>
                    </Link>
                ))}

                <div className=" flex flex-wrap sm:flex-row flex-col gap-5 mt-4">
                    {blogs &&
                        blogs?.map(el => (
                            <BlogFeature
                                key={el._id}
                                size={true}
                                id={el._id}
                                title={el.title}
                                image={el.images}
                                time={el.createdAt}
                                user={el.author}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
