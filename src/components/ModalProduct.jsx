import { memo, useEffect, useState } from "react";
import InputField from "./inputField";
import validate from "ultils/validate";
import {
    apiGetProdcut,
    apiUpdateBlog,
    apiUpdateProduct,
    apiUpdateUser,
} from "apis";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { update } from "store/user/userSlice";
import { Icons } from "ultils/icons";
import { getBase64 } from "ultils/helpers";
import { fix } from "store/app/appSlice";
import Tiny from "./Tiny";
const { BsImage, RiDeleteBin6Line } = Icons;

function ModalProduct({ setEdit, data, type, setUpd }) {
    const [invalids, setInvalids] = useState([]);
    const [image, setImage] = useState([]);
    const [isShow, setIsShow] = useState(false);

    const dispatch = useDispatch();
    const [payload, setPayload] = useState(
        type === "blog"
            ? {
                  title: data?.title || "",
                  category: data?.category || "",
                  description: data?.description || "",
                  images: data?.images || [],
              }
            : {
                  title: data?.title || "",
                  brand: data?.brand || "",
                  price: data?.price || "",
                  category: data?.category || "",
                  color: data?.color || " chưa có color",
                  images: data?.images || [],
              },
    );

    const fetch = async (id, data) => {
        setIsShow(true);
        const fromData = new FormData();

        for (let i of Object.entries(payload)) fromData.append(i[0], i[1]);
        if (payload.images) {
            for (let image of payload.images) {
                fromData.append("images", image);
            }
        }
        if (type === "product") {
            const rs = await apiUpdateProduct(id, fromData);
            if (rs.success) {
                Swal.fire(
                    "Oops!",
                    "Update product thành công!",
                    "success",
                ).then(() => {
                    setEdit({});
                    dispatch(fix(false));
                    setIsShow(false);
                });
            }
        } else {
            const rs = await apiUpdateBlog(id, fromData);
            if (rs.success) {
                Swal.fire("Oops!", "Update blog thành công!", "success").then(
                    () => {
                        setEdit({});
                        dispatch(fix(false));
                        setIsShow(false);
                    },
                );
            }
        }
    };
    const handle = () => {
        let invalid = validate(payload, setInvalids);
        if (
            payload.title === data?.title &&
            payload.brand === data?.brand &&
            payload?.price === data?.price &&
            payload.category === data?.category &&
            payload.color === data?.color &&
            payload.images === data?.images
        ) {
            Swal.fire("Oops!", "Bạn chưa thay đổi trường nào cả!", "info");
        } else {
            dispatch(fix(true));
            if (invalid === 0) {
                fetch(data?._id, payload);
            }
        }
    };
    const handleOn = async e => {
        const files = e.target.files;
        for (let i of files) {
            if (i.type === "image/png" || i.type === "image/jpeg") {
                const han = await getBase64(i);
                setImage(pre => [...pre, han]);
            }
        }

        setPayload(pre => ({ ...pre, images: [...pre.images, ...files] }));
    };

    const handleDe = el => {
        setImage(image?.filter(i => i !== el));
        setPayload(pre => ({
            ...pre,
            images: pre?.images?.filter(item => item !== el),
        }));
        if (image.length === 1) {
            setPayload(pre => ({
                ...pre,
                images: pre.images.slice(0, pre.images.length - 1),
            }));
        } else if (image.length === 2) {
            setPayload(pre => ({
                ...pre,
                images: pre.images.slice(0, pre.images.length - 2),
            }));
        } else if (image.length === 3) {
            setPayload(pre => ({
                ...pre,
                images: pre.images.slice(0, pre.images.length - 3),
            }));
        }
    };
    return (
        <div
            onClick={e => {
                e.stopPropagation();
                setEdit({});
            }}
            className=" animate-slide-bottom absolute top-0 left-0 right-0 -bottom-32 bg-black bg-opacity-40 flex justify-center items-center">
            {type === "blog" ? (
                <div
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    className="flex flex-col gap-6 bg-white w-[50%] p-5">
                    <h2 className="text-xl font-semibold text-center">
                        CHỈNH SỬA BLOG
                    </h2>
                    <div className="flex justify-between">
                        <div className="w-[47%]">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Title
                            </label>
                            <InputField
                                bor
                                setInvalids={setInvalids}
                                invalids={invalids}
                                value={payload?.title}
                                setValue={setPayload}
                                type="title"
                                namekey={"title"}
                                width
                            />
                        </div>

                        <div className="w-[47%]">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Category
                            </label>
                            <InputField
                                bor
                                setInvalids={setInvalids}
                                invalids={invalids}
                                value={payload?.category}
                                setValue={setPayload}
                                type="category"
                                namekey={"category"}
                                width
                            />
                        </div>
                    </div>
                    <div className="">
                        <Tiny
                            fix={true}
                            value={payload?.description}
                            nameKey={"description"}
                            setValue={setPayload}
                            setInvalids={setInvalids}
                            invalids={invalids}
                            label={"Description"}
                        />
                    </div>
                    <div className="">
                        <h2 className="text-sm font-semibold">Images</h2>
                        <div
                            onClick={() => setInvalids([])}
                            className="w-full h-[50px] border-2 border-black mt-1 flex justify-center items-center">
                            <label htmlFor="image" className=" cursor-pointer">
                                <BsImage size={"20px"} />
                            </label>
                        </div>
                        <input
                            onFocus={() => setInvalids([])}
                            id="image"
                            type="file"
                            multiple
                            hidden
                            onChange={handleOn}
                        />
                        <div className="flex gap-2 mt-2 w-full flex-wrap ">
                            {payload?.images
                                .filter(el => typeof el === "string")
                                .map(el => (
                                    <div className="flex w-[20%]">
                                        <img
                                            src={el}
                                            className="w-[75%] h-[100px] border border-black"
                                            alt=""
                                        />
                                        <span
                                            className=" cursor-pointer text-xs p-2 bg-gray-100 hover:bg-gray-300 h-[30px]"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDe(el);
                                            }}>
                                            <RiDeleteBin6Line />
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <div className="flex flex-wrap mt-1">
                            {image.length > 0 &&
                                image.map(el => (
                                    <div className="flex w-[20%]">
                                        <img
                                            src={el}
                                            className="w-[75%] h-[100px] border border-black"
                                            alt=""
                                        />
                                        <span
                                            className=" cursor-pointer "
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDe(el);
                                            }}>
                                            <RiDeleteBin6Line />
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                setEdit({});
                            }}
                            className="bg-black py-2 px-6 rounded-sm text-white hover:bg-gray-700">
                            Cancel
                        </button>
                        {isShow ? (
                            <div className="py-2 px-6 bg-red-600 text-white rounded-sm hover:bg-red-700">
                                <div
                                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status">
                                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handle}
                                className="py-2 px-6 bg-red-600 text-white rounded-sm hover:bg-red-700">
                                Update
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    className="flex flex-col gap-6 bg-white w-[50%] p-5">
                    <h2 className="text-xl font-semibold text-center">
                        CHỈNH SỬA SẢN PHẨM
                    </h2>
                    <div className="flex gap-1 w-full justify-between">
                        <div className="w-[47%]">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Title
                            </label>
                            <InputField
                                bor
                                setInvalids={setInvalids}
                                invalids={invalids}
                                value={payload?.title}
                                setValue={setPayload}
                                type="title"
                                namekey={"title"}
                                width
                            />
                        </div>
                        <div className="w-[47%]">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Brand
                            </label>
                            <InputField
                                bor
                                setInvalids={setInvalids}
                                invalids={invalids}
                                value={payload?.brand}
                                setValue={setPayload}
                                type="brand"
                                namekey={"brand"}
                                width
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-[47%]">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Price
                            </label>
                            <InputField
                                bor
                                setInvalids={setInvalids}
                                invalids={invalids}
                                value={payload?.price}
                                setValue={setPayload}
                                type="price"
                                namekey={"price"}
                                width
                            />
                        </div>

                        <div className="w-[47%]">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">
                                Category
                            </label>
                            <InputField
                                bor
                                setInvalids={setInvalids}
                                invalids={invalids}
                                value={payload?.category}
                                setValue={setPayload}
                                type="category"
                                namekey={"category"}
                                width
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Color
                        </label>
                        <InputField
                            bor
                            setInvalids={setInvalids}
                            invalids={invalids}
                            value={payload?.color}
                            setValue={setPayload}
                            type="text"
                            namekey={"color"}
                            width
                        />
                    </div>
                    <div className="">
                        <h2 className="text-sm font-semibold">Images</h2>
                        <div
                            onClick={() => setInvalids([])}
                            className="w-full h-[100px] border-2 border-black mt-1 flex justify-center items-center">
                            <label htmlFor="image" className=" cursor-pointer">
                                <BsImage size={"40px"} />
                            </label>
                        </div>
                        <input
                            onFocus={() => setInvalids([])}
                            id="image"
                            type="file"
                            multiple
                            hidden
                            onChange={handleOn}
                        />
                        <div className="flex gap-2 mt-2 w-full ">
                            {payload?.images
                                .filter(el => typeof el === "string")
                                .map(el => (
                                    <div className="flex w-[20%]">
                                        <img
                                            src={el}
                                            className="w-[75%] h-[100px] border border-black"
                                            alt=""
                                        />
                                        <span
                                            className=" cursor-pointer text-xs p-2 bg-gray-100 hover:bg-gray-300 h-[30px]"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDe(el);
                                            }}>
                                            Xóa
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <div className="flex flex-wrap mt-1">
                            {image.length > 0 &&
                                image.map(el => (
                                    <div className="flex w-[20%]">
                                        <img
                                            src={el}
                                            className="w-[75%] h-[100px] border border-black"
                                            alt=""
                                        />
                                        <span
                                            className=" cursor-pointer "
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDe(el);
                                            }}>
                                            Xóa
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-between">
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
            )}
        </div>
    );
}

export default memo(ModalProduct);
