import { memo } from "react";

function Select({
    label,
    option = [],
    id,
    validate,
    style,
    register,
    errors,
    setIsBlock,
}) {
    return (
        <div styleName="flex flex-col gap-2">
            {label && <label htmlFor={id}>{label}</label>}
            <select
                onChange={e =>
                    setIsBlock(pre => ({ ...pre, [id]: e.target.value }))
                }
                id={id}>
                <option value="">choose</option>
                {option?.map(el => (
                    <option value={el.code}>{el.value}</option>
                ))}
            </select>
        </div>
    );
}

export default memo(Select);
