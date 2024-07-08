import { memo, useState } from "react";
import { format, formatStar } from "../ultils/format";
import { Icons } from "../ultils/icons";
import { useNavigate } from "react-router-dom";

import * as api from "../apis";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IdCurrent } from "store/user/userSlice";
const { AiOutlineEye, AiTwotoneHeart, BsCart2 } = Icons;
function Product({ img, title, price, cate, id, grip, star, slug }) {
    const [hove, setHove] = useState(false);
    const navigate = useNavigate();
    const { isLoggedin, data } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const handelview = e => {
        e.stopPropagation();
        navigate(`/${cate.toLowerCase()}/${id}/${slug}`);
    };
    const handle = e => {
        e.stopPropagation();
        navigate(`/${cate.toLowerCase()}/${id}/${slug}`);
        window.scrollTo(0, 0);
    };
    const handlecart = async e => {
        e.stopPropagation();
        if (!isLoggedin) {
            Swal.fire({
                title: "Info!",
                text: "Vui lòng đăng nhập!",
                icon: "info",
                cancelButtonText: "Not now!",
                showCancelButton: true,
                confirmButtonText: "Go login now!",
            }).then(rs => {
                if (rs.isConfirmed) {
                    navigate("/login");
                }
            });
        }

        const rs = await api.apiUpdateCart({
            pid: id,
            color: "BLACK",
            price,

            title,
            thumb: img,
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
            onClick={e => handle(e)}
            onMouseEnter={() => setHove(true)}
            onMouseLeave={() => setHove(false)}
            className="block rounded-md cursor-pointer">
            <div className="border-2 shadow-md w-full relative">
                <div className="md:h-[350px] h-[500px] w-full flex justify-center items-center border-b-2">
                    <img
                        src={
                            img ||
                            "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                        }
                        alt="img"
                        className={`w-[85%] object-cover ${
                            grip ? "h-[82%]" : "h-[80%]"
                        }`}
                    />
                </div>
                <div className="p-3">
                    <h2 className="text-md mt-2 w-full overflow-hidden text-ellipsis line-clamp-1">
                        {title}
                    </h2>
                    <div className="flex gap-1 py-1">{formatStar(star)}</div>
                    <h3 className="mt-1">{`${format(price)}`}</h3>
                </div>
                {hove && data?.role === "2000" && (
                    <div
                        onClick={e => e.stopPropagation()}
                        className="flex absolute right-[32%] top-[72%] gap-3 introduce7">
                        <div className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <AiTwotoneHeart />
                        </div>
                        {!data?.cart.some(item => item.product === id) && (
                            <div
                                onClick={e => handlecart(e)}
                                className="p-1 border border-black cursor-pointer rounded-[50%]">
                                <BsCart2 />
                            </div>
                        )}
                        <div
                            onClick={e => handelview(e)}
                            className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <AiOutlineEye />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Product);
