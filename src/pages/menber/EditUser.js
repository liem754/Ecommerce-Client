import { apidata, apiUpdateUser } from "apis";
import { Modal } from "components";
import InputField from "components/inputField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IdCurrent, update } from "store/user/userSlice";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helpers";
import validate from "ultils/validate";

function EditUser() {
    const [invalids, setInvalids] = useState([]);
    const { data } = useSelector(state => state.user);
    const [payload, setPayload] = useState({
        email: data?.email || "",
        mobile: data?.mobile || "",
        firstname: data?.firstname || "",
        lastname: data?.lastname || "",
        avatar: data
            ? data?.avatar[0]
            : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
    });

    const dispatch = useDispatch();
    const fetch = async data => {
        const rs = await apiUpdateUser(data);
        if (rs.success) {
            Swal.fire("Oops!", "Update user thành công!", "success").then(
                () => {
                    dispatch(
                        IdCurrent({
                            idCurrent: rs.rs?._id,
                            data: rs.rs,
                        }),
                    );
                    // setPayload({
                    //     email: data?.email || "",
                    //     mobile: data?.mobile || "",
                    //     firstname: data?.firstname || "",
                    //     lastname: data?.lastname || "",
                    //     avatar:
                    //         data?.avatar ||
                    //         "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
                    // });
                    dispatch(update({ isUpdate: true }));
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
                const formData = new FormData();

                for (let i of Object.entries(payload))
                    formData.append(i[0], i[1]);
                if (payload.avatar) {
                    for (let i of payload.avatar) formData.append("avatar", i);
                }
                // console.log(formData);
                fetch(formData);
            }
            dispatch(update({ isUpdate: false }));
        }
    };
    return (
        <div
            onClick={e => {
                e.stopPropagation();
            }}
            className="flex flex-col gap-6 bg-white w-[50%] p-12">
            <h2 className="text-2xl font-bold">Chỉnh sửa tài khoản</h2>
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
            <div className="">
                <label htmlFor="avatar">
                    <img
                        src={
                            payload?.avatar === ""
                                ? "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                                : data?.avatar[0]
                        }
                        alt=""
                    />
                </label>
                <input
                    id="avatar"
                    type="file"
                    hidden
                    onChange={e =>
                        setPayload(pre => ({ ...pre, avatar: e.target.files }))
                    }
                />
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handle}
                    className="py-2 px-6 bg-red-600 text-white rounded-sm hover:bg-red-700">
                    Update
                </button>
            </div>
        </div>
    );
}

export default EditUser;
