import { Link, useNavigate } from "react-router-dom";
import logo from "assets/images/logo3.png";
import Button from "./Button";
import { Icons } from "ultils/icons";
import { useCallback, useEffect, useState } from "react";
import { path } from "ultils/paths";
import { useDispatch, useSelector } from "react-redux";
import { apiCurrent, apiRefreshtoken } from "apis";
import { IdCurrent, logout, register } from "store/user/userSlice";
import Swal from "sweetalert2";
import { setShow } from "store/product/productSlice";
const { GiShoppingCart } = Icons;
function Header() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState({});
    const { data } = useSelector(state => state.user);

    const fetch = async () => {
        const rs = await apiCurrent();
        if (rs.success) {
            setCurrent(rs.rs);
            dispatch(
                IdCurrent({
                    idCurrent: rs.rs._id,
                    data: rs.rs,
                }),
            );
        } else {
            dispatch(logout());
            Swal.fire("Oops!", "Phiên đăng nhập đã hết hạn!", "info").then(
                () => {
                    navigate("/login");
                },
            );
        }
    };
    const { isLoggedin } = useSelector(state => state.user);
    useEffect(() => {
        const time = setTimeout(() => {
            if (isLoggedin) fetch();
        }, 300);
        return () => {
            clearTimeout(time);
        };
    }, [isLoggedin]);
    const handle = () => {
        dispatch(logout());
    };
    const navigate = useNavigate();
    const getLogin = useCallback(flag => {
        navigate(path.LOGIN, { state: { flag } });
    }, []);
    const fetchRefresh = async () => {
        const rs = await apiRefreshtoken();
        if (rs.success) console.log(rs.newAccessToken);
    };
    // useEffect(() => {
    //     if (Object.keys(current).length === 0) {
    //         fetchRefresh();
    //     }
    // }, [current]);
    return (
        <div className="w-[95%] lg:w-4/5 py-5 flex justify-between items-center border-b-2">
            <Link to={"/"} className="w-[30%] md:w-[20%]">
                <img src={logo} alt="" className="w-full" />
            </Link>
            {!isLoggedin ? (
                <div className="flex gap-3">
                    <Button
                        title={"Đăng nhập"}
                        textColor={"text-white"}
                        bgColor={"bg-black"}
                        pd={"py-2 px-5"}
                        size={"font-medium"}
                        radius={"rounded-md"}
                        onClick={() => getLogin(true)}
                    />

                    <Button
                        title={"Đăng ký"}
                        textColor={"text-white"}
                        bgColor={"bg-black"}
                        pd={"py-2 px-5"}
                        size={"font-medium"}
                        radius={"rounded-md"}
                        onClick={() => getLogin(false)}
                    />
                </div>
            ) : (
                <div className="flex gap-6 items-center mr-3">
                    <Link
                        to={`/${
                            +current?.role === 2002
                                ? `${path.ADMIN}/${path.DASHBOARD}`
                                : `${path.MENBER_LAYOUT}/${path.EDIT_USER}`
                        }`}
                        className="flex gap-2 items-center md:border-r-2 md:pr-6">
                        <img
                            className="rounded-[50%] w-[40px] h-[40px]"
                            src={
                                data?.avatar
                                    ? data?.avatar
                                    : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                            }
                            alt=""
                        />
                        {Object.keys(current).length !== 0 && (
                            <span className="font-medium text-sm md:text-[16px]">
                                {`${
                                    current?.firstname
                                        ?.charAt(0)
                                        .toUpperCase() +
                                    current?.firstname?.slice(1)
                                }`}
                            </span>
                        )}
                    </Link>
                    {data?.role === "2000" && (
                        <Link
                            to={`/${path.MENBER_LAYOUT}/${path.CART}`}
                            className="hidden md:flex gap-2 text-sm md:text-[16px] items-center border-r-2 pr-6 cursor-pointer">
                            <GiShoppingCart size={"30px"} />
                            <span>{data?.cart?.length}</span>
                            <span>item</span>
                        </Link>
                    )}

                    <button
                        onClick={handle}
                        className="bg-black rounded-md text-white px-2 py-[5px] hover:bg-slate-800 hidden md:flex">
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
