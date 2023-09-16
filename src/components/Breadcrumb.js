import { memo } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Icons } from "../ultils/icons";
import { Blogs } from "../pages/public";
const { AiOutlineRight } = Icons;
function Breadcrumb({ title, category, type }) {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: " Home" },
        {
            path: "/:category/:pid/:title",
            breadcrumb: title,
        },
    ];
    const routes1 = [
        // { path: "/:blogs", breadcrumb: category },
        { path: "/:blogs/:category", breadcrumb: category },

        { path: "/", breadcrumb: " Home" },
        {
            path: "/:blogs/:bid/:title",
            breadcrumb: title,
        },
    ];
    const breadcrumbs = useBreadcrumbs(type === "blog" ? routes1 : routes);
    console.log(breadcrumbs);
    return (
        <div className="flex items-center gap-2">
            {breadcrumbs
                .filter(el => !el.match.route === false)
                .map(({ match, breadcrumb }, index, self) => (
                    <Link
                        key={match.pathname}
                        to={match.pathname}
                        className="flex gap-1 items-center">
                        <span className="text-sm">{breadcrumb}</span>
                        {index !== self.length - 1 && (
                            <span className="ml-1">
                                <AiOutlineRight size={"10px"} />
                            </span>
                        )}
                    </Link>
                ))}
        </div>
    );
}

export default memo(Breadcrumb);
