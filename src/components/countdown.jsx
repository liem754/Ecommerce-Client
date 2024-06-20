import { memo } from "react";

function CountDown({ unit, time }) {
    return (
        <div className="p-2 bg-gray-100 shadow-sm flex flex-col justify-center items-center w-[25%]">
            <span className="flex justify-center w-full">{unit}</span>
            <span className="text-[12px] w-full flex justify-center">
                {time}
            </span>
        </div>
    );
}

export default memo(CountDown);
