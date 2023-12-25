import { apiCreateCategory, apiCreateProduct } from "apis";
import { Tiny } from "components";
import InputField from "components/inputField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helpers";
import { Icons } from "ultils/icons";
import validate from "ultils/validate";
const { BsImage } = Icons;
function CreateProduct() {
    const { isShow } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const [invalids, setInvalids] = useState([]);
    const [image, setImage] = useState([]);
    const [payload, setPayload] = useState({
        title: "",
        brand: "",
        price: "",
        category: "",
        images: "",
        color: "",
        description: "",
    });

    const handle = async () => {
        let invalid = validate(payload, setInvalids);

        if (invalid === 0) {
            dispatch(show(true));
            const fromData = new FormData();
            for (let i of Object.entries(payload)) fromData.append(i[0], i[1]);
            if (payload.images) {
                for (let image of payload.images)
                    fromData.append("images", image);
            }
            const rs = await apiCreateProduct(fromData);

            if (rs.success) {
                dispatch(show(false));
                Swal.fire(
                    "Congratulations!",
                    "Tạo sản phẩm mới thành công..",
                    "success",
                ).then(() => {
                    setPayload({
                        title: "",
                        brand: "",
                        price: "",
                        category: "",
                        images: "",
                        color: "",
                        description: "",
                    });
                });
            }
        }
    };
    const ToBase64 = async files => {
        let image = [];
        for (let i of files) {
            if (i.type !== "image/png" && i.type !== "image/jpeg") {
                Swal.fire("Oops!", "File not supported!", "info");
            }
            const han = await getBase64(i);
            image = [...image, { name: i.name, path: han }];
        }

        setImage(pre => [...image]);
    };
    const handleOn = async e => {
        const files = e.target.files;

        setPayload(pre => ({ ...pre, images: [...pre.images, ...files] }));
    };
    // const handleDe = image => {
    //     setImage(pre => pre.filter(item => item !== image));
    //     setPayload(pre => ({
    //         ...pre,
    //         images: pre?.images?.filter(item => item !== image),
    //     }));
    // };
    useEffect(() => {
        ToBase64(payload?.images);
    }, [payload?.images]);
    // console.log(payload);
    // console.log(invalids);
    return (
        <div className=" lg:p-8 p-4">
            <h2 className="text-2xl font-bold my-4">CREATE NEW PRODUCT</h2>
            <div className="border p-3">
                <div className="flex items-center justify-between px-3 py-5 border-b border-gray-400">
                    <div className="w-[42%]">
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
                    <div className="w-[42%]">
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
                <div className="flex items-center justify-between px-3 py-5 border-b border-gray-400">
                    <div className="w-[42%]">
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
                    <div className="w-[42%]">
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
                <div className="px-3 py-5">
                    {/* <label htmlFor="" className=" font-medium leading-6">
                        Description
                    </label>
                    <textarea
                        value={payload?.description}
                        onChange={e =>
                            setPayload(pre => ({
                                ...pre,
                                description: e.target.value,
                            }))
                        }
                        className="w-full p-2 border border-gray-400 mt-1"
                        rows={10}></textarea> */}
                    <Tiny
                        value={payload?.description}
                        nameKey={"description"}
                        setValue={setPayload}
                        setInvalids={setInvalids}
                        invalids={invalids}
                        label={"Description"}
                    />
                </div>
                <div className="px-3 py-5 border-b">
                    <div className="w-[100%]">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Color
                        </label>
                        <InputField
                            bor
                            setInvalids={setInvalids}
                            invalids={invalids}
                            value={payload?.color}
                            setValue={setPayload}
                            type="color"
                            namekey={"color"}
                            width
                        />
                    </div>
                </div>
                <div
                    onFocus={e => {
                        e.stopPropagation();
                        setInvalids([]);
                    }}
                    className="w-full px-3 py-5 mt-3 ">
                    <label htmlFor="" className=" font-medium mb-2">
                        Images (chọn ảnh)
                    </label>
                    <div
                        onClick={() => setInvalids([])}
                        className="w-full h-[160px] border-2 border-black mt-1 flex justify-center items-center">
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
                    {invalids?.length > 0 &&
                        invalids.some(i => i.name === "image") && (
                            <small className="text-red-500 text-xs">
                                {
                                    invalids.find(i => i.name === "image")
                                        ?.messeger
                                }
                            </small>
                        )}
                </div>

                <div className="w-full ">
                    {image?.map(el => (
                        <div key={el} className="flex gap-2">
                            <img
                                src={el.path}
                                className="w-[30%] my-2"
                                alt=""
                            />
                            {/* <span
                                className=" cursor-pointer "
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDe(el);
                                }}>
                                Xóa
                            </span> */}
                        </div>
                    ))}
                </div>
            </div>
            {isShow ? (
                <div className="py-2 px-8 flex justify-center items-center rounded-md bg-red-600 text-white hover:bg-red-500">
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
                    className="py-2 px-8 rounded-md bg-red-600 text-white hover:bg-red-500 w-full"
                    onClick={handle}>
                    Create new Product
                </button>
            )}
        </div>
    );
}

export default CreateProduct;
