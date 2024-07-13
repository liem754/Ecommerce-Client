import { apiCreateOrder, apiCurrent } from "apis";
import { apiMomo, apiZaloPay } from "apis/payment";
import im from "assets/images/checkout.jpg";
import momo from "assets/images/momo1.png";

import Paypal from "common/paypal";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTranId } from "store/app/appSlice";
import { IdCurrent } from "store/user/userSlice";
import Swal from "sweetalert2";
import { format } from "ultils/format";
function CheckOut() {
    const navigate = useNavigate();
    const { data } = useSelector(state => state.user);
    const [isSuccess, setIsSuccess] = useState(false);
    const [iss, setIss] = useState(true);
    const [tran, setTran] = useState(15000);

    const [payload, setPayload] = useState({
        address: data?.address || "",
    });
    const dispatch = useDispatch();
    const handle = async () => {
        const rs = await apiZaloPay({
            amount:
                data?.cart?.reduce((sum, item) => +item.price + sum, 0) + tran,
            orders: data.cart,
        });
        if (rs.return_code === 1) {
            dispatch(setTranId(rs.app_trans_id));
            Swal.fire("Info", "Next payment ?", "info").then(() => {
                window.location.href = rs.order_url;
                setIsSuccess(true);
            });
        }
    };
    const handleSave = async final => {
        const rs = await apiCreateOrder({ ...final });
        if (rs.success) {
            Swal.fire("Chúc mừng", "Đặt hàng thành công !", "success").then(
                async () => {
                    if (data?.role === "2000") {
                        const rss = await apiCurrent();
                        if (rss.success) {
                            dispatch(
                                IdCurrent({
                                    idCurrent: rss.rs._id,
                                    data: rss.rs,
                                }),
                            );
                        }
                        navigate("/menber/history");
                    } else {
                        navigate("/admin/history");
                    }
                },
            );
        }
    };
    useEffect(() => {
        isSuccess &&
            handleSave({
                products: data?.cart,
                total: Math.round(
                    +data?.cart?.reduce((sum, item) => +item.price + sum, 0),
                ),
                address: payload?.address,
                pay: iss ? "Thanh toán Online" : "Thanh toán khi nhận hàng",
                transpost:
                    tran === 15000
                        ? "Vận chuyển thường VNPost Tiết Kiệm"
                        : tran === 30000
                        ? "Vận chuyển nhanh J&T Express"
                        : "Vận chuyển hỏa tốc SPX Instant",
            });
    }, [isSuccess]);
    return (
        <div className="h-auto flex justify-center items-center py-10 bg-background-payment text-white">
            <div className="w-[70%] flex flex-col lg:flex-row justify-center gap-2">
                <div className=" w-full p-2 flex flex-col items-center gap-8 mt-2">
                    <div className=" flex justify-center">
                        <h2 className="text-2xl font-bold">
                            CHECKOUT YOUR CART
                        </h2>
                    </div>
                    <div className="w-full">
                        <table className=" table-auto w-full ">
                            <thead className="border bg-gray-400">
                                <tr>
                                    <th className="text-center p-2 text-medium border border-white">
                                        Thumb
                                    </th>
                                    <th className="text-center p-2 text-medium border border-white">
                                        Product
                                    </th>
                                    <th className="text-center p-2 text-medium border border-white">
                                        quantity
                                    </th>

                                    <th className="text-center p-2 text-medium border border-white">
                                        price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.cart?.map(el => (
                                    <tr>
                                        <td className="border p-2 text-center border-white">
                                            <img
                                                src={el.thumb}
                                                alt=""
                                                className="w-[50px]"
                                            />
                                        </td>
                                        <td className="border p-2 text-center border-white">
                                            {el.title}
                                        </td>
                                        <td className="border p-2 text-center border-white">
                                            {el.quantity}
                                        </td>

                                        <td className="border p-2 text-center border-white">
                                            {format(el.price)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col gap-2 py-2 border-b-2">
                        <h2 className=" text-center font-medium text-2xl mb-2">
                            Phương thức vận chuyển
                        </h2>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={tran === 15000}
                                onChange={() => setTran(15000)}
                            />
                            <h2>
                                Vận chuyển thường VNPost Tiết Kiệm (15000 đ)
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={tran === 30000}
                                onChange={() => setTran(30000)}
                            />
                            <h2>Vận chuyển nhanh J&T Express (30000 đ)</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={tran === 40000}
                                onChange={() => setTran(40000)}
                            />
                            <h2>Vận chuyển hỏa tốc SPX Instant (40000 đ)</h2>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-center font-medium text-2xl mb-2">
                            Thành tiền
                        </h2>
                        <div className="flex items-center justify-end gap-2">
                            <h3>Phí vận chuyển :</h3>
                            <h3 className=" text-red-600">{format(tran)}</h3>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <h3>Tiền sản phẩm :</h3>
                            <h3 className=" text-red-600">
                                {format(
                                    data?.cart?.reduce(
                                        (sum, item) => +item.price + sum,
                                        0,
                                    ),
                                )}
                            </h3>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <h3>Total:</h3>
                            <h3 className=" text-red-600">
                                {format(
                                    data?.cart?.reduce(
                                        (sum, item) => +item.price + sum,
                                        0,
                                    ) + tran,
                                )}
                            </h3>
                        </div>
                    </div>
                    <div className=" w-[80%] mt-4">
                        <div className=" flex items-center gap-2 mb-2">
                            <h2 className=" text-left">Địa chỉ :</h2>
                            <h2 className="text-sm">
                                (Vui lòng nhập địa chỉ trước khi thanh toán){" "}
                            </h2>
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ để đặt hàng !"
                            className="p-2 rounded-md border-2 w-full text-blue-600 font-medium"
                            value={payload?.address}
                            onChange={e =>
                                setPayload(pre => ({
                                    ...pre,
                                    address: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full  gap-2">
                        <h2 className="text-2xl font-medium">
                            Chọn hình thức thanh toán :{" "}
                        </h2>
                        <h2
                            onClick={() => setIss(false)}
                            className={`text-lg cursor-pointer hover:bg-gray-200 py-1 text-center px-3 font-medium ${
                                !iss ? "bg-black text-white" : ""
                            }`}>
                            Thanh toán khi nhận hàng
                        </h2>
                        <h2
                            onClick={() => setIss(true)}
                            className={`text-lg py-1 text-center hover:bg-gray-200 cursor-pointer px-3 font-medium ${
                                iss ? "bg-black text-white" : ""
                            }`}>
                            Thanh toán online
                        </h2>
                    </div>
                    <div className="border-t-2 w-full flex justify-center pt-7">
                        {iss ? (
                            <div className="w-full flex flex-col items-center">
                                <Paypal
                                    payload={{
                                        products: data?.cart,
                                        total: Math.round(
                                            +data?.cart?.reduce(
                                                (sum, item) =>
                                                    +item.price + sum,
                                                0,
                                            ) / 23500,
                                        ),
                                        address: payload?.address,
                                    }}
                                    setIsSuccess={setIsSuccess}
                                    amount={Math.round(
                                        +data?.cart?.reduce(
                                            (sum, item) => +item.price + sum,
                                            0,
                                        ) / 23500,
                                    )}
                                />

                                <div
                                    onClick={handle}
                                    className=" border p-2 flex justify-center items-center cursor-pointer ">
                                    <img
                                        className=" w-[100px] h-[100px] rounded-md hover:shadow-md hover:shadow-blue-600 hover:scale-105"
                                        src={momo}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsSuccess(true)}
                                className="py-2 px-6 bg-blue-600 text-white textlg">
                                Đặt hàng
                            </button>
                        )}
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
