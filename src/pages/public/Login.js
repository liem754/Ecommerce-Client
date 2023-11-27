import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/logo3.png";
import {
    apiFinalRegister,
    apiLogin,
    apiRegister,
    apiResetPassword,
} from "../../apis/auth";
import { path } from "../../ultils/paths";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../store/user/asyncActions";
import InputField from "../../components/inputField";
import validate from "../../ultils/validate";
import Swal from "sweetalert2";
import { register } from "../../store/user/userSlice";
function Login() {
    // const { IsLogin } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [invalids, setInvalids] = useState([]);
    const [isLogin, setIsLogin] = useState(location?.state?.flag);
    const [isForgot, setIsForgot] = useState(false);
    const [isemail, setIsemail] = useState("");
    const [code, setCode] = useState("");
    const [modal, setModal] = useState(false);
    const [payload, setPayload] = useState({
        password: "",
        email: "",
        mobile: "",
        firstname: "",
        lastname: "",
    });
    const fetch = async () => {
        const response = await apiRegister(payload);
    };
    // const fetchLogin = async () => {
    //     const response = dispatch
    //     if (response?.sucess) navigate("/");
    //     else throw new Error("Login not found!!");
    //     console.log(response);
    // };
    useEffect(() => {
        setIsLogin(location.state?.flag);
    }, [location.state?.flag]);
    const handle = async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        if (!isLogin) {
            let invalid = validate(payload, setInvalids);
            if (invalid === 0) {
                const response = await apiRegister(payload);
                if (response?.success) {
                    Swal.fire("Congratulation", response.mes, "success").then(
                        () => {
                            setModal(true);
                            setPayload({
                                password: "",
                                email: "",
                                mobile: "",
                                firstname: "",
                                lastname: "",
                            });
                        },
                    );
                } else {
                    Swal.fire("Oops!", response.mes, "error");
                }
            }
        } else {
            let invalid = validate(data, setInvalids);
            if (invalid === 0) {
                const rs = await apiLogin(data);
                if (rs.success) {
                    Swal.fire("Congratulation", rs.mes, "success").then(() => {
                        dispatch(
                            register({
                                isLoggedin: true,
                                token: rs.accessToken,
                            }),
                        );
                        navigate("/");
                    });
                } else {
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
        <div className="w-full flex h-screen justify-center items-center bg-background-home bg-cover bg-no-repeat object-none object-bottom">
            {modal && (
                <div className="absolute animate-slide-bottom top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center bg-opacity-70">
                    <div className="bg-white border-2 shadow-md p-5 flex flex-col gap-2 rounded-md w-[40%]">
                        <label htmlFor="email" className="font-medium">
                            Nhập code để xác thực
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
                <div className="absolute animate-slide-bottom top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center bg-opacity-70">
                    <div className="bg-white border-2 shadow-md p-5 flex flex-col gap-2 rounded-md w-[40%]">
                        <label htmlFor="email" className="font-medium">
                            Nhập email của bạn
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
            <div className="lg:w-3/5 w-4/5 border-2 shadow-sm flex bg-white ">
                <div className=" hidden sm:flex w-[50%] items-end">
                    <img
                        className="w-full"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        alt=""
                    />
                </div>
                <div className="border-2"></div>
                <div className="sm:w-[50%] w-full ">
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
                                {isLogin ? "Đăng nhập" : "Đăng ký"}
                            </h2>
                        </div>

                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="space-y-2">
                                {!isLogin ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                First Name
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.firstname}
                                                setValue={setPayload}
                                                type="firstname"
                                                namekey={"firstname"}
                                                width
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Last Name
                                                </label>
                                            </div>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.lastname}
                                                setValue={setPayload}
                                                type="lastname"
                                                namekey={"lastname"}
                                                width
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="mobile"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.mobile}
                                                setValue={setPayload}
                                                type="mobile"
                                                namekey={"mobile"}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload.email}
                                                setValue={setPayload}
                                                type="email"
                                                namekey={"email"}
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
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <InputField
                                                setInvalids={setInvalids}
                                                invalids={invalids}
                                                value={payload?.email}
                                                setValue={setPayload}
                                                type="email"
                                                namekey={"email"}
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
                                                    onClick={() =>
                                                        setIsForgot(true)
                                                    }
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
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <button
                                        onClick={handle}
                                        type="submit"
                                        className="flex w-full mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        {isLogin ? "Sign in" : "Sign up"}
                                    </button>
                                </div>
                            </div>

                            <p className="mt-6  text-sm text-gray-500">
                                {isLogin
                                    ? "Not a member? "
                                    : "Do you already have an account? "}
                                {isLogin ? (
                                    <div className="flex flex-col justify-start items-start gap-1">
                                        <button
                                            onClick={() => setIsLogin(false)}
                                            href=""
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            Bạn chưa có tài khoản ?
                                        </button>
                                        <button
                                            onClick={() => navigate("/")}
                                            href=""
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            Về trang chủ ?
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        href=""
                                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Đăng nhập ngay!!
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
