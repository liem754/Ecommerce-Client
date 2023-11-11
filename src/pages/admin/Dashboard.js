import { apiGetOrdersbyAdmin } from "apis";
import logo from "assets/images/logo3.png";
import { useEffect, useState } from "react";
import { format } from "ultils/format";

function DashBoard() {
    const [order, setOrder] = useState(null);
    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState(1);
    const [statusYear, setStatusYear] = useState(2020);
    const [statuss, setStatuss] = useState(1);
    const [statusYears, setStatusYears] = useState(2020);
    const [id, setId] = useState(0);

    const fetch = async query => {
        const rs = await apiGetOrdersbyAdmin(query);
        if (rs.success) {
            setOrder(rs);
        }
    };

    useEffect(() => {
        fetch({
            isMine: true,
        });
    }, []);
    // const handleupdate = async id => {
    //     setEdit(false);
    //     if (status) {
    //         const rs = await apiupdateOrders({
    //             oid: id,
    //             status: status,
    //         });
    //         if (rs.success) {
    //             Swal.fire(
    //                 "Chúc mừng !",
    //                 "Cập nhập đơn hàng thành công !",
    //                 "success",
    //             ).then(() => {
    //                 setStatus(null);
    //             });
    //         }
    //     } else {
    //         Swal.fire("Thông báo !", "Bạn chưa thay đổi !", "info");
    //     }
    // };
    console.log(new Date().getFullYear());
    console.log(order?.orders[0]?.createdAt.slice(0, 4));
    console.log(
        order?.orders[0]?.createdAt.slice(0, 4).toString() ===
            new Date().getFullYear().toString(),
    );
    return (
        <div className="py-10">
            <div className="w-full flex justify-center">
                <img
                    className=" w-[35%] p-2 ml-4 mt-2 mb-6 "
                    src={logo}
                    alt="Your Company"
                />
            </div>
            <div className=" flex flex-col gap-4 p-4">
                <h2 className=" text-2xl font-medium font-main">
                    Thống Kê Đơn Hàng
                </h2>
                <div className="py-4">
                    <table className="w-full table-auto">
                        <thead className="border-b text-white bg-black font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th scope="col" className="px-2 py-2">
                                    Tổng đơn hàng hôm nay
                                </th>

                                <th scope="col" className="px-2 py-2">
                                    Tổng đơn hàng tháng này
                                </th>

                                <th scope="col" className="px-2 py-2">
                                    Tổng đơn hàng cả năm
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className={`  ${"bg-white text-xs dark:border-neutral-500 border-b border-black dark:bg-neutral-600"} `}>
                                <td className="whitespace-nowrap px-2 py-2 text-center text-2xl font-bold  text-blue-700 ">
                                    {
                                        order?.orders.filter(
                                            item =>
                                                item?.createdAt
                                                    .slice(0, 4)
                                                    .toString() ===
                                                    new Date()
                                                        .getFullYear()
                                                        .toString() &&
                                                item?.createdAt
                                                    .split("-")[1]
                                                    .toString() ===
                                                    (
                                                        new Date().getMonth() +
                                                        1
                                                    ).toString() &&
                                                item?.createdAt
                                                    .split("-")[2]
                                                    .substring(1, 2)
                                                    .toString() ===
                                                    new Date()
                                                        .getDate()
                                                        .toString(),
                                        ).length
                                    }
                                </td>
                                <td className="whitespace-nowrap px-2 py-2 text-center text-2xl font-bold  text-blue-700  ">
                                    {
                                        order?.orders.filter(
                                            item =>
                                                item?.createdAt
                                                    .slice(0, 4)
                                                    .toString() ===
                                                    new Date()
                                                        .getFullYear()
                                                        .toString() &&
                                                item?.createdAt
                                                    .split("-")[1]
                                                    .toString() ===
                                                    (
                                                        new Date().getMonth() +
                                                        1
                                                    ).toString(),
                                        ).length
                                    }
                                </td>
                                <td className="whitespace-nowrap px-2 py-2 text-center  text-2xl font-bold  text-blue-700">
                                    {
                                        order?.orders.filter(
                                            item =>
                                                item?.createdAt
                                                    .slice(0, 4)
                                                    .toString() ===
                                                new Date()
                                                    .getFullYear()
                                                    .toString(),
                                        ).length
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center border-2 shadow-xl py-4 gap-8">
                    <div className="flex flex-col items-center gap-4 border-r-4 pr-8">
                        <h2 className=" border-b-2 py-1 border-black text-xl">
                            Theo tháng
                        </h2>
                        <select
                            className="px-4 py-1 text-md border-2"
                            onChange={e => setStatuss(e.target.value)}>
                            <option value="1">Tháng 1</option>
                            <option value="2">Tháng 2</option>

                            <option value="3">Tháng 3</option>

                            <option value="4">Tháng 4</option>
                            <option value="5">Tháng 5</option>
                            <option value="6">Tháng 6</option>
                            <option value="7">Tháng 7</option>
                            <option value="8">Tháng 8</option>
                            <option value="9">Tháng 9</option>
                            <option value="10">Tháng 10</option>
                            <option value="11">Tháng 11</option>
                            <option value="12">Tháng 12</option>
                        </select>
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className=" font-medium ">Số đơn hàng</h2>
                            <h2 className="text-red-600 font-medium">
                                {`
                                ${
                                    order?.orders.filter(
                                        item =>
                                            item?.createdAt
                                                .slice(0, 4)
                                                .toString() ===
                                                new Date()
                                                    .getFullYear()
                                                    .toString() &&
                                            item?.createdAt
                                                .split("-")[1]
                                                .toString() ===
                                                statuss.toString(),
                                    ).length
                                } đơn`}
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <h2 className=" border-b-2 py-1 border-black text-xl">
                            Theo năm
                        </h2>
                        <select
                            className="px-4 py-1 text-md border-2"
                            onChange={e => setStatusYears(e.target.value)}>
                            <option value="2020">Năm 2020</option>
                            <option value="2021">Năm 2021</option>

                            <option value="2022">Năm 2022</option>

                            <option value="2023">Năm 2023</option>
                        </select>
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className=" font-medium ">Số đơn hàng</h2>
                            <h2 className="text-red-600 font-medium">
                                {`
                                ${
                                    order?.orders.filter(
                                        item =>
                                            item?.createdAt
                                                .slice(0, 4)
                                                .toString() ===
                                            statusYears.toString(),
                                    ).length
                                } đơn`}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4 p-4">
                <h2 className=" text-2xl font-medium font-main">
                    Thống Kê Doanh Thu
                </h2>
                <div className="py-4">
                    <table className="w-full table-auto">
                        <thead className="border-b text-white bg-black font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th scope="col" className="px-2 py-2">
                                    Tổng doanh thu hôm nay
                                </th>

                                <th scope="col" className="px-2 py-2">
                                    Tổng doanh thu tháng này
                                </th>

                                <th scope="col" className="px-2 py-2">
                                    Tổng doanh thu cả năm
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className={`  ${"bg-white text-xs dark:border-neutral-500 border-b border-black dark:bg-neutral-600"} `}>
                                <td className="whitespace-nowrap px-2 py-2 text-center text-2xl font-bold  text-blue-700 ">
                                    {format(
                                        order?.orders
                                            ?.filter(
                                                item =>
                                                    item?.createdAt
                                                        .slice(0, 4)
                                                        .toString() ===
                                                        new Date()
                                                            .getFullYear()
                                                            .toString() &&
                                                    item?.createdAt
                                                        .split("-")[1]
                                                        .toString() ===
                                                        (
                                                            new Date().getMonth() +
                                                            1
                                                        ).toString() &&
                                                    item?.createdAt
                                                        .split("-")[2]
                                                        .substring(1, 2)
                                                        .toString() ===
                                                        new Date()
                                                            .getDate()
                                                            .toString(),
                                            )
                                            ?.reduce(
                                                (sum, el) => sum + el?.total,
                                                0,
                                            ),
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-2 py-2 text-center text-2xl font-bold  text-blue-700  ">
                                    {format(
                                        order?.orders
                                            .filter(
                                                item =>
                                                    item?.createdAt
                                                        .slice(0, 4)
                                                        .toString() ===
                                                        new Date()
                                                            .getFullYear()
                                                            .toString() &&
                                                    item?.createdAt
                                                        .split("-")[1]
                                                        .toString() ===
                                                        (
                                                            new Date().getMonth() +
                                                            1
                                                        ).toString(),
                                            )
                                            .reduce(
                                                (sum, el) => sum + el?.total,
                                                0,
                                            ),
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-2 py-2 text-center  text-2xl font-bold  text-blue-700">
                                    {format(
                                        order?.orders
                                            .filter(
                                                item =>
                                                    item?.createdAt
                                                        .slice(0, 4)
                                                        .toString() ===
                                                    new Date()
                                                        .getFullYear()
                                                        .toString(),
                                            )
                                            .reduce(
                                                (sum, el) => sum + el?.total,
                                                0,
                                            ),
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center border-2 shadow-xl py-4 gap-8">
                    <div className="flex flex-col items-center gap-4 border-r-4 pr-8">
                        <h2 className=" border-b-2 py-1 border-black text-xl">
                            Theo tháng
                        </h2>
                        <select
                            className="px-4 py-1 text-md border-2"
                            onChange={e => setStatus(e.target.value)}>
                            <option value="1">Tháng 1</option>
                            <option value="2">Tháng 2</option>

                            <option value="3">Tháng 3</option>

                            <option value="4">Tháng 4</option>
                            <option value="5">Tháng 5</option>
                            <option value="6">Tháng 6</option>
                            <option value="7">Tháng 7</option>
                            <option value="8">Tháng 8</option>
                            <option value="9">Tháng 9</option>
                            <option value="10">Tháng 10</option>
                            <option value="11">Tháng 11</option>
                            <option value="12">Tháng 12</option>
                        </select>
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className=" font-medium ">Doanh thu</h2>
                            <h2 className=" text-red-600 font-medium">
                                {`
                                ${format(
                                    order?.orders
                                        .filter(
                                            item =>
                                                item?.createdAt
                                                    .slice(0, 4)
                                                    .toString() ===
                                                    new Date()
                                                        .getFullYear()
                                                        .toString() &&
                                                item?.createdAt
                                                    .split("-")[1]
                                                    .toString() ===
                                                    status.toString(),
                                        )
                                        .reduce(
                                            (sum, el) => sum + el?.total,
                                            0,
                                        ),
                                )}`}
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <h2 className=" border-b-2 py-1 border-black text-xl">
                            Theo năm
                        </h2>
                        <select
                            className="px-4 py-1 text-md border-2"
                            onChange={e => setStatusYear(e.target.value)}>
                            <option value="2020">Năm 2020</option>
                            <option value="2021">Năm 2021</option>

                            <option value="2022">Năm 2022</option>

                            <option value="2023">Năm 2023</option>
                        </select>
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className=" font-medium ">Doanh thu</h2>
                            <h2 className="text-red-600 font-medium">
                                {`
                                ${format(
                                    order?.orders
                                        .filter(
                                            item =>
                                                item?.createdAt
                                                    .slice(0, 4)
                                                    .toString() ===
                                                statusYear.toString(),
                                        )
                                        .reduce(
                                            (sum, el) => sum + el?.total,
                                            0,
                                        ),
                                )}`}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
