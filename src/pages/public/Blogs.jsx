import {
    NavLink,
    useLocation,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { BlogFeature, Breadcrumb, Pagination } from "components";
import { useEffect, useState } from "react";
import { apiGetBlogs, apiGetCategoryBlog } from "apis";
import slugify from "slugify";
function Blogs() {
    const { title, category } = useParams();
    const [params] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [cate, setCate] = useState([]);
    const pa = useLocation();
    const fetch = async data => {
        const rs = await apiGetBlogs(data);
        if (rs?.success) setBlogs(rs);
    };
    const fetchCate = async () => {
        const rs = await apiGetCategoryBlog();
        if (rs.success) setCate(rs.categorys);
    };
    useEffect(() => {
        fetchCate();
    }, []);
    useEffect(() => {
        let query = {};
        for (let i of params) query[i[0]] = i[1];
        if (pa.pathname.split("/").length === 3) {
            fetch({
                ...query,
                category: pa.pathname
                    .replace("/blogs/", "")
                    .replace("and", "&")
                    .replaceAll("-", " "),
                limit: 3,
            });
        } else {
            fetch({ ...query, limit: 3 });
        }
    }, [pa]);
    return (
        <div className="flex flex-col items-center w-full mb-24">
            <div className="bg-gray-300 w-full flex justify-center py-2 pl-2">
                <div className="lg:w-4/5 w-[96%] ">
                    <div className="flex flex-col">
                        <h2>Blog</h2>
                        <Breadcrumb
                            category={category}
                            type={"blogs"}
                            title={title}
                        />
                    </div>
                </div>
            </div>
            <div className=" flex lg:gap-5 gap-1 lg:w-4/5 w-[96%] mt-7 mb-16 h-screen">
                <div className="w-[30%] lg:w-[25%] flex flex-col gap-2 border">
                    <h2 className="font-bold text-2xl p-4">Category</h2>
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
                <div className="w-[70%] lg:w-[75%]  px-10 py-2">
                    <h2 className="font-bold text-3xl text-center mb-8">
                        BLOG LIST
                    </h2>
                    <div className="list_blog flex flex-wrap sm:flex-row gap-5">
                        {blogs &&
                            blogs?.blogs?.map(el => (
                                <BlogFeature
                                    key={el._id}
                                    id={el._id}
                                    title={el.title}
                                    image={el.images}
                                    time={el.createdAt}
                                    user={el.author}
                                />
                            ))}
                    </div>
                    {blogs?.blogs?.length > 0 && (
                        <div className="mt-20 w-full">
                            <Pagination
                                type="blog"
                                totalCount={blogs?.counts}
                                pageSize={blogs?.limit}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
