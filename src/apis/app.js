import axios from "../axios";
export const apiGetCategory = () =>
    axios({
        url: "/productcategory/",
        method: "get",
    });
export const apiGetCategoryBlog = () =>
    axios({
        url: "/blogcategory/",
        method: "get",
    });
