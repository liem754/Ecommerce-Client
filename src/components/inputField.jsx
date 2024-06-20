import { memo } from "react";

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
    return (
        <div
            onFocus={e => {
                e.stopPropagation();
                setInvalids([]);
            }}
            className="mt-1">
            <input
                placeholder={hoder}
                value={value}
                onChange={e =>
                    setValue(pre => ({
                        ...pre,
                        [namekey]: e.target.value,
                    }))
                }
                type={type === "color" ? "text" : type}
                className={`block ${bor && "border border-gray-400"}
                     w-full
                 rounded-md pl-2 py-3 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6`}
            />
            {invalids?.length > 0 && invalids.some(i => i.name === type) && (
                <small className="text-red-500 text-xs">
                    {invalids.find(i => i.name === type)?.messeger}
                </small>
            )}
        </div>
    );
}

export default memo(InputField);
