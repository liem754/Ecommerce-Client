import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function FinalRegister() {
    const { status } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (status === "false") {
            Swal.fire("Oops!", "Đăng ký không thành công!", "error").then(
                () => {
                    navigate("/login");
                },
            );
        } else {
            Swal.fire(
                "Congratulation!",
                "Đăng ký thành công! Please login",
                "success",
            ).then(() => {
                navigate("/login");
            });
        }
    }, []);
    return <div className="w-sceen h-screen bg-gray-200"></div>;
}

export default FinalRegister;
