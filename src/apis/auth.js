import axios from "../axios";
export const apiRegister = payload =>
    axios({
        url: "/user/register",
        method: "post",
        data: payload,
    });
export const apiFinalRegister = token =>
    axios({
        url: "/user/finalregister/" + token,
        method: "put",
    });
export const apiLogin = payload =>
    axios({
        url: "/user/login",
        method: "post",
        data: payload,
        withCredentials: true,
    });
export const apiResetPassword = payload =>
    axios({
        url: "/user/forgotpassword",
        method: "post",
        data: payload,
    });
export const apiChangePassword = payload =>
    axios({
        url: "/user/resetpassword",
        method: "put",
        data: payload,
    });
export const apiCurrent = () =>
    axios({
        url: "/user/current",
        method: "get",
    });
export const apiGetUsers = params =>
    axios({
        url: "/user/",
        method: "get",
        params,
    });
export const apiRefreshtoken = () =>
    axios({
        url: "/user/refreshtoken",
        method: "post",
    });
export const apiUpdateUser = data =>
    axios({
        url: "/user/current",
        method: "put",
        data,
    });
export const apiDeleteUser = id =>
    axios({
        url: "/user/" + id,
        method: "delete",
    });
export const apiUpdateUserByAdmin = (data, uid) =>
    axios({
        url: "/user/" + uid,
        method: "put",
        data,
    });
