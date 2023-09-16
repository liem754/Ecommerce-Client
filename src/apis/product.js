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
