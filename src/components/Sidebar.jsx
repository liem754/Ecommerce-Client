import { useEffect, useState } from "react";
import { apiGetCategory } from "../apis/app";
import { Link } from "react-router-dom";
import { Icons } from "../ultils/icons";
import { useSelector } from "react-redux";
const {
    BsPhone,
    FaTabletAlt,
    AiOutlineLaptop,
    SlEarphones,
    PiTelevisionSimpleBold,
    AiOutlinePrinter,
    AiOutlineCamera,
    CiSpeaker,
} = Icons;
function Sidebar() {
    const { category } = useSelector(state => state.appReducer);
    // const [category, setCategory] = useState([]);
    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await apiGetCategory();
    //         setCategory(response.categorys);
    //         console.log(response);
    //     };
    //     fetch();
    // }, []);

    return (
        <div className="flex flex-col">
            <Link
                to="/all-product"
                className="py-4 hover:text-red-600 text-xs lg:text-[15px]">
                All products
            </Link>
            {category &&
                category.map((item, index) => (
                    <Link
                        key={index}
                        to={`/${item.title?.toLowerCase()}`}
                        className="hover:text-red-600 py-4  flex items-center gap-1">
                        {item.title === "Smartphone" ? (
                            <BsPhone />
                        ) : item.title === "Tablet" ? (
                            <FaTabletAlt size={"14px"} />
                        ) : item.title === "Laptop" ? (
                            <AiOutlineLaptop />
                        ) : item.title === "Accessories" ? (
                            <SlEarphones size={"14px"} />
                        ) : item.title === "Television" ? (
                            <PiTelevisionSimpleBold />
                        ) : item.title === "Printer" ? (
                            <AiOutlinePrinter />
                        ) : item.title === "Speaker" ? (
                            <CiSpeaker />
                        ) : (
                            <AiOutlineCamera />
                        )}
                        <span className="text-xs lg:text-[15px]">{`${item.title} (${item.brand.length})`}</span>
                    </Link>
                ))}
        </div>
    );
}

export default Sidebar;
