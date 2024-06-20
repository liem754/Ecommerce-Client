import { memo } from "react";
import usePagination from "../hooks/usePagination";
import PagiItem from "./PagiItem";
import { useSearchParams } from "react-router-dom";

function Pagination({ totalCount }) {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, +params.get("page") || 1);
    const range = () => {
        const curentPage = +params.get("page");
        const start = (curentPage - 1) * 10 + 1;
        const end = Math.min(curentPage * 10, totalCount);
        return `Shows product ${start} to ${end} of ${totalCount}`;
    };

    return (
        <div className="flex justify-between items-center">
            {!+params.get("page") ? (
                <span className="text-md italic">
                    {`Shows product 1 to ${
                        totalCount < 10 ? totalCount : 10
                    } of ${totalCount}`}
                </span>
            ) : (
                <span className="text-md italic">{range()}</span>
            )}
            <div className="w-[30%] flex items-center justify-end gap-2 text-center">
                {pagination?.map(el => (
                    <PagiItem item={el} />
                ))}
            </div>
        </div>
    );
}

export default memo(Pagination);
