import { memo } from "react";

function SelectInput({ value, ChangeValue, options }) {
    return (
        <select
            className="px-2 py-1 border border-gray-500 w-full"
            value={value}
            onChange={e => ChangeValue(e.target.value)}>
            <option value="choose">choose</option>
            {options.map(item => (
                <option value={item.value}>{item.text}</option>
            ))}
        </select>
    );
}

export default memo(SelectInput);
