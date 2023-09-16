import axios from "../axios";

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
