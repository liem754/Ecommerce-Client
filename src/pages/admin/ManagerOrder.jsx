import {
    apiDeleteOrdersbyAdmin,
    apiGetOrdersbyAdmin,
    apiupdateOrders,
} from "apis";
import { Pagination } from "components";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { format } from "ultils/format";

function ManagerOrder() {
    const [status, setStatus] = useState("Đang chờ xử lý");

    const [order, setOrder] = useState(null);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);

    const [id, setId] = useState(0);

    const fetch = async query => {
        const rs = await apiGetOrdersbyAdmin(query);
        if (rs.success) {
            setOrder(rs);
            setRemove(false);
        }
    };

    useEffect(() => {
        fetch({
            isMine: true,
            limit: 5,
        });
    }, [status, remove]);
    const handleupdate = async id => {
        setEdit(false);
        if (status) {
            // console.log(status);
            const rs = await apiupdateOrders({
                oid: id,
                status: status,
            });
            if (rs.success) {
                Swal.fire(
                    "Congratulations",
                    "Successfully updated orders !",
                    "success",
                ).then(() => {
                    setStatus(null);
                });
            }
        } else {
            Swal.fire("Notification", "You haven't changed !", "info");
        }
    };
    const deleteOrder = async id => {
        const rs = await apiDeleteOrdersbyAdmin(id);
        if (rs.success) {
            Swal.fire(
                "Notification",
                "Order deleted successfully ",
                "success",
            ).then(() => {
                setRemove(true);
            });
        } else {
            Swal.fire("Notification", "Delete failed orders !", "error");
        }
    };
    return (
        <div className="px-2 py-8">
            <h2 className=" text-center font-medium text-3xl mb-4">
                Order Management
            </h2>
            <table className="w-full table-auto">
                <thead className="border-b bg-gray-400 font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                        <th scope="col" className="px-2 py-2">
                            STT
                        </th>
                        <th scope="col" className="px-2 py-2">
                            Products
                        </th>
                        <th scope="col" className="px-2 py-2">
                            Total
                        </th>

                        <th scope="col" className="px-2 py-2">
                            Status
                        </th>
                        <th scope="col" className=" px-2 py-2">
                            Information line
                        </th>
                        <th scope="col" className=" px-2 py-2">
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
                            <td className="whitespace-nowrap px-2 py-2 text-center">
                                {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2  ">
                                <div className="flex flex-col gap-2 items-start">
                                    {item?.products?.map(el => (
                                        <div className=" text-xs flex gap-1 justify-between">
                                            <img
                                                src={el?.thumb}
                                                alt=""
                                                className="w-[50px] hidden lg:block"
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
                            <td className="whitespace-nowrap px-2 py-2 text-center">
                                <div className="flex flex-col gap-1">
                                    <span>{`${format(item?.total)} `}</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-center">
                                {edit && id === item?._id ? (
                                    <select
                                        className="px-4 py-1 text-md border-2"
                                        onChange={e =>
                                            setStatus(e.target.value)
                                        }>
                                        <option value="Đang chờ xử lý">
                                            Đang chờ xử lý
                                        </option>
                                        <option value="Đã hủy">Đã hủy</option>
                                        <option value="Đang giao hàng">
                                            Đang giao hàng
                                        </option>
                                        <option value="Đã giao hàng">
                                            Đã giao hàng
                                        </option>
                                        <option value="Thành công">
                                            Thành công
                                        </option>
                                    </select>
                                ) : (
                                    <span>{item?.status}</span>
                                )}
                            </td>
                            <td className=" whitespace-nowrap px-2 py-2 text-center">
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
                            <td className=" whitespace-nowrap px-2 py-2 text-center">
                                {moment(item?.createdAt).fromNow()}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-center">
                                {edit && id === item?._id ? (
                                    <button
                                        onClick={() => handleupdate(item?._id)}
                                        className="py-1 px-3 bg-blue-600 text-white rounded-md">
                                        OK
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => {
                                                setEdit(true);
                                                setId(item?._id);
                                            }}
                                            className="py-1 px-3 bg-blue-600 text-white rounded-md">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteOrder(item._id)
                                            }
                                            className="py-1 px-3 bg-red-600 text-white rounded-md">
                                            xóa
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {order?.orders.length > 0 && (
                <div className="mt-20">
                    <Pagination
                        totalCount={order?.counts}
                        type={"order"}
                        pageSize={5}
                    />
                </div>
            )}
        </div>
    );
}

export default ManagerOrder;
