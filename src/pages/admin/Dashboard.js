import logo from "assets/images/logo3.png";

function DashBoard() {
    return (
        <div className="">
            <div className="w-full flex justify-center">
                <img
                    className=" w-[35%] p-2 ml-4 mt-10 "
                    src={logo}
                    alt="Your Company"
                />
            </div>
        </div>
    );
}

export default DashBoard;
