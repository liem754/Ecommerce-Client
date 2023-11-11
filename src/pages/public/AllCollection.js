import { useSelector } from "react-redux";
import smartphone from "../../assets/images/smartphone.jpg";
import laptop from "../../assets/images/laptop.jpg";
import printer from "../../assets/images/printer.jpg";
import television from "../../assets/images/television.jpg";
import tablet from "../../assets/images/tablet.jpg";
import speaker from "../../assets/images/speaker.jpg";
import camera from "../../assets/images/camera.jpg";
import access from "../../assets/images/acess.jpg";
import { Link } from "react-router-dom";
import { Icons } from "../../ultils/icons";
const { AiOutlineRight } = Icons;
function AllCollection({ home }) {
    const { category } = useSelector(state => state.appReducer);
    const { show } = useSelector(state => state.product);
    return (
        <div className={`${home ? "w-full" : "w-4/5"} mt-24 `}>
            <h1
                className={`${
                    home
                        ? "text-xl font-bold py-3 border-b-2 border-red-600"
                        : "text-2xl font-bold"
                }`}>
                {home ? "HOT COLLECTIONS" : "All COLLECTIONS"}
            </h1>
            <div
                className={`md:flex w-full flex-wrap   ${
                    home ? "gap-4 my-9" : "justify-between gap-7 my-20"
                }`}>
                {category &&
                    category
                        .filter(el => el.brand.length > 0)
                        .map(item => (
                            <Link
                                to={`/${item.title?.toLowerCase()}`}
                                key={item.id}
                                className={`${
                                    home
                                        ? " w-[47%] lg:w-[32%] border-2 py-3 px-4"
                                        : "w-[47%] lg:w-[30%]"
                                }`}>
                                <div
                                    className={`w-full   items-center  ${
                                        home
                                            ? "flex gap-5 "
                                            : "flex flex-col justify-center gap-2"
                                    }`}>
                                    <img
                                        className={`${
                                            home
                                                ? "w-[40%] hover:scale-105"
                                                : "w-[50%] object-cover hover:scale-105"
                                        } `}
                                        src={
                                            item.title === "Smartphone"
                                                ? smartphone
                                                : item.title === "Laptop"
                                                ? laptop
                                                : item.title === "Printer"
                                                ? printer
                                                : item.title === "Speaker"
                                                ? speaker
                                                : item.title === "Television"
                                                ? television
                                                : item.title === "Tablet"
                                                ? tablet
                                                : item.title === "Camera"
                                                ? camera
                                                : access
                                        }
                                    />
                                    {home ? (
                                        <div className="flex flex-col">
                                            <h2 className="font-medium">
                                                {item.title}
                                            </h2>

                                            <div className="flex flex-col gap-1">
                                                {item.brand?.map(el => (
                                                    <p className="text-xs flex gap-1 items-center py-[4px]">
                                                        <AiOutlineRight
                                                            size={"10px"}
                                                        />
                                                        <span>{el}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <h2>{item.title}</h2>
                                    )}
                                </div>
                            </Link>
                        ))}
            </div>
        </div>
    );
}

export default AllCollection;
