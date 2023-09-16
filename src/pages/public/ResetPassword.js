import { useState } from "react";
import InputField from "../../components/inputField";
import logo from "../../assets/images/logo3.png";
import { useNavigate, useParams } from "react-router-dom";
import { apiChangePassword } from "../../apis";
import Swal from "sweetalert2";
function ResetPassword() {
    const navigate = useNavigate();
    const [payload, setPayload] = useState("");
    const { token } = useParams();
    const handleSubmit = async () => {
        const rs = await apiChangePassword({ password: payload, token: token });
        if (rs.success) {
            Swal.fire(
                "Congratulation!",
                "Update password thành công!",
                "success",
            ).then(() => {
                navigate("/login");
            });
        } else {
            Swal.fire("Oops!", rs.mes, "error");
        }
    };
    return (
        <div className="w-full flex h-screen justify-center items-center bg-background-home bg-cover bg-no-repeat object-none object-bottom">
            <div className="w-3/5 border-2 shadow-sm flex bg-white ">
                <div className=" w-[50%] flex items-end">
                    <img
                        className="w-full"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        alt=""
                    />
                </div>
                <div className="border-2"></div>
                <div className="w-[50%] ">
                    <div
                        class={`flex min-h-full flex-col justify-center px-6   lg:px-8`}>
                        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                class="mx-auto h-auto w-[45%]"
                                src={logo}
                                alt="Your Company"
                            />
                            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Đổi mật khẩu
                            </h2>
                        </div>

                        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div class="space-y-2">
                                <div>
                                    <div className="flex flex-col gap-3">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">
                                            Nhập mật khẩu mới
                                        </label>

                                        <input
                                            value={payload}
                                            onChange={e =>
                                                setPayload(e.target.value)
                                            }
                                            type="password"
                                            placeholder="password"
                                            className="border border-black p-2"
                                        />

                                        <button
                                            onClick={handleSubmit}
                                            className="px-3 py-2 bg-black rounded-md text-white">
                                            submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
