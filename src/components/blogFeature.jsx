import { Link } from "react-router-dom";
import slugify from "slugify";

function BlogFeature({ id, title, image, size, time, user }) {
    return (
        <Link
            key={id}
            to={`/blogs/${id}/${slugify(title).replace("j", "")}`}
            className={`sm:w-[43%]  ${
                size ? "lg:w-[23%]" : "lg:w-[30%]"
            }  w-full shadow-xl hover:scale-105 rounded-md pb-5`}>
            <img
                src={image[0] || image[1]}
                alt=""
                className="h-[200px] w-full rounded-md"
            />
            <div className="flex justify-between py-2 px-2">
                <p className="text-xs text-gray-500 ">
                    {time.substring(0, 10)}
                </p>
                <p className="text-xs text-gray-500 ">{user}</p>
            </div>
            <h2 className="overflow-hidden text-center line-clamp-2 text-sm w-full px-2 font-medium">
                {title}
            </h2>
        </Link>
    );
}

export default BlogFeature;
