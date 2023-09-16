import SideBarAdmin from "components/SideBarAdmin";
import { Outlet } from "react-router-dom";
import { path } from "ultils/paths";
const sidebar = [
    {
        id: 1,
        value: "DashBoard",
        link: `/admin/${path.DASHBOARD}`,
    },
    {
        id: 2,
        value: "Create Product",
        link: `/admin/${path.CREATE_PRODUCT}`,
    },

    {
        id: 3,
        value: "Manage Order",
        link: `/admin/${path.MANAGER_ORDER}`,
    },
    {
        id: 4,
        value: "Manage Product",
        link: `/admin/${path.MANAGER_PRODUCT}`,
    },
    {
        id: 5,
        value: "Manage User",
        link: `/admin/${path.MANAGER_USER}`,
    },
    {
        id: 6,
        value: "Manage Blog",
        link: `/admin/${path.MANAGER_BLOG}`,
    },
    {
        id: 7,
        value: "Create Blog",
        link: `/admin/${path.CREATE_BLOG}`,
    },
    {
        id: 8,
        value: "Home",
        link: `/${path.HOME}`,
    },
];

function AdminLayout() {
    return (
        <div className=" ">
            <div className="flex gap-3">
                <div className="w-[20%] border ">
                    <SideBarAdmin dataa={sidebar} />
                </div>
                <div className="w-[80%] border">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
