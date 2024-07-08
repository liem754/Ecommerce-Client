import { memo } from "react";

function ColorItem({ setCo, el, co }) {
    return (
        <div
            onClick={() => setCo(el)}
            className={` cursor-pointer p-2 text-sm w-[50px] h-[50px] flex justify-center items-center rounded-[50%] shadow-lg ${
                el === "White" && "bg-whilecss border-black "
            } ${el === "Black" && "bg-blackcss text-white"} ${
                el === "Blue" && "bg-bluecss text-white "
            }
            ${el === "Green" && "bg-greencss text-white "}
             ${el === "Red" && "bg-redcss text-white "}
                ${el === "Yellow" && `bg-yellowcss`} ${
                co === el ? "border-2 border-green-500 scale-125" : ""
            }`}>
            {el}
        </div>
    );
}

export default memo(ColorItem);
