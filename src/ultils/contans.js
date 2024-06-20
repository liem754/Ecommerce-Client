import { path } from "./paths";
import bn1 from "assets/images/banner1.jpg";
import bn2 from "assets/images/banner2.jpg";
import bn3 from "assets/images/bannerIn.png";
import cl1 from "assets/images/bn1.jpg";
import cl2 from "assets/images/bn2.jpg";
import cl3 from "assets/images/bn3.jpg";

export const Navigations = [
    {
        id: 1,
        value: "HOME",
        path: `/${path.HOME}`,
    },
    {
        id: 2,
        value: "COLLECTIONS",
        path: `/${path.DETAIL_COLLECTION}`,
    },
    {
        id: 3,
        value: "BLOGS",
        path: `/${path.BLOG}`,
    },

    {
        id: 4,
        value: "CONTACT US",
        path: `/${path.CONTACT}`,
    },
    {
        id: 5,
        value: "INTRODUCE",
        path: `/${path.INTRODUCE}`,
    },
];

export const collection = [
    {
        id: 1,
        img: cl1,
        title: "Men",
    },
    {
        id: 2,
        img: cl2,
        title: "Women",
    },
    {
        id: 3,
        img: cl3,
        title: "Kids",
    },
];
export const Banners = [
    {
        id: 1,
        img: bn1,
    },
    {
        id: 2,
        img: bn2,
    },
    {
        id: 3,
        img: bn3,
    },
];
export const colors = [
    "black",
    "white",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
];
export const sorts = [
    { id: 1, value: "-sold", text: "Best Seller" },
    { id: 2, value: "-title", text: "Alphabetically, A-Z" },
    { id: 3, value: "title", text: "Alphabetically, Z-A" },
    {
        id: 4,
        value: "-price",
        text: "Price, high to low",
    },
    {
        id: 5,
        value: "price",
        text: "Price, low to high",
    },
    { id: 6, value: "-createdAt", text: "Date, new to low" },
    { id: 7, value: "createdAt", text: "Date, low to new" },
];
export const voteOption = [
    {
        id: 1,
        title: "Terrible",
    },
    {
        id: 2,
        title: "Bad",
    },

    {
        id: 3,
        title: "Neutral",
    },

    {
        id: 4,
        title: "Good",
    },
    {
        id: 5,
        title: "Perfect",
    },
];
export const roles = [
    {
        code: 2000,
        value: "User",
    },
    {
        code: 2002,
        value: "Admin",
    },
];
