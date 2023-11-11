import SideBarAdmin from "components/SideBarAdmin";

import { Outlet } from "react-router-dom";
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
        <div className="flex gap-3 h-screen">
            <div className="w-[20%] border">
                <SideBarAdmin dataa={sidebarMenber} />
            </div>
            <div className="w-[80%] border">
                <Outlet />
            </div>
        </div>
    );
}

export default MenberLayout;
