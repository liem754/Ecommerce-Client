import { Breadcrumb } from "../../../components";
import "./contact.css";
import logo from "../../../assets/images/logo3.png";
import { Icons } from "../../../ultils/icons";
const { FaFacebook, FaTwitter, FaGoogle, FaPinterest, AiFillInstagram } = Icons;

function Contact() {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex w-full items-center justify-center bg-gray-200">
                <div className="lg:w-4/5 w-[90%] py-4 flex flex-col gap-1">
                    <h2>Contact us</h2>
                    <Breadcrumb category={"contact-us"} />
                </div>
            </div>
            <div className="lg:w-4/5 w-[90%] py-2">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.63139492351!2d106.59518557481888!3d10.839494758027708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b4a72e239c1%3A0xf54ab49439c72fb1!2sLouis&#39;%20Tower!5e0!3m2!1svi!2s!4v1692547372757!5m2!1svi!2s"
                    width="100%"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="lg:w-4/5 w-[90%] py-6 bg-gray-200 flex justify-around">
                <div className="flex p-4 w-[90%] bg-white gap-2">
                    <form className="form p-4 border border-gray-400 w-[50%] ">
                        <img
                            className=" w-[45%] py-2"
                            src={logo}
                            alt="Your Company"
                        />

                        <div className="title">Contact us</div>
                        <input
                            type="text"
                            placeholder="Your email"
                            className="input"
                        />
                        <textarea placeholder="Your message"></textarea>

                        <button>Submit</button>
                    </form>
                    <div className="border-black border"></div>
                    <div className="flex flex-col gap-2 bg-white border border-gray-500 rounded-md w-[50%] py-3 px-6">
                        <h2 className="pl-2 font-bold text-center mb-1  mt-4  ">
                            CONTACT US
                        </h2>
                        <div className="flex items-center gap-1 ">
                            <h2 className="text-[14px] font-medium">
                                Address :
                            </h2>
                            <span className=" text-black  text-sm">
                                Louis' Tower, Hóc Môn, Hồ Chí Minh
                            </span>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h2 className="text-[14px] font-medium">Phone :</h2>
                            <span className=" text-black  text-sm">
                                +84 906 641 5xx
                            </span>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h2 className="text-[14px] font-medium">Mail :</h2>
                            <span className=" text-black  text-sm">
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
                </div>
            </div>
        </div>
    );
}

export default Contact;
