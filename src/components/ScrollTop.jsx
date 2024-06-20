import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
    const param = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [param]);
};
export default ScrollTop;
