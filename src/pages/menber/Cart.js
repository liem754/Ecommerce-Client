import { apiGetProdcut, apiRemoveCart } from "apis";
import { Breadcrumb } from "components";
import { useState } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { set } from "react-hook-form";
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
                // const newcarts.filter(item=>item)
                setCarts(pre => [
                    ...pre,
                    {
                        ...rs.productData,
                        new: el.color,
                        newprice: el.price,
                        newqua: el.quantity,
                    },
                ]);
            }
        });
        // if (carts.length === 1) {
        // setSum(carts[0]?.newprice);
        // } else {
        // carts.map(el => {
        //     setSum(pre => pre + el.newprice);
        // });
        // }
    }, []);
    useEffect(() => {}, []);
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
            <div className="flex justify-start w-[90%]">
                <h3 className="text-2xl font-serif font-bold">MY CART</h3>
            </div>
            <div className="w-[90%] my-10 flex flex-col gap-3">
                <div className=" flex bg-blue-600 text-white p-3">
                    <h2 className="w-[47%]">Sảm phẩm</h2>
                    <h2 className="w-[35%]">Số lượng</h2>
                    <h2 className="w-[14%]">Giá</h2>
                </div>
                {carts.map((el, index) => (
                    <div className="flex w-full rounded-sm shadow-md border">
                        <div
                            onClick={() => {
                                navigate(
                                    `/${el.category.toLowerCase()}/${el._id}/${
                                        el.slug
                                    }`,
                                );
                            }}
                            className=" w-[50%] flex px-2 ">
                            <img
                                src={el?.images[0]}
                                alt=""
                                className="w-[30%]"
                            />
                            <div className=" mt-1 text-md">
                                <h2>{el?.title}</h2>
                                <h3>{`Màu : ${el?.new}`}</h3>
                            </div>
                        </div>
                        <div className="w-[29%] flex justify-normal items-center">
                            <h3>{el.newqua}</h3>
                        </div>
                        <div className="w-[20%] flex justify-between items-center">
                            <h3>{format(el.newprice)}</h3>
                            <span
                                onClick={e => handle(e, el._id, el)}
                                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-md cursor-pointer">
                                Xóa
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center w-full my-5">
                <div className=" flex flex-col gap-2 items-end w-[90%] ">
                    <div className=" flex justify-center items-center gap-1">
                        <h2>{`Tổng Tiền : `}</h2>
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

                    <div
                        className=""
                        onClick={() => {
                            dispatch(setCart({ cart: carts }));
                        }}>
                        <Link
                            target="_blank"
                            to={`/${path.CHECKOUT}`}
                            className=" hover:bg-red-500 cursor-pointer rounded-md p-2 w-[12%] text-center text-white bg-red-600">
                            Thanh Toán
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Cart);
