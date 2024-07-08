import { memo, useState } from "react";
import { Icons } from "ultils/icons";
const { BiHide, BiShow } = Icons;
function InputField({
    value,
    setValue,
    type,
    namekey,
    setInvalids,
    invalids,
    width,
    bor,
    hoder,
}) {
    const [show, setShow] = useState("password");
    return (
        <div
            onFocus={e => {
                e.stopPropagation();
                setInvalids([]);
            }}
            className="mt-1 relative">
            <input
                placeholder={hoder}
                value={value}
                onChange={e =>
                    setValue(pre => ({
                        ...pre,
                        [namekey]: e.target.value,
                    }))
                }
                type={
                    type === "color"
                        ? "text"
                        : type === "password"
                        ? show
                        : type
                }
                className={`block ${bor && "border border-gray-400"}
                     w-full
                 rounded-md pl-2 py-3 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6`}
            />
            {type === "password" && (
                <BiShow
                    className="absolute right-2 top-4 cursor-pointer "
                    onClick={() => setShow("text")}
                />
            )}
            {show === "text" && (
                <BiHide
                    className="absolute right-2 top-4 cursor-pointer "
                    onClick={() => setShow("password")}
                />
            )}
            {invalids?.length > 0 && invalids.some(i => i.name === type) && (
                <small className="text-red-500 text-xs">
                    {invalids.find(i => i.name === type)?.messeger}
                </small>
            )}
        </div>
    );
}

export default memo(InputField);
