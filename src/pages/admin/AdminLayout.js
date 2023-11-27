import { Footer } from "components";
import SideBarAdmin from "components/SideBarAdmin";
import { Outlet, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    return (
        <div className="flex flex-col ">
            <div className="flex gap-3">
                <div className="w-[25%] border hidden sm:block ">
                    <SideBarAdmin dataa={sidebar} />
                </div>
                <div className="w-[85%] border hidden sm:block">
                    <Outlet />
                </div>
                <h2 className=" h-screen p-20">
                    <h3>
                        Chúng tôi không hỗ quản lý bằng điện thoại ! Vui lòng
                        chuyển sang laptop ?
                    </h3>
                    <h2
                        onClick={() => navigate("/")}
                        className=" hover:text-red-700 cursor-pointer">
                        Về trang chủ ?
                    </h2>
                </h2>
            </div>
            <div className="w-full justify-center hidden sm:flex">
                <Footer />
            </div>
        </div>
    );
}

export default AdminLayout;
