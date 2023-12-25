import { apiDeleteBlog, apiGetBlogs } from "apis";
import { Pagination } from "components";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "ultils/format";
import { Icons } from "ultils/icons";

const { AiOutlineSearch } = Icons;
function ManagerBlog() {
    const navigate = useNavigate();

    const [blogs, setProducts] = useState([]);
    const [query, setQuery] = useState({
        q: "",
    });
    const ud = useLocation();
    // console.log(ud.search);
    const [params] = useSearchParams();
    const [sele, setSele] = useState("");
    const [edit, setEdit] = useState({});
    const [varr, setVarr] = useState({});

    const fetch = async query => {
        const rs = await apiGetBlogs({ ...query });
        if (rs.success) setProducts(rs);
        // console.log(rs);
    };
    // useEffect(() => {
    //     fetch();
    // }, []);

    const { isUpdate, idCurrent } = useSelector(state => state.user);
    const [upd, setUpd] = useState(false);
    const [backs, setBacks] = useState(false);
    console.log(query.q);
    const param = useDebounce(query.q, 800);
    useEffect(() => {
        if (query.q !== "") {
            navigate({
                pathname: ud.pathname,
                search: createSearchParams("page=1").toString(),
            });
        }
    }, [query]);
    useEffect(() => {
        const pa = Object.fromEntries([...params]);
        // let para = [];
        // for (let i of params.entries()) para.push(i);
        // const queris = {};
        // for (let i of params) queris[i[0]] = i[1];
        if (param) pa.q = param;
        fetch(pa);
    }, [param, isUpdate, upd, backs, params]);
    // useEffect(() => {
    //     const pa = Object.fromEntries([...params]);
    // });
    const fetchDelete = async id => {
        const rs = await apiDeleteBlog(id);
        if (rs.success) {
            Swal.fire("Oops!", "Xóa product thành công @", "success");
        }
    };
    const handleDelete = async id => {
        fetchDelete(id);
        setUpd(!upd);
    };
    return (
        <div className="p-8 w-full mb-10">
            <h2 className="text-2xl font-bold my-5">Manage Product</h2>
            <div className="font-medium w-full ">
                <div className="flex justify-end">
                    <div className="flex items-center border border-black px-2 gap-2 rounded-md w-[35%] ">
                        <AiOutlineSearch size={"20px"} />
                        <input
                            className=" rounded-sm p-2 border-none outline-none text-sm w-full"
                            type="text"
                            placeholder="Search title or category product"
                            value={query.q}
                            onChange={e =>
                                setQuery(pre => ({ ...pre, q: e.target.value }))
                            }
                        />
                    </div>
                </div>
                <table className="w-full my-4">
                    <thead className=" border-b">
                        <tr className="border">
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                #
                            </th>
                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                Title
                            </th>

                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                Author
                            </th>

                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                Category
                            </th>

                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                Created At
                            </th>
                            <th
                                scope="col"
                                className=" text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                Updated At
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 border border-black px-3 py-4 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.blogs?.map((el, index) => (
                            <tr className="bg-gray-100 border-b" key={el._id}>
                                <td className="px-3 py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black">
                                    {index + 1}
                                </td>
                                <td className="px-3   py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black">
                                    {el.title}
                                </td>
                                <td className=" px-3 py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black">
                                    {el.author}
                                </td>

                                <td className=" px-3 py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black">
                                    {el.category}
                                </td>

                                <td className=" px-3 py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black">
                                    {moment(el.createdAt).format("DD/MM/YYYY")}
                                </td>
                                <td className=" px-3 py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black">
                                    {moment(el.updatedAt).format("DD/MM/YYYY")}
                                </td>
                                <td
                                    className={`px-3 py-4 whitespace-nowrap lg:text-sm text-xs font-medium text-gray-900 border border-black ${
                                        el._id !== idCurrent && "text-center"
                                    } `}>
                                    <span
                                        onClick={() => setEdit(el)}
                                        className="  rounded-sm bg-black text-white py-1 px-3 cursor-pointer hover:bg-gray-700">
                                        edit
                                    </span>

                                    <span
                                        onClick={() => handleDelete(el._id)}
                                        className={` mx-2 text-sm rounded-sm bg-red-600 text-white py-1 px-2 cursor-pointer hover:bg-red-700}`}>
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {blogs?.blogs?.length !== 0 && (
                    <div className="w-full">
                        <Pagination totalCount={blogs?.counts} />
                    </div>
                )}
            </div>
            {/* <div className="w-full">
                {Object?.keys(edit)?.length !== 0 && (
                    <ModalProduct data={edit} setEdit={setEdit} />
                )}
            </div> */}
        </div>
    );
}

export default ManagerBlog;
