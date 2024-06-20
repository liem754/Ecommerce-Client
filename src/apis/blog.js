import axios from "configs/axios";

export const apiCreateBlog = data =>
    axios({
        url: "/blog/",
        method: "post",
        data,
    });
export const apiGetBlogs = params =>
    axios({
        url: "/blog/",
        method: "get",
        params,
    });
export const apiGetBlog = bid =>
    axios({
        url: "/blog/one/" + bid,
        method: "get",
    });
export const apiCreateCategory = data =>
    axios({
        url: "/blogcategory/",
        method: "post",
        data,
    });
export const apiDeleteBlog = bid =>
    axios({
        url: "/blog/" + bid,
        method: "delete",
    });

export const getCategory = () =>
    axios({
        url: "/blogcategory",
        method: "GET",
    });
