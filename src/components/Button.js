import { memo } from "react";

function Button({
    title,
    textColor,
    bgColor,
    width,
    pd,
    size,
    radius,
    IcBefore,
    mb,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={` ${textColor} ${bgColor} ${width} ${radius} ${pd} rounded-sm flex gap-2 items-center justify-center`}>
            {IcBefore && <IcBefore className={`${mb}`} />}
            <span className={`${size}`}>{title}</span>
        </button>
    );
}

export default memo(Button);
