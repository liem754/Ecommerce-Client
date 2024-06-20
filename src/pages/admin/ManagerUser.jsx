import { apiDeleteUser, apiGetUsers, apiUpdateUserByAdmin } from "apis";
import { Modal, Pagination, Select } from "components";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { roles } from "ultils/contans";
import { Icons } from "ultils/icons";

const { AiOutlineSearch } = Icons;
function ManagerUser() {
    const [isBlock, setIsBlock] = useState({
        isBlocked: "",
    });

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({
        q: "",
    });
    const params = useSearchParams();
    const [sele, setSele] = useState("");
    const [edit, setEdit] = useState({});
    const fetch = async params => {
        const rs = await apiGetUsers({ ...params, limit: 10 });
        if (rs.success) {
            setUpd(false);
            setUsers(rs.users);
        }
    };
    const { isUpdate, idCurrent } = useSelector(state => state.user);
    const [upd, setUpd] = useState(false);
    const [backs, setBacks] = useState(false);
    const param = useDebounce(query.q, 800);
    useEffect(() => {
        const pa = Object.fromEntries([...params]);
        if (param) pa.q = param;
        fetch(pa);
    }, [param, isUpdate, upd, backs]);
    const fetchDelete = async id => {
        const rs = await apiDeleteUser(id);
        if (rs.success) {
            Swal.fire("Oops!", "Xóa user thành công @", "success");
        }
    };
    const handleDelete = async id => {
        fetchDelete(id);
        setUpd(true);
    };
    const fetchUpdateByAdmin = async isBlock => {
        const rs = await apiUpdateUserByAdmin(isBlock, sele);
        if (rs.success) {
            Swal.fire(
                "Oops!",
                "Update trạng thái user thành công !",
                "success",
            );
        }
    };
    useEffect(() => {
        if (isBlock.isBlocked !== "") {
            fetchUpdateByAdmin(isBlock);
        }
    }, [isBlock]);
    return (
        <div className="p-8 w-full">
            <h2 className="text-2xl font-bold my-5">Manage User</h2>
            <div className="font-medium w-full">
                <div className="flex justify-end">
                    <div className="flex items-center border border-black px-2 gap-2 rounded-md w-[35%] ">
                        <AiOutlineSearch size={"20px"} />
                        <input
                            className=" rounded-sm p-2 border-none outline-none text-sm w-full"
                            type="text"
                            placeholder="Search name or email user"
                            value={query.q}
                            onChange={e =>
                                setQuery(pre => ({ ...pre, q: e.target.value }))
                            }
                        />
                    </div>
                </div>
                <table className="w-full my-4">
                    <thead className="bg-white border-b">
                        <tr className="border">
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                #
                            </th>
                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                Email address
                            </th>

                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                FullName
                            </th>
                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                Role
                            </th>
                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                Status
                            </th>

                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                Created At
                            </th>

                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 border border-black px-6 py-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((el, index) => (
                            <tr className="bg-gray-100 border-b" key={el._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">
                                    {index + 1}
                                </td>
                                <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">
                                    {el.email}
                                </td>
                                <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">{`${el.lastname} ${el.firstname}`}</td>
                                <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">
                                    {
                                        roles.find(
                                            item => item.code === +el.role,
                                        )?.value
                                    }
                                </td>
                                <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">
                                    {el.mobile}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">
                                    {sele && el._id === sele ? (
                                        <Select
                                            id="isBlocked"
                                            setIsBlock={setIsBlock}
                                            option={[
                                                {
                                                    id: 1,
                                                    code: false,
                                                    value: "Active",
                                                },
                                                {
                                                    id: 2,
                                                    code: true,
                                                    value: "Blocked",
                                                },
                                            ]}
                                        />
                                    ) : (
                                        <span>
                                            {el.isBlocked
                                                ? "Blocked"
                                                : "Active"}
                                        </span>
                                    )}
                                </td>
                                <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black">
                                    {moment(el.createdAt).format("DD/MM/YYYY")}
                                </td>
                                <td
                                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-black ${
                                        el._id !== idCurrent && "text-center"
                                    } `}>
                                    {el._id === idCurrent && (
                                        <span
                                            onClick={() => setEdit(el)}
                                            className="  rounded-sm bg-black text-white py-1 px-3 cursor-pointer hover:bg-gray-700 mr-2">
                                            edit
                                        </span>
                                    )}
                                    {!backs && el._id !== idCurrent && (
                                        <span
                                            className="rounded-sm bg-black text-white py-1 px-2 cursor-pointer hover:bg-gray-700 mr-2"
                                            onClick={() => {
                                                setSele(el._id);
                                                setBacks(true);
                                            }}>
                                            status
                                        </span>
                                    )}
                                    {backs && el._id !== idCurrent && (
                                        <span
                                            className="rounded-sm bg-black text-white py-1 px-2 cursor-pointer hover:bg-gray-700 mr-2"
                                            onClick={() => {
                                                setSele("");
                                                setBacks(false);
                                            }}>
                                            back
                                        </span>
                                    )}
                                    <span
                                        onClick={() => handleDelete(el._id)}
                                        className={` text-sm rounded-sm bg-red-600 text-white py-1 px-2 cursor-pointer hover:bg-red-700}`}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users?.length !== 0 && (
                <div className="w-full">
                    <Pagination totalCount={users?.length} />
                </div>
            )}
            <div className="w-full">
                {Object?.keys(edit)?.length !== 0 && (
                    <Modal data={edit} setEdit={setEdit} />
                )}
            </div>
        </div>
    );
}

export default ManagerUser;
