import axios from "../axios";
export const apiGetProdcuts = params =>
    axios({
        url: "/product/",
        method: "get",
        params,
    });
export const apiGetProdcut = pid =>
    axios({
        url: "/product/" + pid,
        method: "get",
    });
export const apiRatings = data =>
    axios({
        url: "/product/rating",
        method: "put",
        data,
    });

export const apiCreateProduct = data =>
    axios({
        url: "/product/",
        method: "post",
        data,
    });

export const apiDeleteProduct = pid =>
    axios({
        url: "/product/deleteproduct/" + pid,
        method: "delete",
    });
export const apiUpdateProduct = (pid, data) =>
    axios({
        url: "/product/updateproduct/" + pid,
        method: "put",
        data,
    });
export const apiCreateOrder = data =>
    axios({
        url: "/order/",
        method: "post",
        data,
    });

export const apiGetOrders = params =>
    axios({
        url: "/order/",
        method: "get",
        params,
    });
export const apiupdateOrders = data =>
    axios({
        url: "/order/",
        method: "put",
        data,
    });
export const apiGetOrdersbyAdmin = params =>
    axios({
        url: "/order/all",
        method: "get",
        params,
    });
