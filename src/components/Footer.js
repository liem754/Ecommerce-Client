import { Link } from "react-router-dom";
import { Icons } from "../ultils/icons";

const { FaFacebook, FaTwitter, FaGoogle, FaPinterest, AiFillInstagram } = Icons;
const tags = [
    "10-20",
    "100-200",
    "20-50",
    "200-300",
    "300-400",
    "400-500",
    "50-100",
    "500-600",
    "600-700",
    "700-800",
    "800-900",
    "900-1000",
    "Accessories",
    "Acer",
];
function Footer() {
    return (
        <div className="w-full bg-black flex flex-col items-center justify-center text-white">
            <div className="lg:w-4/5 w-[93%] mt-3 py-7 md:flex justify-between border-b border-gray-500">
                <div className="flex flex-col gap-2 mb-10 sm:mb-0 ml-10 sm:ml-0">
                    <h2 className="pl-2 font-bold mb-1 border-l-4 border-blue-600 lg:text-md text-sm">
                        ABOUT US
                    </h2>
                    <div className="flex items-center gap-1 ">
                        <h2 className="text-[14px] font-medium">Address :</h2>
                        <span className=" text-gray-300  text-sm">
                            Louis' Tower, Hóc Môn, Hồ Chí Minh
                        </span>
                    </div>
                    <div className="flex items-center gap-1 ">
                        <h2 className="text-[14px] font-medium">Phone :</h2>
                        <span className=" text-gray-300  text-sm">
                            +84 906 641 5xx
                        </span>
                    </div>
                    <div className="flex items-center gap-1 ">
                        <h2 className="text-[14px] font-medium">Mail :</h2>
                        <span className=" text-gray-300  text-sm">
                            abc@gmail.com
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 border border-white rounded-md">
                            <FaFacebook />
                        </div>
                        <div className="p-2 border border-white rounded-md">
                            <FaGoogle />
                        </div>
                        <div className="p-2 border border-white rounded-md">
                            <FaPinterest />
                        </div>
                        <div className="p-2 border border-white rounded-md">
                            <FaTwitter />
                        </div>
                        <div className="p-2 border border-white rounded-md">
                            <AiFillInstagram />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-10 sm:mb-0 ml-10 sm:ml-0">
                    <h2 className="pl-2 font-bold mb-1 border-l-4 border-blue-600 lg:text-md text-sm">
                        INFORMATION
                    </h2>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Help
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Free Shipping
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            FAQs
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Return & Exchange
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Testimonials
                        </span>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 mb-10 sm:mb-0 ml-10 sm:ml-0">
                    <h2 className="pl-2 font-bold mb-1 border-l-4 border-blue-600 lg:text-md text-sm">
                        WHO WE ARE
                    </h2>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Typography
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Gallery
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Store Location
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Today's Deals
                        </span>
                    </Link>
                    <Link to className="flex items-center gap-1 ">
                        <span className=" text-gray-300 hover:text-red-400 text-xs lg:text-sm">
                            Contact
                        </span>
                    </Link>
                </div>
                <div className="lg:flex hidden flex-col gap-2">
                    <h2 className="pl-2 font-bold mb-1 border-l-4 border-blue-600 lg:text-md text-sm">
                        #DIGITALWORLDSTORE
                    </h2>
                </div>
            </div>
            <div className="w-[90%] lg:w-4/5 py-6 mb-16 ml-10 sm:ml-0">
                <h2 className="pl-2 font-bold mb-1 border-l-4 border-blue-600  lg:text-md text-sm">
                    PRODUCT TAGS
                </h2>
                {tags.map((item, index) => (
                    <Link
                        key={index}
                        className="border-r border-gray-700 px-2 text-xs lg:text-sm">
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Footer;
