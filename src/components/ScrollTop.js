import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
    const param = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [param]);
};
export default ScrollTop;
