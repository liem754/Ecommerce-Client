import { Link, useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import Button from "./Button";
import { Icons } from "ultils/icons";
import { useCallback, useEffect, useState } from "react";
import { path } from "ultils/paths";
import { useDispatch, useSelector } from "react-redux";
import { apiCurrent, apiRefreshtoken } from "apis";
import { IdCurrent, logout } from "store/user/userSlice";
import Swal from "sweetalert2";
const { GiShoppingCart, FaIdCard, FaCarSide, FaPhoneVolume } = Icons;
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
        if (current?.isBlocked === true) {
            Swal.fire(
                "Oops",
                "Sorry, the account has been locked !",
                "info",
            ).then(() => {
                handle();
            });
        }
    }, [current]);
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
    console.log(current);
    return (
        <div className="w-[95%] lg:w-4/5 flex justify-between items-center border-b-2">
            <section
                className=" cursor-pointer w-[15%]"
                onClick={() => navigate("/")}>
                <img src={logo} alt="" className="w-[100%]" />
            </section>
            <section className=" lg:flex items-center justify-between w-[45%] hidden">
                <nav className="flex gap-3 items-center">
                    <FaPhoneVolume size={"30px"} />
                    <div className=" flex flex-col">
                        <h2 className="text-xs font-medium">HOTLINE</h2>
                        <p className="text-xs">0.999.88876</p>
                    </div>
                </nav>
                <nav className="flex gap-3 items-center">
                    <FaCarSide size={"30px"} />
                    <div className=" flex flex-col">
                        <h2 className="text-xs font-medium">
                            MIỄN PHÍ GIAO HÀNG
                        </h2>
                        <p className="text-xs">Tận nơi - Toàn quốc</p>
                    </div>
                </nav>
                <nav className="flex gap-3 items-center">
                    <FaIdCard size={"30px"} />
                    <div className=" flex flex-col">
                        <h2 className="text-xs font-medium">
                            HÌNH THỨC THANH TOÁN
                        </h2>
                        <p className="text-xs">Thanh toán linh động</p>
                    </div>
                </nav>
            </section>
            {!isLoggedin ? (
                <div className="flex gap-3">
                    <Button
                        title={"Log in"}
                        textColor={"text-white"}
                        bgColor={
                            "bg-black hover:shadow-md hover:shadow-blue-600"
                        }
                        pd={"py-2 px-5"}
                        size={"font-medium"}
                        radius={"rounded-md"}
                        onClick={() => getLogin(true)}
                    />

                    <Button
                        title={"Sign up"}
                        textColor={"text-white"}
                        bgColor={
                            "bg-black hover:shadow-md hover:shadow-blue-600"
                        }
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
                                    current?.name?.charAt(0).toUpperCase() +
                                    current?.name?.slice(1)
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
                        className="before:ease relative py-2 px-5 overflow-hidden border rounded-md border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
                        <span className="relative z-10 font-medium ">
                            Log out
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
