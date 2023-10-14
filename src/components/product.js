import { memo, useState } from "react";
import { format, formatStar } from "../ultils/format";
import { Icons } from "../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../ultils/paths";
import label from "../assets/images/label2.png";
import label1 from "../assets/images/label3.png";
import { ModalView } from "components";
import { setView } from "store/product/productSlice";
import * as api from "../apis";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IdCurrent, register } from "store/user/userSlice";
const { AiOutlineMenu, AiOutlineEye, AiTwotoneHeart, BsCart2 } = Icons;
function Product({ img, title, price, cate, id, grip, news, star, slug }) {
    const [hove, setHove] = useState(false);
    const navigate = useNavigate();
    const { isLoggedin } = useSelector(state => state.user);

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
                    <div
                        onClick={e => e.stopPropagation()}
                        className="flex absolute right-[31%] top-[72%] gap-3 introduce7">
                        <div className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <AiTwotoneHeart />
                        </div>
                        <div
                            onClick={e => handlecart(e)}
                            className="p-1 border border-black cursor-pointer rounded-[50%]">
                            <BsCart2 />
                        </div>
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
