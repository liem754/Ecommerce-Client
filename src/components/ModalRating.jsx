import { memo, useState } from "react";
import logo from "../assets/images/logo.png";
import { voteOption } from "../ultils/contans";
import { Icons } from "../ultils/icons";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { fix } from "store/app/appSlice";
import { getBase64 } from "ultils/helpers";
const { AiFillStar, RiDeleteBin6Line } = Icons;
function ModalRating({ setRating, handle, show }) {
    const [choose, setChoose] = useState(null);
    const [preview, setPreview] = useState([]);
    const [image, setImage] = useState([]);

    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const handleRatings = () => {
        handle(comment, choose, image);
        setChoose(null);
        setComment("");
    };
    const handleOn = async e => {
        let files = e.target.files;

        for (let i of files) {
            const img = await getBase64(i);
            setPreview(pre => [...pre, { path: img, name: i.name }]);
        }
        setImage(pre => [...pre, ...files]);
    };
    const handleDelete = item => {
        setPreview(preview.filter(el => el.name !== item));
        setImage(image.filter(el => el.name !== item));
    };

    return (
        <div
            onClick={() => {
                setRating(false);
                dispatch(fix(false));
            }}
            className="z-50 animate-slide-bottom absolute flex justify-center to items-center top-0 bottom-0 left-0 right-0  bg-black bg-opacity-60 ">
            <div
                onClick={e => {
                    e.stopPropagation();
                    setRating(true);
                    dispatch(fix(true));
                }}
                className="bg-white flex flex-col items-center gap-2 py-4 lg:w-3/5 w-[95%] h-[600px] overflow-auto">
                <img src={logo} alt="" className="w-[30%]" />
                <h2 className="text-lg font-medium my-3">Product reviews</h2>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="border border-gray-400 p-2 w-[80%]"
                    name=""
                    id=""
                    rows="7"></textarea>

                <div className="my-3">
                    <label
                        htmlFor="img"
                        className="cursor-pointer font-medium p-2 border hover:bg-black hover:text-white rounded-md">
                        Images
                    </label>
                    <input
                        type="file"
                        name="img"
                        id="img"
                        multiple
                        hidden
                        onChange={handleOn}
                    />
                    <div className="flex flex-wrap gap-3">
                        {preview?.map(item => (
                            <div key={item.name} className="flex">
                                <img
                                    className="w-[100px] "
                                    src={item.path}
                                    alt=""
                                />
                                <span onClick={() => handleDelete(item?.name)}>
                                    <RiDeleteBin6Line />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <h2>How do you like product ?</h2>
                <div className="flex items-center justify-center gap-6 w-full">
                    {voteOption?.map(item => (
                        <div
                            onClick={() => {
                                if (choose === null) setChoose(item.id);
                                else setChoose(null);
                            }}
                            key={item.id}
                            className="flex flex-col text-center w-[9%] py-4 justify-center items-center gap-1 bg-gray-100 cursor-pointer">
                            {Number(choose) && choose >= item.id ? (
                                <AiFillStar color="orange" />
                            ) : (
                                <AiFillStar color="gray" />
                            )}
                            <span className="w-full">{item.title}</span>
                        </div>
                    ))}
                </div>
                <button
                    className="border rounded-md px-10 py-2"
                    onClick={e => {
                        e.stopPropagation();

                        setRating(false);
                        dispatch(fix(false));
                    }}>
                    Cancel
                </button>
                {show ? (
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
                    <Button
                        onClick={handleRatings}
                        title={"Submit"}
                        bgColor={"bg-red-600"}
                        textColor={"text-white"}
                        pd={"py-2 px-36"}
                        radius={"round-lg"}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(ModalRating);
