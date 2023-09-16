import { memo, useState } from "react";
import logo from "../assets/images/logo3.png";
import { voteOption } from "../ultils/contans";
import { Icons } from "../ultils/icons";
import Button from "./Button";
const { AiFillStar } = Icons;
function ModalRating({ setRating, handle, value }) {
    const [choose, setChoose] = useState(null);
    const [comment, setComment] = useState("");
    const handleRatings = () => {
        handle(comment, choose);
        setChoose(null);
        setComment("");
    };
    return (
        <div
            onClick={() => {
                setRating(false);
            }}
            className="z-50 animate-slide-bottom absolute flex justify-center to items-center -top-96 to -left-36 -bottom-96 top -right-36 bg-black bg-opacity-60">
            <div
                onClick={e => {
                    e.stopPropagation();
                    setRating(true);
                }}
                className="bg-white flex flex-col items-center gap-2 py-4 w-3/5">
                <img src={logo} alt="" className="w-[30%]" />
                <h2 className="text-lg font-medium my-3">Đánh giá sản phẩm</h2>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="border border-gray-400 p-2 w-[80%]"
                    name=""
                    id=""
                    rows="7"></textarea>

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
                <Button
                    onClick={handleRatings}
                    title={"Submit"}
                    bgColor={"bg-red-600"}
                    textColor={"text-white"}
                    pd={"py-2 px-36"}
                    radius={"round-lg"}
                />
            </div>
        </div>
    );
}

export default memo(ModalRating);
