import { apiGetOrders, apiupdateOrders } from "apis";
import { Pagination } from "components";
import { memo, useEffect, useState } from "react";
import { format } from "ultils/format";
import moment from "moment";
import Swal from "sweetalert2";
function History() {
    const [status, setStatus] = useState("Đang chờ xử lý");

    const [order, setOrder] = useState(null);
    const fetch = async query => {
        const rs = await apiGetOrders(query);
        if (rs.success) {
            setOrder(rs);
        }
    };

    useEffect(() => {
        fetch({
            status,
            isMine: true,
        });
    }, [status]);
    const handleupdate = async (id, statuss) => {
        const rs = await apiupdateOrders({
            oid: id,
            status: statuss,
        });
        if (rs.success) {
            Swal.fire(
                "Chúc mừng !",
                "Cập nhập đơn hàng thành công !",
                "success",
            ).then(() => {
                fetch({
                    status,
                    isMine: true,
                });
            });
        }
    };
    return (
        <div className="h">
            <div className="px-4 w-full py-12 flex flex-col justify-between">
                <h2 className="text-4xl font-bold text-center mb-10">
                    History
                </h2>
                <div className="flex justify-end mb-3">
                    <select
                        className="px-4 py-1 text-md border-2"
                        onChange={e => setStatus(e.target.value)}>
                        <option value="Đang chờ xử lý">Đang chờ xử lý</option>
                        <option value="Đã hủy">Đã hủy</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                        <option value="Thành công">Thành công</option>
                    </select>
                </div>
                <table className="w-full">
                    <thead className="border-b bg-gray-400 font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                            <th scope="col" className="px-2 py-2 ">
                                STT
                            </th>
                            <th scope="col" className="px-2 py-2">
                                Products
                            </th>
                            <th scope="col" className="px-2 py-2 ">
                                Total
                            </th>

                            <th scope="col" className="px-2   py-2">
                                Status
                            </th>
                            <th scope="col" className="px-2  py-2">
                                Information line
                            </th>
                            <th scope="col" className=" py-2 px-2 ">
                                Time
                            </th>
                            <th scope="col" className="px-2 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.orders.map((item, index) => (
                            <tr
                                key={index}
                                className={`  ${
                                    index % 2 !== 0
                                        ? "dark:border-neutral-500 text-xs border-b border-black bg-neutral-200 dark:bg-neutral-700"
                                        : "bg-white text-xs dark:border-neutral-500 border-b border-black dark:bg-neutral-600"
                                } `}>
                                <td className=" whitespace-nowrap px-2 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-2 py-2  ">
                                    <div className="flex flex-col gap-2 items-start">
                                        {item?.products?.map(el => (
                                            <div className=" text-xs flex gap-1 justify-between">
                                                <img
                                                    src={el?.thumb}
                                                    alt=""
                                                    className=" w-[50px]"
                                                />
                                                <div className="flex flex-col justify-start items-start gap-1">
                                                    <h2>{el?.title}</h2>
                                                    <h2>
                                                        <h2>{`Giá: ${format(
                                                            el?.price,
                                                        )}`}</h2>
                                                        <h2>{`Color: ${format(
                                                            el?.color,
                                                        )}`}</h2>
                                                    </h2>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className=" whitespace-nowrap px-2 py-2 text-center">
                                    {item?.pay === "Thanh toán Online" &&
                                    item?.status === "Đang chờ xử lý" ? (
                                        <div className="flex flex-col gap-1">
                                            <span>{`${format(
                                                item?.total,
                                            )} `}</span>
                                            <span>( Đã thanh toán )</span>
                                        </div>
                                    ) : item?.pay !== "Thanh toán Online" &&
                                      item?.status === "Đang chờ xử lý" ? (
                                        <div className="flex flex-col gap-1">
                                            <span>{`${format(
                                                item?.total,
                                            )} `}</span>
                                            <span>
                                                ( Vui lòng thanh toán khi nhận
                                                hàng )
                                            </span>
                                        </div>
                                    ) : (
                                        <span className=" text-xs sm:text-sm">{`${format(
                                            item?.total,
                                        )} `}</span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-2   py-2 text-center">
                                    {item?.status}
                                </td>
                                <td className="whitespace-nowrap  px-2 py-2 text-center">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1">
                                            <h2 className=" font-medium">
                                                Địa chỉ :
                                            </h2>
                                            <h2>{item?.address}</h2>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <h2 className=" font-medium">
                                                Vận chuyển :
                                            </h2>
                                            <h2>{item?.transpost}</h2>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <h2 className=" font-medium">
                                                Thanh toán :
                                            </h2>
                                            <h2>{item?.pay}</h2>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap  px-2 py-2 text-center">
                                    {moment(item?.createdAt).fromNow()}
                                </td>
                                <td className="whitespace-nowrap px-2 py-2 text-center">
                                    {item?.status === "Đã hủy" ||
                                    item?.status === "Thành công" ? (
                                        <button
                                            onClick={() =>
                                                handleupdate(
                                                    item?._id,
                                                    "Đang chờ xử lý",
                                                )
                                            }
                                            className="py-1 px-3 bg-blue-600 text-white rounded-md">
                                            Mua lại
                                        </button>
                                    ) : item?.status === "Đang chờ xử lý" ? (
                                        <button
                                            onClick={() =>
                                                handleupdate(
                                                    item?._id,
                                                    "Đã hủy",
                                                )
                                            }
                                            className="py-1 px-3 bg-red-600 text-white rounded-md">
                                            Hủy
                                        </button>
                                    ) : item?.status === "Đã giao hàng" ? (
                                        <button
                                            onClick={() =>
                                                handleupdate(
                                                    item?._id,
                                                    "Thành công",
                                                )
                                            }
                                            className="py-1 px-3 bg-blue-600 text-white rounded-md">
                                            Đã nhận hàng
                                        </button>
                                    ) : (
                                        <h2>Đang giao hàng</h2>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {order?.orders.length > 0 && (
                    <div className="mt-20">
                        <Pagination totalCount={order?.counts} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(History);
