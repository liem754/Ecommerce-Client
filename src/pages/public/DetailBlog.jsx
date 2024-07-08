import { useLocation, useParams } from "react-router-dom";
import { BlogFeature, Breadcrumb } from "../../components";
import { useEffect, useState } from "react";
import { apiDisLikeBlog, apiGetBlog, apiGetBlogs, apiLikeBlog } from "apis";
import DOMPurify from "dompurify";
import { Icons } from "ultils/icons";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const { GrDislike, GrLike } = Icons;
function DetailBlog() {
    const [blogg, setBlogg] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [update, setUpdate] = useState(false);
    const { data } = useSelector(state => state.user);

    const fetch = async id => {
        const rs = await apiGetBlog(id);
        if (rs.success) {
            setBlogg(rs.rs);

            fetchBlogs({ category: rs.rs?.category });
        }
    };
    const fetchBlogs = async data => {
        const rs = await apiGetBlogs(data);
        if (rs.success) setBlogs(rs.blogs);
    };
    const { blog, bid } = useParams();
    useEffect(() => {
        if (bid) {
            fetch(bid);
        }
    }, [bid, update]);

    const handleLike = async () => {
        const rs = await apiLikeBlog(blogg._id);
        if (rs.success) {
            Swal.fire("Congratulation", rs.mes, "success").then(() => {
                setUpdate(!update);
            });
        }
    };
    const handleDisLike = async () => {
        const rs = await apiDisLikeBlog(blogg._id);
        if (rs.success) {
            Swal.fire("Congratulation", rs.mes, "success").then(() => {
                setUpdate(!update);
            });
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-gray-300 w-full flex justify-center py-2">
                <div className="w-4/5 ">
                    <div className="flex flex-col">
                        <h2>Blog</h2>
                        <Breadcrumb
                            category={"blogs"}
                            title={blog}
                            type={"blog"}
                        />
                    </div>
                </div>
            </div>
            <div className="w-4/5 my-16">
                <h2 className="text-3xl font-medium mb-3 text-center">
                    {blogg?.title}
                </h2>
                <img
                    src={blogg?.images[0]}
                    alt="bg"
                    className="w-full object-cover"
                />
                <div className="flex flex-col gap-5 font-normal text-justify p-4 text-md leading-10">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blogg?.description),
                        }}></div>
                </div>
            </div>
            <div className="mb-10">
                <h2 className="font-medium text-2xl mb-4">
                    Do you like blog ?
                </h2>
                <section className="flex gap-5 justify-center items-center">
                    <div
                        onClick={handleLike}
                        className={`p-4 rounded-[50%] w-[80px] h-[80px] ${
                            blogg?.likes.some(el => el._id === data._id) &&
                            "bg-gray-400 cursor-not-allowed"
                        } border border-gray-950 cursor-pointer hover:bg-gray-400 flex flex-col justify-center items-center `}>
                        <GrLike size={40} />
                        <span>{blogg?.likes.length}</span>
                    </div>
                    <div
                        onClick={handleDisLike}
                        className={`p-4 rounded-[50%] w-[80px] h-[80px] ${
                            blogg?.dislikes.some(el => el._id === data._id) &&
                            "bg-gray-400 cursor-not-allowed"
                        } border border-gray-950 cursor-pointer hover:bg-gray-400 flex flex-col justify-center items-center`}>
                        <GrDislike size={30} />
                        <span>{blogg?.dislikes.length}</span>
                    </div>
                </section>
            </div>

            <h2 className="text-2xl font-medium text-center">Similar blogs</h2>
            <div className="w-4/5 my-10 flex flex-wrap gap-5">
                {blogs &&
                    blogs
                        .filter(item => item.id !== bid)
                        ?.map(el => (
                            <BlogFeature
                                size={true}
                                key={el._id}
                                id={el._id}
                                title={el.title}
                                image={el.images}
                                time={el.createdAt}
                                user={el.author}
                            />
                        ))}
            </div>
        </div>
    );
}

export default DetailBlog;
