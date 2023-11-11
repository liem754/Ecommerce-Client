import { Icons } from "./icons";

const { AiFillStar, AiOutlineStar } = Icons;
export function format(n) {
    return n?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
export const formatStar = number => {
    const stars = [];
    number = Math.round(number);
    for (let i = 0; i < +number; i++)
        stars.push(<AiFillStar color="#f1b400" />);
    for (let i = 5; i > +number; i--)
        stars.push(<AiOutlineStar color="#f1b400" />);
    return stars;
};
