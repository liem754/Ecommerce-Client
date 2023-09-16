import { memo, useEffect, useState } from "react";
import { apiGetProdcuts } from "../apis/product";
import { formatStar, format } from "../ultils/format";
import { path } from "../ultils/paths";
import Countdown from "./countdown";
import Button from "./Button";
import { Icons } from "../ultils/icons";
import { Link } from "react-router-dom";
const { AiOutlineMenu } = Icons;
function DailyDeal({ item }) {
    let internal;
    const [daily, setDaily] = useState(null);
    const [hours, setHours] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);
    const fetch = async () => {
        const response = await apiGetProdcuts({
            limit: 1,
            totalRatings: 5,
            page: Math.round(Math.random() * 10),
        });
        if (response?.success && response?.products.length > 0) {
            setDaily(response?.products);
            setHours(1);
            setMinute(59);
            setSecond(59);
        }
    };

    useEffect(() => {
        internal && clearInterval(internal);
        fetch();
    }, [expireTime]);
    useEffect(() => {
        internal = setInterval(() => {
            if (second > 0) {
                setSecond(pre => pre - 1);
            } else {
                if (minute > 0) {
                    setMinute(pre => pre - 1);
                    setSecond(59);
                } else {
                    if (hours > 0) {
                        setHours(pre => pre - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(internal);
        };
    }, [hours, minute, second, expireTime]);
    return (
        <div className="border shadow-md md:mt-5 pb-3 img1 border-black">
            <div className="flex justify-center p-2">
                <h1 className="font-medium text-lg underline underline-offset-4">
                    DAILY DEAL
                </h1>
            </div>
            {daily &&
                daily.map((el, index) => (
                    <Link
                        key={index}
                        to={`/${el?.category?.toLowerCase()}/${el?._id}/${
                            el.slug
                        }`}>
                        <div className="flex flex-col items-center py-4 h-[640px]">
                            <div className="h-[350px] w-full flex justify-center items-center">
                                <img
                                    src={
                                        el?.images[0] ||
                                        "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                                    }
                                    alt=""
                                    className={`w-[93%] "h-full"}`}
                                />
                            </div>
                            <div className="p-3 flex flex-col justify-center items-center w-full">
                                <h2 className="text-md text-center mt-2 w-full overflow-hidden text-ellipsis line-clamp-1 flex justify-center">
                                    {el?.title}
                                </h2>
                                <div className="flex gap-1 py-2">
                                    {formatStar(el?.totalRatings)}
                                </div>
                                <h3 className="mt-1">{`${format(
                                    el?.price,
                                )}`}</h3>
                            </div>
                            <div className="flex gap-3 justify-center w-full py-5">
                                <Countdown unit={hours} time={"Hours"} />
                                <Countdown unit={minute} time={"Minutes"} />
                                <Countdown unit={second} time={"Seconds"} />
                            </div>
                            <div className="w-full flex justify-center">
                                <Button
                                    title={"Option"}
                                    textColor={"text-white"}
                                    bgColor={"bg-red-600"}
                                    width={"w-[85%]"}
                                    pd={"py-2 px-3"}
                                    IcBefore={AiOutlineMenu}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export default memo(DailyDeal);
