import { Link } from "react-router-dom";
import slugify from "slugify";

function BlogFeature({ id, title, image, size }) {
    return (
        <Link
            key={id}
            to={`/blogs/${id}/${slugify(title).replace("j", "")}`}
            className={`sm:w-[48%]  ${
                size ? "lg:w-[23%]" : "lg:w-[32%]"
            }  w-full h-[260px] shadow-xl hover:scale-105`}>
            <img src={image[0]} alt="" className="h-[200px] w-full" />
            <h2 className="overflow-hidden text-center line-clamp-2 text-sm w-full pt-2 px-2 font-medium">
                {title}
            </h2>
        </Link>
    );
}

export default BlogFeature;
