import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation } from "../../components";

function Public() {
    return (
        <div className=" max-h-screen overflow-y-auto">
            <div className="w-full flex justify-center ">
                <Header />
            </div>
            <div className="w-full flex justify-center border-b-2 shrink-0 bg-black text-white">
                <Navigation />
            </div>

            <div className="w-full flex justify-center">
                <Outlet />
            </div>
            <div className="w-full flex justify-center">
                <Footer />
            </div>
        </div>
    );
}

export default Public;
