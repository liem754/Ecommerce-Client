import { Link } from "react-router-dom";
import { format, formatStar } from "ultils/format";
function ProductFeatures({ img, title, price, star, cate, id, slug }) {
    return (
        <Link key={id} to={`/${cate.toLowerCase()}/${id}/${slug}`}>
            <div className="flex gap-3 border shadow-md py-3 px-2">
                <div className="w-[30%]  flex justify-center">
                    <img
                        className="w-[80%] h-[110px] hover:scale-105"
                        src={
                            img ||
                            "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="w-[70%]">
                    <h1 className="text-sm">{title}</h1>
                    <h2 className="flex gap-1 py-1">{formatStar(star)}</h2>
                    <h3>{format(price)}</h3>
                </div>
            </div>
        </Link>
    );
}

export default ProductFeatures;
