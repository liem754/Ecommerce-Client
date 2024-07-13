import { apiGetProdcut, apiRemoveCart } from "apis";
import { useState } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IdCurrent } from "store/user/userSlice";
import Swal from "sweetalert2";
import { format } from "ultils/format";
import * as api from "../../apis";
import { Link, useNavigate } from "react-router-dom";
import { path } from "ultils/paths";
import { setCart } from "store/user/userSlice";
function Cart() {
    const { data } = useSelector(state => state.user);
    const [carts, setCarts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        data?.cart.map(async el => {
            const rs = await apiGetProdcut(el?.product);
            if (rs.success) {
                setCarts(pre => [
                    ...pre,
                    {
                        ...rs.productData,
                        new: el.color,
                        newprice: el.price,
                        newqua: el.quantity,
                        newsize: el.size,
                    },
                ]);
            }
        });
    }, []);
    const handle = async (e, pid, it) => {
        const rs = await apiRemoveCart(pid, it?.new);
        if (rs.success) {
            Swal.fire("Congratulation", rs.mes, "success");
            const rss = await api.apiCurrent();
            if (rss.success) {
                const newCart = carts.filter((item, index) => item !== it);
                setCarts([...new Set(newCart)]);

                dispatch(
                    IdCurrent({
                        idCurrent: rss.rs._id,
                        data: rss.rs,
                    }),
                );
                dispatch(setCart({ cart: carts }));
            }
        }
    };
    return (
        <div className="flex flex-col items-center  w-full mt-6">
            <div className="flex justify-center items-center w-[98%] py-2">
                <h3 className="text-2xl font-serif font-bold text-center ">
                    MY CART
                </h3>
            </div>
            <div className="w-[98%] my-10 flex flex-col gap-3">
                <div className=" flex bg-blue-600 text-white p-3">
                    <h2 className="w-[47%]">Product</h2>
                    <h2 className="w-[35%]">Quantity</h2>
                    <h2 className="w-[14%]">Price</h2>
                </div>
                {carts.map((el, index) => (
                    <div
                        key={index}
                        className="flex w-full rounded-sm shadow-md border">
                        <div
                            onClick={() => {
                                navigate(
                                    `/${el.category.toLowerCase()}/${el._id}/${
                                        el.slug
                                    }`,
                                );
                            }}
                            className=" w-[50%] flex px-2 gap-4 ">
                            <img
                                src={el?.images[0]}
                                alt=""
                                className="w-[30%] hidden sm:block"
                            />
                            <div className=" mt-1 flex flex-col gap-2 font-medium lg:text-md sm:text-xs text-[10px]">
                                <h2>{el?.title}</h2>
                                <h3>{`Color : ${el?.new}`}</h3>
                                <h3>{`Size : ${el?.newsize}`}</h3>
                            </div>
                        </div>
                        <div className="lg:w-[26%] w-[20%] flex justify-normal items-center">
                            <h3>{el.newqua}</h3>
                        </div>
                        <div className="w-[26%] lg:w-[20] flex justify-between items-center">
                            <h3 className="lg:text-md sm:text-xs text-[9px]">
                                {format(el.newprice)}
                            </h3>
                            <span
                                onClick={e => handle(e, el._id, el)}
                                className="text-xs sm:text-md lg:p-2 xl:mr-6 p-1 bg-red-600 hover:bg-red-500 text-white rounded-md cursor-pointer">
                                Delete
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center w-full my-5">
                <div className=" flex flex-col gap-2 items-end w-[98%] ">
                    <div className=" flex justify-center items-center gap-1">
                        <h2>{`Total : `}</h2>
                        <h2 className=" text-red-600">
                            {carts.length > 0
                                ? format(
                                      carts.reduce(
                                          (sum, el) => +el.newprice + sum,
                                          0,
                                      ),
                                  )
                                : 0}
                        </h2>
                    </div>
                    {data.cart.length === 0 ? (
                        <>
                            <h2>No products yet, please place an order !! </h2>
                            <Link
                                to={"/"}
                                className=" bg-blue-600 text-white px-4 py-1 rounded-md">
                                Go
                            </Link>
                        </>
                    ) : (
                        <div
                            className=""
                            onClick={() => {
                                dispatch(setCart({ cart: carts }));
                                if (!data.address) {
                                    Swal.fire(
                                        "Notification !",
                                        "Please add address before ordering !",
                                        "info",
                                    ).then(() => {
                                        navigate(
                                            `/${
                                                +data?.role === 2002
                                                    ? `${path.ADMIN}/${path.DASHBOARD}`
                                                    : `${path.MENBER_LAYOUT}/${path.EDIT_USER}`
                                            }`,
                                        );
                                    });
                                } else {
                                    navigate("/checkout");
                                }
                            }}>
                            <button className=" hover:bg-red-500 cursor-pointer rounded-md p-2 w-[100%] text-center text-white bg-red-600">
                                Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(Cart);
