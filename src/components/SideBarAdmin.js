import { apiCurrent } from "apis";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IdCurrent, idCurrent, logout } from "store/user/userSlice";
import Swal from "sweetalert2";
import { path } from "ultils/paths";

function SideBarAdmin({ dataa, blog }) {
    const { data } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const [current, setCurrent] = useState({});
    const navigate = useNavigate();

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
    const { isLoggedin, isUpdate } = useSelector(state => state.user);
    useEffect(() => {
        const time = setTimeout(() => {
            if (isLoggedin) fetch();
        }, 100);
        return () => {
            clearTimeout(time);
        };
    }, [isLoggedin, isUpdate]);
    return (
        <div className="flex flex-col mt-2 h-screen">
            <div className="m-5">
                <div className="flex gap-3 items-center pr-6 mb-2">
                    <img
                        className="rounded-[50%] w-[60px]  h-[60px] border shadow-sm"
                        src={
                            data?.avatar ||
                            "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                        }
                        alt=""
                    />
                    {Object.keys(current).length !== 0 && (
                        <span className="font-bold lg:text-lg text-md w-full">
                            {`${
                                current?.firstname?.charAt(0).toUpperCase() +
                                current?.firstname?.slice(1)
                            } ${current?.lastname}`}
                        </span>
                    )}
                </div>
            </div>

            {dataa?.map(el => (
                <NavLink
                    key={el._id}
                    to={el.link}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white cursor-pointer py-3 px-5 bg-black "
                            : "px-5 py-3 cursor-pointer hover:bg-gray-200 font-medium"
                    }>
                    {el.value}
                </NavLink>
            ))}
        </div>
    );
}

export default memo(SideBarAdmin);
