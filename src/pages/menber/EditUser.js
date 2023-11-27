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
    const [inn, setInn] = useState(false);

    const { data } = useSelector(state => state.user);
    const [image, setImage] = useState(data?.avatar);
    const [payload, setPayload] = useState({
        email: "",
        mobile: "",
        firstname: "",
        lastname: "",
        address: "",

        avatar: "",
    });
    useEffect(() => {
        setPayload({
            email: data?.email,
            mobile: data?.mobile,
            firstname: data?.firstname,
            lastname: data?.lastname,
            address: data?.address,
            avatar: data?.avatar,
        });
    }, [data]);
    const ToBase64 = async files => {
        let image = "";
        for (let i of files) {
            if (
                i.type !== "image/png" &&
                i.type !== "image/jpeg" &&
                i.type !== "image/jpg"
            ) {
                Swal.fire("Oops!", "File not supported!", "info");
            }
            const han = await getBase64(i);
            image = han;
        }

        setImage(image);
        setInn(false);
    };
    // const handleOn = async e => {
    //     const files = e.target.files;

    //     setPayload(pre => ({ ...pre, avatar: files }));
    // };
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
                    dispatch(update({ isUpdate: true }));
                },
            );
        }
    };
    useEffect(() => {
        if (typeof payload?.avatar !== "string") ToBase64(payload?.avatar);
    }, [inn]);

    const handle = () => {
        let invalid = validate(payload, setInvalids);
        if (
            payload.email === data.email &&
            payload.firstname === data?.firstname &&
            payload?.lastname === data?.lastname &&
            payload.mobile === data.mobile &&
            payload?.avatar === image &&
            payload?.address === data?.address
        ) {
            Swal.fire("Oops!", "Bạn chưa thay đổi trường nào cả!", "info");
        } else {
            if (invalid === 0) {
                const formData = new FormData();

                if (payload?.avatar?.length > 0)
                    formData.append("avatar", payload.avatar[0]);
                else delete data.images;
                for (let i of Object.entries(payload))
                    formData.append(i[0], i[1]);
                fetch(formData);
            }
            dispatch(update({ isUpdate: false }));
        }
    };
    console.log(data?.avatar);
    return (
        <div
            onClick={e => {
                e.stopPropagation();
            }}
            className="flex justify-center items-center">
            <div className="flex flex-col gap-6 bg-white lg:w-[60%] lg:p-12 w-[90%] p-8">
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
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                        Address
                    </label>
                    <InputField
                        setInvalids={setInvalids}
                        invalids={invalids}
                        value={payload?.address}
                        setValue={setPayload}
                        type="text"
                        namekey={"address"}
                        width
                    />
                </div>
                <div className="">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-sm font-semibold leading-6 text-gray-900">
                            Avatar:
                        </h2>
                        <div className="flex flex-col gap-1 items-center">
                            <img
                                src={image}
                                alt=""
                                className=" w-[70px] h-[70px] rounded-[50%]"
                            />
                            <label
                                htmlFor="avatar"
                                className=" px-3 py-1 text-sm rounded-md bg-black text-white">
                                Đổi ảnh
                            </label>
                        </div>
                    </div>
                    <input
                        id="avatar"
                        type="file"
                        hidden
                        onChange={e => {
                            setPayload(pre => ({
                                ...pre,
                                avatar: e.target.files,
                            }));
                            setInn(true);
                        }}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handle}
                        className="py-2 w-full bg-red-600 text-white rounded-sm hover:bg-red-700">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
