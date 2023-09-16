import { memo, useEffect, useState } from "react";
import { Icons } from "../ultils/icons";
import { colors } from "../ultils/contans";
import {
    createSearchParams,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { apiGetProdcuts } from "../apis";
import { format } from "../ultils/format";
import useDebounce from "../hooks/useDebounce";
const { AiOutlineDown } = Icons;
function SearchItem({ label, type = "checkbox", handleActive, active }) {
    const { category } = useParams();
    const [params] = useSearchParams();

    const [checked, setChecked] = useState([]);
    const [price, setPrice] = useState({
        from: "",
        to: "",
    });
    const navigate = useNavigate();
    const [maxPrice, setMaxPrice] = useState(null);

    const fetchPrice = async () => {
        const rs = await apiGetProdcuts({ sort: "-price", limit: 1 });
        if (rs.success) setMaxPrice(format(rs.products[0].price));
    };
    const handle = e => {
        setChecked(pre => {
            const ischecked = checked.find(el => el === e.target.value);
            if (ischecked) {
                return checked.filter(item => item !== e.target.value);
            } else {
                return [...pre, e.target.value];
            }
        });
    };
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (checked.length > 0) {
            queries.color = checked.join(",");
            queries.page = 1;
        } else {
            delete queries.color;

            delete queries.page;
        }
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
    }, [checked]);
    useEffect(() => {
        if (type === "input") {
            fetchPrice();
        }
    }, [type]);

    const debounceFrom = useDebounce(price?.from, 500);
    const debounceTo = useDebounce(price?.to, 500);
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (Number(price?.from) > 0) {
            queries.from = price?.from;
        } else {
            delete queries.from;
        }

        if (Number(price?.to) > 0) {
            queries.to = price?.to;
        } else {
            delete queries.to;
        }

        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
    }, [debounceFrom, debounceTo]);
    return (
        <div className="relative">
            <div
                onClick={() => handleActive(label)}
                className="flex items-center gap-1 p-2 border border-gray-700 cursor-pointer ">
                <span>
                    {checked.length === 0
                        ? label
                        : `${label} (${checked.length})`}
                </span>
                <AiOutlineDown size={"12px"} />
            </div>

            {label === active && (
                <div className="absolute top-[105%] left-0 bg-white  shadow-md z-10 p-2 ">
                    {type === "checkbox" && label === "color" && (
                        <div className=" text-sm">
                            <div className="flex justify-between gap-8 py-2 border-b border-gray-500">
                                <h2 className="flex items-center gap-1">
                                    <h2>{`${checked.length}`}</h2>
                                    <span>selected</span>
                                </h2>
                                <h2
                                    className=" cursor-pointer text-blue-600 hover:text-red-700"
                                    onClick={() => setChecked([])}>
                                    Reset
                                </h2>
                            </div>
                            {colors &&
                                colors.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 py-1">
                                        <input
                                            checked={checked.some(
                                                el => el === item,
                                            )}
                                            value={item}
                                            type="checkbox"
                                            id={item}
                                            onChange={e => handle(e)}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                ))}
                            <button
                                className="px-2 py-1 w-full mt-2 rounded-sm bg-blue-600 text-white"
                                onClick={() => handleActive("")}>
                                OK
                            </button>
                        </div>
                    )}
                </div>
            )}
            {label === active && (
                <div className="">
                    {type === "input" && label === "price" && (
                        <div className="text-sm absolute top-[105%] left-0 bg-white p-2 border-2 shadow-md z-10 z-10">
                            <div className="flex justify-between gap-8 py-2 border-b border-gray-500">
                                <h2 className="flex items-center gap-1 text-sm">
                                    <h2>{`The highest price is ${maxPrice}`}</h2>
                                </h2>
                                <h2
                                    className=" cursor-pointer  text-blue-600 hover:text-red-700"
                                    onClick={() =>
                                        setPrice({
                                            from: "",
                                            to: "",
                                        })
                                    }>
                                    Reset
                                </h2>
                            </div>
                            <div className="flex justify-between my-3 ">
                                <div className="flex flex-col gap-1 w-[40%]">
                                    <label htmlFor="from">from</label>
                                    <input
                                        className="border border-gray-400 p-2"
                                        onChange={e =>
                                            setPrice(pre => ({
                                                ...pre,
                                                from: e.target.value,
                                            }))
                                        }
                                        value={price.from}
                                        type="number"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-[40%]">
                                    <label htmlFor="from">to</label>
                                    <input
                                        className="border border-gray-400 p-2"
                                        onChange={e =>
                                            setPrice(pre => ({
                                                ...pre,
                                                to: e.target.value,
                                            }))
                                        }
                                        value={price.to}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <button
                                className="px-2 py-1 w-full mt-2 rounded-sm bg-blue-600 text-white"
                                onClick={() => handleActive("")}>
                                OK
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(SearchItem);
