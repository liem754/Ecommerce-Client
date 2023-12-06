import { NavLink } from "react-router-dom";
import { Navigations } from "../ultils/contans";
import { Icons } from "ultils/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/user/userSlice";
const { AiOutlineMenu } = Icons;
function Navigation() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const isActives =
        "md:px-1 py-2 md:py-0 block md:pl-0 font-medium  text-red-500 hover:text-red-400 text-sm lg:text-md";
    const notActive =
        "font-medium md:px-1 block py-2 md:py-0 md:pl-0  hover:text-red-400 text-sm lg:text-md";
    return (
        <div className="w-full flex justify-center pl-3">
            <div className="lg:w-4/5 w-[95%] py-3 hidden lg:flex lg:gap-5 relative">
                {Navigations &&
                    Navigations.map(item => (
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? isActives : notActive
                            }
                            to={item.path}
                            key={item.id}>
                            {item.value}
                        </NavLink>
                    ))}
            </div>
            <div className="lg:hidden block w-full">
                <div
                    onClick={() => setShow(!show)}
                    className="lg:hidden flex sm:ml-2 md:ml-4 cursor-pointer w-4/5 gap-1 py-1 items-center">
                    <AiOutlineMenu size={"25px"} />
                </div>
                {show && (
                    <div className="w-4/5 py-3 sm:ml-2 flex flex-col sm:gap-3 ">
                        {Navigations &&
                            Navigations.map(item => (
                                <NavLink
                                    onClick={() => setShow(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "md:px-1 py-2 md:py-0 md:pl-0 font-medium text-red-500 hover:text-red-400 text-sm lg:text-md w-full"
                                            : "font-medium md:px-1 py-2 md:py-0 md:pl-0 w-full hover:text-red-400  text-sm lg:text-md"
                                    }
                                    to={item.path}
                                    key={item.id}>
                                    {item.value}
                                </NavLink>
                            ))}

                        <div
                            onClick={() => dispatch(logout())}
                            className=" font-medium py-2 text-md">
                            Đăng xuất
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navigation;
