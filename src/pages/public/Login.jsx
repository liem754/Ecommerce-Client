import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import bg from "assets/images/login1.jpg";
import {
    apiFinalRegister,
    apiLogin,
    apiRegister,
    apiResetPassword,
} from "apis/auth";
import { useDispatch } from "react-redux";
import InputField from "components/inputField";
import validate from "ultils/validate";
import Swal from "sweetalert2";
import { register } from "store/user/userSlice";
import { fix } from "store/app/appSlice";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [invalids, setInvalids] = useState([]);
    const [isLogin, setIsLogin] = useState(location?.state?.flag);
    const [isForgot, setIsForgot] = useState(false);
    const [isemail, setIsemail] = useState("");
    const [code, setCode] = useState("");
    const [modal, setModal] = useState(false);
    const [load, setLoad] = useState(false);
    const [payload, setPayload] = useState({
        password: "",
        email: "",
        phone: "",
        name: "",
    });

    useEffect(() => {
        setIsLogin(location.state?.flag);
    }, [location.state?.flag]);
    const handle = async () => {
        const { name, phone, ...data } = payload;
        if (!isLogin) {
            let invalid = validate(payload, setInvalids);
            if (invalid === 0) {
                setLoad(true);
                const response = await apiRegister(payload);
                if (response?.success) {
                    Swal.fire("Congratulation", response.mes, "success").then(
                        () => {
                            setModal(true);
                            setPayload({
                                password: "",
                                email: "",
                                phone: "",
                                name: "",
                            });
                            setLoad(false);
                        },
                    );
                } else {
                    setLoad(false);

                    Swal.fire("Oops!", response.mes, "error");
                }
            }
        } else {
            let invalid = validate(data, setInvalids);
            if (invalid === 0) {
                setLoad(true);

                const rs = await apiLogin(data && data);

                if (rs.success) {
                    Swal.fire("Congratulation", rs.mes, "success").then(() => {
                        setLoad(false);

                        dispatch(
                            register({
                                isLoggedin: true,
                                token: rs.accessToken,
                            }),
                        );
                        navigate("/");
                    });
                } else {
                    setLoad(false);

                    Swal.fire("Oops!", rs.mes, "error");
                }
            }
        }
    };
    const handleSubmit = async () => {
        const rs = await apiResetPassword({ email: isemail });
        if (rs.success) {
            Swal.fire(
                "Congratulation!",
                "Vui lòng check email của bạn!",
                "success",
            ).then(() => {
                setIsForgot(false);
                dispatch(fix(false));
                setIsemail("");
            });
        } else {
            Swal.fire("Oops!", rs.mes, "error");
        }
    };
    const handleSubmitCode = async () => {
        const rs = await apiFinalRegister(code);
        if (rs.success) {
            Swal.fire(
                "Congratulation!",
                "Xác thực email thành công, Vui lòng đăng nhập!",
                "success",
            ).then(() => {
                setModal(false);
                setIsLogin(true);
            });
        } else {
            Swal.fire("Oops!", rs.mes, "error");
        }
        setCode("");
    };

    return (
        <div className="w-full flex min-h-screen justify-center items-center bg-background-home bg-cover bg-no-repeat object-none object-bottom overflow-y-auto">
            {modal && (
                <div className="absolute animate-slide-bottom z-10 top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center bg-opacity-70">
                    <div className="bg-white border-2 shadow-md p-5 flex flex-col gap-2 rounded-md w-[40%]">
                        <label htmlFor="email" className="font-medium">
                            Please enter the code to authenticate your email
                        </label>
                        <input
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            type="text"
                            className="border border-black p-2"
                        />
                        <div className="flex justify-end gap-5">
                            <button
                                onClick={handleSubmitCode}
                                className="px-3 py-2 bg-black rounded-md text-white">
                                submit
                            </button>
                            <button
                                onClick={() => setModal(false)}
                                className="px-3 py-2 bg-black rounded-md text-white">
                                back
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isForgot && (
                <div className="absolute z-10 animate-slide-bottom inset-0  bg-black flex justify-center items-center bg-opacity-70">
                    <div className="bg-white border-2 shadow-md p-5 flex flex-col gap-2 rounded-md w-[40%]">
                        <label htmlFor="email" className="font-medium">
                            Enter your registered email
                        </label>
                        <input
                            value={isemail}
                            onChange={e => setIsemail(e.target.value)}
                            type="text"
                            placeholder="vd: abc@gmail.com"
                            className="border border-black p-2"
                        />
                        <div className="flex justify-end gap-5">
                            <button
                                onClick={handleSubmit}
                                className="px-3 py-2 bg-black rounded-md text-white">
                                submit
                            </button>
                            <button
                                onClick={() => setIsForgot(false)}
                                className="px-3 py-2 bg-black rounded-md text-white">
                                back
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="lg:w-3/5 w-4/5 border-2 shadow-sm h-[600px]  flex bg-white animate-slide-bottom  ">
                <div className="hidden sm:flex w-[50%] items-end">
                    <img className="w-full h-full" src={bg} alt="" />
                </div>
                <div className="border-2"></div>
                <div className="sm:w-[50%] w-full h-full overflow-y-auto custom-scrollbar ">
                    <div
                        className={`flex min-h-full flex-col justify-center px-6 ${
                            isLogin ? "py-16" : "py-6"
                        }  lg:px-8`}>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-auto w-[45%]"
                                src={logo}
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                {isLogin ? "Login" : "Register"}
                            </h2>
                        </div>

                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="space-y-2">
                                {!isLogin ? (
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.name}
                                                setValue={setPayload}
                                                type="name"
                                                namekey={"name"}
                                                hoder={"Enter name"}
                                                width
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.phone}
                                                setValue={setPayload}
                                                type="phone"
                                                namekey={"phone"}
                                                hoder={"Enter phone"}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload.email}
                                                setValue={setPayload}
                                                type="email"
                                                namekey={"email"}
                                                hoder={"Ex: abc@gmail.com"}
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label
                                                    htmlFor="password"
                                                    className="block text-sm font-medium leading-6 text-gray-900">
                                                    Password
                                                </label>
                                            </div>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload.password}
                                                setValue={setPayload}
                                                type="password"
                                                namekey={"password"}
                                                hoder={"Enter password"}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.email}
                                                setValue={setPayload}
                                                type="email"
                                                namekey={"email"}
                                                hoder={"Ex: abc@gmail.com"}
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label
                                                    htmlFor="password"
                                                    className="block text-sm font-medium leading-6 text-gray-900">
                                                    Password
                                                </label>

                                                <span
                                                    onClick={() => {
                                                        setIsForgot(true);
                                                        dispatch(fix(true));
                                                    }}
                                                    className=" text-xs cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Forgot password?
                                                </span>
                                            </div>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.password}
                                                setValue={setPayload}
                                                type="password"
                                                namekey={"password"}
                                                hoder={"Enter password"}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    {load ? (
                                        <div class="flex w-full gap-2 mt-3 justify-center rounded-md bg-indigo-600 p-3  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            <span class="sr-only">
                                                Loading...
                                            </span>
                                            <div class="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div class="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div class="h-3 w-3 bg-white rounded-full animate-bounce"></div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handle}
                                            type="submit"
                                            className="flex w-full mt-3 justify-center rounded-md bg-indigo-600 px-3 py-2  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className="mt-6  text-sm text-gray-500">
                                {isLogin
                                    ? "Not a member? "
                                    : "Do you already have an account? "}
                                {isLogin ? (
                                    <div className="flex flex-col justify-start items-start gap-1 mt-2">
                                        <button
                                            onClick={() => setIsLogin(false)}
                                            href=""
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            Do not have an account ?
                                        </button>
                                        <button
                                            onClick={() => navigate("/")}
                                            href=""
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            Go Home ?
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        href=""
                                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Login now!
                                    </button>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
