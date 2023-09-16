import { useEffect, useRef } from "react";
import { Icons } from "../ultils/icons";

const { AiFillStar } = Icons;
function Votebar({ number, ratingCount, ratingTotle }) {
    const reff = useRef();
    useEffect(() => {
        reff.current.style.cssText = `right: ${
            100 - Math.round((ratingCount * 100) / ratingTotle)
        }%`;
    }, [ratingCount, ratingTotle]);
    return (
        <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex w-[6%] items-center justify-center gap-1 text-sm">
                <span>{number}</span>
                <AiFillStar
                    className={`${number === 1 ? "ml-[2px]" : ""}`}
                    color="orange"
                />
            </div>
            <div className="w-[72%]">
                <div className="bg-gray-300 relative w-full h-[6px] rounded-sm">
                    <div
                        ref={reff}
                        className=" absolute inset-0 bg-red-600 rounded-sm"></div>
                </div>
            </div>
            <div className="w-[22%] text-xs lg:text-sm">{`${
                ratingCount ? ratingCount : 0
            } reviewers`}</div>
        </div>
    );
}

export default Votebar;
