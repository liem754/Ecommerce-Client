import { memo, useState } from "react";
import InputField from "./inputField";
import validate from "ultils/validate";
import { apiUpdateUser } from "apis";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { update } from "store/user/userSlice";

function Modal({ setEdit }) {
    const [modal, setModal] = useState(false);
    const [invalids, setInvalids] = useState([]);
    const { data } = useSelector(state => state.user);
    const [payload, setPayload] = useState({
        email: data?.email || "",
        mobile: data?.mobile || "",
        firstname: data?.firstname || "",
        lastname: data?.lastname || "",
    });
    const dispatch = useDispatch();
    const fetch = async data => {
        const rs = await apiUpdateUser(data);
        if (rs.success) {
            Swal.fire("Oops!", "Update user thành công!", "success").then(
                () => {
                    dispatch(update({ isUpdate: true }));
                    setEdit({});
                },
            );
        }
    };
    const handle = () => {
        let invalid = validate(payload, setInvalids);
        if (
            payload.email === data.email &&
            payload.firstname === data?.firstname &&
            payload?.lastname === data?.lastname &&
            payload.mobile === data.mobile
        ) {
            Swal.fire("Oops!", "Bạn chưa thay đổi trường nào cả!", "info");
        } else {
            if (invalid === 0) {
                fetch(payload);
            }
            dispatch(update({ isUpdate: false }));
        }
    };

    return (
        <div
            onClick={e => {
                e.stopPropagation();
                setEdit({});
            }}
            className=" animate-slide-bottom absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div
                onClick={e => {
                    e.stopPropagation();
                }}
                className="flex flex-col gap-6 bg-white w-[50%] p-5">
                <h2 className="text-xl font-semibold text-center my-2">
                    CHỈNH SỬA TÀI KHOẢN
                </h2>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
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
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                        Last Name
                    </label>
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
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                        Email
                    </label>
                    <InputField
                        setInvalids={setInvalids}
                        invalids={invalids}
                        value={payload?.email}
                        setValue={setPayload}
                        type="email"
                        namekey={"email"}
                        width
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                        Phone
                    </label>
                    <InputField
                        setInvalids={setInvalids}
                        invalids={invalids}
                        value={payload?.mobile}
                        setValue={setPayload}
                        type="mobile"
                        namekey={"mobile"}
                        width
                    />
                </div>
                <div className="flex justify-between my-2">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            setEdit({});
                        }}
                        className="bg-black py-2 px-6 rounded-sm text-white hover:bg-gray-700">
                        Cancel
                    </button>

                    <button
                        onClick={handle}
                        className="py-2 px-6 bg-red-600 text-white rounded-sm hover:bg-red-700">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(Modal);
