import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { apiGetProdcuts } from "../../apis/product";
import Product from "../../components/product";
import {
    Breadcrumb,
    Pagination,
    SearchItem,
    SelectInput,
} from "../../components";

import { sorts } from "../../ultils/contans";
import { Icons } from "ultils/icons";
import useDebounce from "hooks/useDebounce";
const { AiOutlineSearch } = Icons;
function Collection() {
    const [sort, setSort] = useState("");
    const [product, setProduct] = useState([]);
    const [active, setActive] = useState(null);
    const param = useLocation();
    const [params] = useSearchParams();
    const [query, setQuery] = useState({
        q: "",
    });
    const navigate = useNavigate();

    const paramm = useDebounce(query.q, 800);
    const fetchnew = async params => {
        const rs = await apiGetProdcuts({ ...params });
        if (rs.success) setProduct(rs);
    };
    useEffect(() => {
        const pa = Object.fromEntries([...params]);
        if (paramm) pa.q = paramm;
        fetchnew(pa);
    }, [paramm]);
    useEffect(() => {
        if (query.q !== "") {
            navigate({
                pathname: param.pathname,
                search: createSearchParams("page=1").toString(),
            });
        }
    }, [query]);
    const detailFetch = async () => {
        if (param.pathname === "/all-product") {
            const rs = await apiGetProdcuts({});
            if (rs.success) setProduct(rs);
        } else {
            const rs = await apiGetProdcuts({
                category:
                    param.pathname.replace("/", "")?.charAt(0).toUpperCase() +
                    param.pathname.replace("/", "").slice(1),
            });
            if (rs.success) setProduct(rs);
        }
    };
    const fetchSort = async value => {
        if (param.pathname === "/all-product") {
            const rs = await apiGetProdcuts({
                sort: value,
            });
            if (rs.success) setProduct(rs);
        } else {
            const rs = await apiGetProdcuts({
                sort: value,
                category:
                    param.pathname.replace("/", "")?.charAt(0).toUpperCase() +
                    param.pathname.replace("/", "").slice(1),
            });
            if (rs.success) setProduct(rs);
        }
    };
    const fetch = async queries => {
        if (param.pathname === "/all-product") {
            const response = await apiGetProdcuts({
                ...queries,
            });
            if (response?.success) setProduct(response);
        } else {
            const response = await apiGetProdcuts({
                ...queries,
                category:
                    param.pathname.replace("/", "")?.charAt(0).toUpperCase() +
                    param.pathname.replace("/", "").slice(1),
            });
            if (response?.success) setProduct(response);
        }
    };
    useEffect(() => {
        if (param.search === "") {
            setProduct([]);
            detailFetch();
        } else {
            let param = [];
            for (let i of params.entries()) param.push(i);
            const queris = {};
            for (let i of params) queris[i[0]] = i[1];
            if (queris.from) {
                queris.price = { gte: queris.from };
            }
            if (queris.to) {
                queris.price = { lte: queris.to };
            }
            let priceQuery = {};
            if (queris.to && queris.from) {
                priceQuery = {
                    $and: [
                        { price: { gte: queris.from } },
                        { price: { lte: queris.to } },
                    ],
                };

                delete queris.price;
            }
            delete queris.to;
            delete queris.from;
            const q = { ...priceQuery, ...queris };
            fetch(q);
            window.scrollTo(0, 0);
        }
    }, [params]);
    const handleActive = useCallback(
        label => {
            if (label === active) {
                setActive(null);
            } else {
                setActive(label);
            }
        },
        [active],
    );
    useEffect(() => {
        if (sort) fetchSort(sort);
    }, [sort]);
    const ChangeValue = useCallback(
        value => {
            setSort(value);
        },
        [sort],
    );
    console.log(product.counts);

    return (
        <div className="w-full flex-col items-center flex">
            <div className="flex w-full justify-center py-5 bg-gray-200">
                <div className="w-4/5 flex flex-col gap-1">
                    <h2>
                        {param.pathname
                            .replace("/", "")
                            ?.charAt(0)
                            ?.toUpperCase() +
                            param.pathname.replace("/", "")?.slice(1)}
                    </h2>
                    <Breadcrumb category={param.category} />
                </div>
            </div>
            <div className="flex flex-col items-center w-4/5  ">
                <div className="flex items-center justify-between p-3 border-2 shadow-md mt-7 mb-1 w-full">
                    <div className="flex flex-col gap-2 w-[20%]">
                        <h2 className="font-medium">Filter by</h2>
                        <div className="flex gap-3">
                            <SearchItem
                                label={"color"}
                                handleActive={handleActive}
                                active={active}
                                type="checkbox"
                            />
                            <SearchItem
                                label={"price"}
                                handleActive={handleActive}
                                active={active}
                                type="input"
                            />
                        </div>
                    </div>
                    <div className="w-[50%]">
                        {param.pathname === "/all-product" && (
                            <div className="flex flex-col gap-1 w-full">
                                <h2 className="font-medium">Search</h2>
                                <div className="flex items-center border border-black px-2 gap-2 rounded-md w-[90%]">
                                    <AiOutlineSearch size={"20px"} />
                                    <input
                                        className=" rounded-sm p-2 border-none outline-none text-sm w-full"
                                        type="text"
                                        placeholder="Search title or category product"
                                        value={query.q}
                                        onChange={e =>
                                            setQuery(pre => ({
                                                ...pre,
                                                q: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-[16%]">
                        <h2 className="font-medium">Sort by</h2>
                        <div className="">
                            <SelectInput
                                value={sort}
                                options={sorts}
                                ChangeValue={ChangeValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-[30px] p-3 border shadow-md mb-6 mt-2">
                    {product &&
                        product?.products?.map(item => (
                            <div key={item.id} className="w-[23%]">
                                <Product
                                    grip
                                    title={item?.title}
                                    img={item?.images[2]}
                                    price={item?.price}
                                    cate={item?.category}
                                    id={item?._id}
                                    slug={item?.slug}
                                    star={item?.totalRatings}
                                />
                            </div>
                        ))}
                </div>
            </div>
            {param.pathname === "/all-product" &&
                product?.products?.length > 0 && (
                    <div className="w-4/5 mb-20">
                        <Pagination totalCount={product.counts} />
                    </div>
                )}
        </div>
    );
}

export default Collection;
