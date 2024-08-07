import { apiUpdateUser } from "apis";
import InputField from "components/inputField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "store/app/appSlice";
import { IdCurrent, update } from "store/user/userSlice";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helpers";
import validate from "ultils/validate";

function EditUser() {
    const [invalids, setInvalids] = useState([]);
    const [inn, setInn] = useState(false);
    const { data } = useSelector(state => state.user);
    const { isShow } = useSelector(state => state.appReducer);
    const [image, setImage] = useState(data?.avatar);
    const [payload, setPayload] = useState({
        email: "",
        phone: "",
        name: "",

        address: "",

        avatar: "",
    });
    useEffect(() => {
        setPayload({
            email: data?.email,
            phone: data?.phone,
            name: data?.name,

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

    const dispatch = useDispatch();
    const fetch = async data => {
        const rs = await apiUpdateUser(data);
        if (rs.success) {
            dispatch(show(false));
            Swal.fire(
                "Congratulations",
                "Successfully updated !",
                "success",
            ).then(() => {
                dispatch(
                    IdCurrent({
                        idCurrent: rs.rs?._id,
                        data: rs.rs,
                    }),
                );
                dispatch(update({ isUpdate: true }));
            });
        }
    };
    useEffect(() => {
        if (typeof payload?.avatar !== "string") ToBase64(payload?.avatar);
    }, [inn]);

    const handle = () => {
        if (
            payload.email === data.email &&
            payload.name === data?.name &&
            payload.phone === data.phone &&
            payload?.avatar === image &&
            payload?.address === data?.address
        ) {
            Swal.fire("Oops!", "Bạn chưa thay đổi trường nào cả!", "info");
        } else {
            let invalid = validate(payload, setInvalids);
            console.log(invalids);

            if (invalid === 0) {
                dispatch(show(true));

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
    return (
        <div
            onClick={e => {
                e.stopPropagation();
            }}
            className="flex justify-center items-center">
            <div className="flex flex-col gap-6 bg-white xl:w-[60%] xl:p-12 w-[90%] p-8">
                <h2 className="text-2xl font-bold">Chỉnh sửa tài khoản</h2>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                        First Name
                    </label>
                    <InputField
                        setInvalids={setInvalids}
                        invalids={invalids}
                        value={payload?.name}
                        setValue={setPayload}
                        type="name"
                        namekey={"name"}
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
                        value={payload?.phone}
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
                    {isShow ? (
                        <div className="py-2 w-full flex justify-center items-center bg-red-600 text-white rounded-sm hover:bg-red-700">
                            <div
                                className="  h-8 w-8 text-white animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handle}
                            className="py-2 w-full bg-red-600 text-white rounded-sm hover:bg-red-700">
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditUser;
