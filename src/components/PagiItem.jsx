import { memo, useState } from "react";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
function PagiItem({ item }) {
    const navigate = useNavigate();
    const { category } = useParams();
    const [params] = useSearchParams();
    const [focus, setFocus] = useState("");
    const location = useLocation();
    const handlePagination = () => {
        const queries = Object.fromEntries([...params]);
        if (Number(item)) queries.page = item;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        });
    };
    return (
        <button
            onClick={() => handlePagination(item)}
            className={`py-2 px-4 bg-gray-100 rounded-sm hover:bg-gray-300 border border-black ${
                +params.get("page") === +item && "bg-red-400 border-black"
            } ${
                !+params.get("page") &&
                +item === 1 &&
                "bg-red-400 border-black px-[18px]"
            }`}>
            {item}
        </button>
    );
}

export default memo(PagiItem);
