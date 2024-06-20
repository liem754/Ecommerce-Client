import { Footer } from "components";
import SideBarAdmin from "components/SideBarAdmin";

import { NavLink, Outlet } from "react-router-dom";
import { path } from "ultils/paths";
const sidebarMenber = [
    {
        id: 1,
        value: "Personal",
        link: `${path.EDIT_USER}`,
    },
    {
        id: 2,
        value: "My Cart",
        link: `/${path.MENBER_LAYOUT}/cart`,
    },
    {
        id: 2,
        value: "Purchase History",
        link: `/${path.MENBER_LAYOUT}/history`,
    },

    {
        id: 3,
        value: "Home",
        link: `/${path.HOME}`,
    },
];
function MenberLayout() {
    return (
        <div className="flex flex-col  gap-3 h-screen">
            <div className="flex sm:hidden bg-black  text-sm py-2 justify-center ">
                {sidebarMenber?.map(item => (
                    <NavLink
                        to={item?.link}
                        key={item?.id}
                        className={({ isActive }) =>
                            isActive
                                ? " underline underline-offset-4 px-2 text-white"
                                : "text-white px-2"
                        }>
                        {item?.value}
                    </NavLink>
                ))}
            </div>
            <div className="flex gap-3">
                <div className="lg:w-[20%] w-[30%] border hidden sm:block">
                    <SideBarAdmin dataa={sidebarMenber} />
                </div>
                <div className="lg:w-[80%] sm:w-[70%] w-full border">
                    <Outlet />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Footer />
            </div>
        </div>
    );
}

export default MenberLayout;
