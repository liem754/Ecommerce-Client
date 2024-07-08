import axios from "configs/axios";

export const apiZaloPay = data =>
    axios({
        url: "/payment",
        method: "post",
        data,
    });
export const apiCheckZaloPay = data =>
    axios({
        url: "/payment/check",
        method: "post",
        data,
    });
