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
        id: 3,
        value: "Home",
        link: `/${path.HOME}`,
    },
];
function MenberLayout() {
    return (
        <div className="flex gap-3 h-screen">
            <div className="w-[25%] border">
                <SideBarAdmin dataa={sidebarMenber} />
            </div>
            <div className="w-[75%] border">
                <Outlet />
            </div>
        </div>
    );
}

export default MenberLayout;
