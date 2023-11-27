import { path } from "./paths";
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
        path: `/${path.BLOG}/Share-Experiences`,
    },

    {
        id: 4,
        value: "CONTACT US",
        path: `/${path.CONTACT}`,
    },
];

export const Banners = [
    {
        id: 1,
        img: "https://cdn1.vectorstock.com/i/1000x1000/52/75/online-shopping-black-banner-or-promotion-vector-35015275.jpg",
    },
    {
        id: 2,
        img: "https://www.eiosys.com/wp-content/uploads/2021/12/without-text-Top-Online-Electronics-Shopping-Websites-in-India.png",
    },
    {
        id: 3,
        img: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/07/electronic-devices.jpg",
    },
    {
        id: 4,
        img: "https://img.freepik.com/premium-psd/tablet-pro-mockup-table_173626-207.jpg?w=2000",
    },
    {
        id: 5,
        img: "https://www.davidrambo.org/hp-omen-critique/OMEN-new-banner-1.png",
    },
    {
        id: 6,
        img: "https://f.hubspotusercontent30.net/hubfs/5624788/Electronic%20Online%20Header-01.jpg",
    },
    {
        id: 7,
        img: "https://global.hisense.com/dam/jcr:a0622ec8-3501-4c44-92dc-afafb9398077/product-overview-hisense-smartphone-kv.jpg",
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
