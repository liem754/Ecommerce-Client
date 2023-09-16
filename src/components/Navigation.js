import { NavLink } from "react-router-dom";
import { Navigations } from "../ultils/contans";
import { Icons } from "ultils/icons";
import { useState } from "react";
const { AiOutlineMenu } = Icons;
function Navigation() {
    const [show, setShow] = useState(false);
    const isActives =
        "md:px-1 py-2 md:py-0 md:pl-0 font-medium text-red-500 hover:text-red-400 text-sm lg:text-md";
    const notActive =
        "font-medium md:px-1 py-2 md:py-0 md:pl-0 hover:text-red-400  text-sm lg:text-md";
    return (
        <div className="w-full flex justify-center pl-3">
            <div className="lg:w-4/5 w-[95%] py-3 hidden md:flex gap-5 relative">
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
            <div className="">
                <div
                    onClick={() => setShow(!show)}
                    className="md:hidden flex w-4/5 gap-1 py-1 items-center">
                    <AiOutlineMenu size={"25px"} />
                </div>
                {show && (
                    <div className="w-4/5 py-3 flex flex-col gap-0 ">
                        {Navigations &&
                            Navigations.map(item => (
                                <NavLink
                                    onClick={() => setShow(false)}
                                    className={({ isActive }) =>
                                        isActive ? isActives : notActive
                                    }
                                    to={item.path}
                                    key={item.id}>
                                    {item.value}
                                </NavLink>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navigation;
