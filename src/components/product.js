import { memo, useState } from "react";
import { format, formatStar } from "../ultils/format";
import { Icons } from "../ultils/icons";
import { Link } from "react-router-dom";
import { path } from "../ultils/paths";
import label from "../assets/images/label2.png";
import label1 from "../assets/images/label3.png";
const { AiOutlineMenu, AiOutlineEye, AiTwotoneHeart } = Icons;
function Product({ img, title, price, cate, id, grip, news, star, slug }) {
    const [hove, setHove] = useState(false);

    return (
        <Link
            to={`/${cate.toLowerCase()}/${id}/${slug}`}
            onMouseEnter={() => setHove(true)}
            onMouseLeave={() => setHove(false)}
            className={` block`}>
            <div className="border-2 shadow-md w-full relative">
                {news === "Trending" ? (
                    <div className="w-[35%] relative mt-1 lg:block hidden">
                        <h3 className="text-white absolute top-[5px] text-sm left-4 md:block hidden">
                            Trending
                        </h3>
                        <img src={label} alt="" />
                    </div>
                ) : news === "New" ? (
                    <div className="w-[45%] relative mt-1 lg:block hidden">
                        <h3 className="text-white absolute top-[10px] text-sm left-9">
                            New
                        </h3>
                        <img src={label1} alt="" />
                    </div>
                ) : (
                    <div className=""></div>
                )}
                <div className="h-[350px] w-full flex justify-center items-center">
                    <img
                        src={
                            img ||
                            "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                        }
                        alt=""
                        className={`w-[75%] ${grip ? "h-[82%]" : "h-[80%]"}`}
                    />
                </div>
                <div className="p-3">
                    <h2 className="text-md mt-2 w-full overflow-hidden text-ellipsis line-clamp-1">
                        {title}
                    </h2>
                    <div className="flex gap-1 py-1">{formatStar(star)}</div>
                    <h3 className="mt-1">{`${format(price)}`}</h3>
                </div>
                {hove && (
                    <div className="flex absolute right-[31%] top-[72%] gap-3 introduce7">
                        <div className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <AiTwotoneHeart />
                        </div>
                        <Link
                            to={`/${cate.toLowerCase()}/${id}/${slug}`}
                            className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <AiOutlineMenu />
                        </Link>
                        <div className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <AiOutlineEye />
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default memo(Product);
