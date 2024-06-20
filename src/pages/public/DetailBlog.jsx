import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components";
import { useEffect, useState } from "react";
import { apiGetBlog } from "apis";
import DOMPurify from "dompurify";

function DetailBlog() {
    const [blogg, setBlogg] = useState(null);
    const fetch = async id => {
        const rs = await apiGetBlog(id);
        if (rs.success) setBlogg(rs.rs);
    };
    const { blog, bid } = useParams();
    useEffect(() => {
        if (bid) fetch(bid);
    }, [bid]);
    // const param=useLocation()
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
                    src={blogg?.image[0]}
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
        </div>
    );
}

export default DetailBlog;
