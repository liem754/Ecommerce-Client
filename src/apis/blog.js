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

export const apiUpdateBlog = (pid, data) =>
    axios({
        url: "/blog/updateblog/" + pid,
        method: "put",
        data,
    });
export const apiLikeBlog = pid =>
    axios({
        url: "/blog/like/" + pid,
        method: "put",
    });
export const apiDisLikeBlog = pid =>
    axios({
        url: "/blog/dislike/" + pid,
        method: "put",
    });
