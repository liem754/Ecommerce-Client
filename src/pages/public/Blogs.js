import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
} from "react-router-dom";
import { Breadcrumb } from "../../components";
import { useEffect, useState } from "react";
import { apiGetBlogs, apiGetCategoryBlog } from "apis";
import { path } from "ultils/paths";
import slugify from "slugify";
import SideBarAdmin from "components/SideBarAdmin";
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [cate, setCate] = useState([]);
    const pa = useLocation();
    const fetch = async data => {
        const rs = await apiGetBlogs(data);
        if (rs?.success) setBlogs(rs?.blogs);
    };
    const fetchCate = async () => {
        const rs = await apiGetCategoryBlog();
        if (rs.success) setCate(rs.categorys);
    };
    useEffect(() => {
        fetchCate();
    }, []);
    useEffect(() => {
        if (
            !pa.pathname
                .replace("/blogs/", "")
                .replace("-", " ")
                .includes("64f9")
        ) {
            fetch({
                category: pa.pathname.replace("/blogs/", "").replace("-", " "),
            });
        } else {
            fetch();
        }
    }, [pa]);
    console.log(blogs);
    return (
        <div className="flex flex-col items-center w-full">
            <div className="bg-gray-300 w-full flex justify-center py-2 pl-2">
                <div className="lg:w-4/5 w-[90%] ">
                    <div className="flex flex-col">
                        <h2>Blog</h2>
                        <Breadcrumb category={"blogs"} type={"blog"} />
                    </div>
                </div>
            </div>
            <div className=" flex lg:gap-5 gap-1 lg:w-4/5 w-[90%] mt-7 mb-16">
                <div className="w-[30%] lg:w-[25%] flex flex-col gap-2 border">
                    {cate?.map(el => (
                        <NavLink
                            key={el._id}
                            to={`/blogs/${slugify(el.title)}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white border-b cursor-pointer py-3 lg:px-5 px-2 bg-black lg:text-md text-sm "
                                    : "lg:px-5 px-2  border-b py-3 cursor-pointer hover:bg-gray-200 font-medium lg:text-md text-sm"
                            }>
                            {el.title}
                        </NavLink>
                    ))}
                </div>
                <div className=" flex gap-3 w-[70%] lg:w-[75%] flex-wrap sm:flex-row flex-col">
                    {blogs &&
                        blogs?.map(el => (
                            <Link
                                to={`/blogs/${el._id}/${slugify(
                                    el.title,
                                ).replace("j", "")}`}
                                className="sm:w-[48%] lg:w-[32%] w-full h-[260px] p-2 shadow-xl hover:scale-105">
                                <img
                                    src={el.image[0]}
                                    alt=""
                                    className="h-[200px] w-full"
                                />
                                <h2 className="overflow-hidden text-center line-clamp-2 text-sm w-full">
                                    {el.title}
                                </h2>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
