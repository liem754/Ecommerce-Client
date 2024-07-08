import { useMemo } from "react";
import { generateRange } from "ultils/helpers";

const usePagination = (paginationCount, currentPage, siplipCount = 1, page) => {
    const paginationArray = useMemo(() => {
        const paginationProductCount = Math.ceil(paginationCount / page);
        const totalPaginationItem = siplipCount + 5;
        if (paginationProductCount <= totalPaginationItem) {
            return generateRange(1, paginationProductCount);
        }
        const isShowLeft = currentPage - siplipCount > 2;
        const isShowRight =
            currentPage + siplipCount < paginationProductCount - 1;
        if (isShowLeft && !isShowRight) {
            const rightStart = paginationProductCount - 4;
            const rightRange = generateRange(
                rightStart,
                paginationProductCount,
            );
            return [1, "...", ...rightRange];
        }
        if (!isShowLeft && isShowRight) {
            const leftRange = generateRange(1, 5);
            return [...leftRange, "...", paginationProductCount];
        }
        const siblingLeft = Math.max(currentPage - siplipCount, 1);
        const siblingRight = Math.min(
            currentPage + siplipCount,
            paginationProductCount,
        );
        if (isShowLeft && isShowRight) {
            const middleRange = generateRange(siblingLeft, siblingRight);
            return [1, "...", ...middleRange, "...", paginationProductCount];
        }
    }, [paginationCount, currentPage, siplipCount]);

    return paginationArray;
};

export default usePagination;
