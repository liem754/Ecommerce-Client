import { Link } from "react-router-dom";
function Banner() {
    return (
        <div className=" hidden md:flex gap-2 lg:gap-4 h-[655px]">
            <Link
                to={"/tablet"}
                className="h-full w-[65%] lg:w-[50%] border-2 gallery img hover:border-blue-500">
                <img
                    className="h-full w-full object-cover "
                    src="https://m.media-amazon.com/images/G/31/img23/FS/Pad-Slim-PC-Banner-978x900._SY875_QL85_.jpg"
                    alt=""
                />
                <img
                    className="h-full"
                    src="https://img.freepik.com/premium-psd/realistic-view-stylist-tablet-mockup-design_80802-979.jpg"
                    alt="a lioness"></img>
            </Link>
            <div className=" md:flex hidden flex-col gap-4 h-full w-[35%]  lg:w-[25%]">
                <Link to={"/camera"} className="w-full h-full">
                    <img
                        className="h-full border-2 w-full img"
                        src="https://media.istockphoto.com/id/1130904817/vector/photo-camera-banner.jpg?s=170667a&w=0&k=20&c=NB-bQJaJXrIlN1lJmUH_fN0idSDSymY07-5yDN7ZlV0="
                        alt=""
                    />
                </Link>
                <Link to={"/speaker"} className="w-full h-full">
                    <img
                        className="h-full border-2 w-full"
                        src="https://cdn4.vectorstock.com/i/1000x1000/02/03/modern-smart-speaker-banner-set-isometric-style-vector-25200203.jpg"
                        alt=""
                    />
                </Link>
            </div>
            <Link
                to={"/television"}
                className="h-full w-0  lg:w-[25%] border-2">
                <img
                    className="h-full"
                    src="https://as2.ftcdn.net/v2/jpg/02/57/37/59/1000_F_257375954_KMW5e6IUlBGETJymGwidbhSRSAiWWW4g.jpg"
                    alt=""
                />
            </Link>
        </div>
    );
}

export default Banner;
