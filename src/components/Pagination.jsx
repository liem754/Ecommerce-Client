import { memo } from "react";
import { PagiItem } from "components";
import { useSearchParams } from "react-router-dom";
import usePagination from "hooks/usePagination";

function Pagination({ totalCount, pageSize, type }) {
    const [params] = useSearchParams();
    const pagination = usePagination(
        totalCount,
        +params.get("page") || 1,
        1,
        pageSize,
    );
    const range = () => {
        const curentPage = +params.get("page");
        const start = (curentPage - 1) * pageSize + 1;
        const end = Math.min(curentPage * pageSize, totalCount);
        return `Shows ${type} ${start} to ${end} of ${totalCount}`;
    };

    return (
        <div className="flex justify-between items-center">
            {!+params.get("page") ? (
                <span className="text-md italic">
                    {`Shows ${type} 1 to ${
                        totalCount < pageSize ? totalCount : pageSize
                    } of ${totalCount}`}
                </span>
            ) : (
                <span className="text-md italic">{range()}</span>
            )}
            <div className="w-[30%] flex items-center justify-end gap-2 text-center">
                {pagination?.map(el => (
                    <PagiItem key={el} item={el} />
                ))}
            </div>
        </div>
    );
}

export default memo(Pagination);
