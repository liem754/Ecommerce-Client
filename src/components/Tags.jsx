import { memo, useCallback, useEffect, useState } from "react";
import { Icons } from "../ultils/icons";
import Votebar from "./Votebar";
import moment from "moment";
import { formatStar } from "../ultils/format";
import ModalRating from "./ModalRating";
import { apiRatings } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { fix } from "store/app/appSlice";
import size from "assets/images/sizemen.png";
import size2 from "assets/images/sizegirl.png";

function Tag({ description, total, totalratings, pid, rerender, category }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mo, setMo] = useState(false);
    const [show, setShow] = useState(false);

    const { isLoggedin, data } = useSelector(state => state.user);
    const [rating, setRating] = useState(false);
    const [payload, setPayload] = useState({
        comment: "",
        star: "",
        images: [],
    });
    const handle = useCallback((comment, score, images) => {
        setPayload(pre => ({
            ...pre,
            comment: comment,
            star: score,
            images: images,
            updatedAt: Date.now(),
        }));
    }, []);

    const fetch = async () => {
        setShow(true);
        const fromData = new FormData();
        for (let i of Object.entries(payload)) fromData.append(i[0], i[1]);
        if (payload.images) {
            for (let i of payload.images) fromData.append("images", i);
        }
        if (pid) {
            fromData.append("pid", pid);
        }

        const rs = await apiRatings(fromData);

        if (rs.success) {
            Swal.fire("Congratulations!", rs.mes, "success").then(() => {
                setRating(false);
                dispatch(fix(false));
                setShow(false);
                rerender();
            });
        } else {
            Swal.fire("Oops !", rs.mes, "info").then(() => {
                setRating(false);
                dispatch(fix(false));
                setShow(false);
                rerender();
            });
        }
    };
    useEffect(() => {
        if (payload.comment !== "" && payload.star !== null) fetch();
    }, [payload]);
    console.log(total);
    return (
        <div className="w-full mb-11">
            {rating && (
                <ModalRating
                    handle={handle}
                    value={payload}
                    setRating={setRating}
                    show={show}
                />
            )}
            <div className={`flex  `}>
                <div
                    className={`sm:block hidden w-[20%] cursor-pointer text-center py-2 px-5 z-10 ${
                        mo
                            ? "border-x border-black border-t-4"
                            : " bg-gray-200 border-b border-black"
                    }`}
                    onClick={() => {
                        setTimeout(() => {
                            setMo(true);
                        }, 300);
                    }}>
                    Description
                </div>

                <div
                    className={` sm:text-md w-[20%] cursor-pointer text-center py-2 sm:px-5 px-1 z-10 ${
                        !mo
                            ? "border-x border-black border-t-4"
                            : "border-b border-black bg-gray-200"
                    }`}
                    onClick={() => {
                        setTimeout(() => {
                            setMo(false);
                        }, 300);
                    }}>
                    Evaluate
                </div>
                <div className="w-[80%] border-b border-black"></div>
            </div>
            <div className="w-full border-x border-b border-black p-6">
                {mo ? (
                    <>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(description[0]),
                            }}></div>
                        <img
                            src={category === "shirt men" ? size : size2}
                            alt=""
                        />
                    </>
                ) : (
                    <div className="flex flex-col gap-5">
                        <div className="border-4 py-6 px-2 flex sm:flex-row flex-col  justify-between">
                            <div className="sm:w-[40%] w-full flex flex-col items-center gap-2 justify-center">
                                <span className="text-lg font-medium">{`${totalratings}/5`}</span>
                                <span className="flex gap-1">
                                    {formatStar(totalratings).map(
                                        (el, index) => (
                                            <span key={index}>
                                                <span>{el}</span>
                                            </span>
                                        ),
                                    )}
                                </span>
                                <span className="lg:text-sm text-xs">{`${total?.length} reviewer`}</span>
                            </div>
                            <div className="sm:w-[60%] w-full flex flex-col gap-2">
                                {Array.from(Array(5).keys())
                                    .reverse()
                                    .map((el, index) => (
                                        <Votebar
                                            key={index}
                                            number={el + 1}
                                            ratingCount={
                                                total?.filter(
                                                    i => i.star === el + 1,
                                                ).length
                                            }
                                            ratingTotle={total?.length}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 mt-3 justify-center items-center">
                            <h2>Do you want rating?</h2>
                            <button
                                onClick={() => {
                                    if (isLoggedin && !data?.isBlocked) {
                                        setRating(true);
                                        dispatch(fix(true));
                                    } else if (isLoggedin && data?.isBlocked) {
                                        Swal.fire(
                                            "Oops!",
                                            "Tài khoản của bạn đã bị khóa, tạm thời bạn không thể đánh giá!",
                                            "info",
                                        );
                                    } else if (!isLoggedin) {
                                        Swal.fire({
                                            text: "Go Login to vote",
                                            cancelButtonText: "Cancel",
                                            confirmButtonText: "Go Login",
                                            title: "Oops!",
                                            showCancelButton: true,
                                        }).then(rs => {
                                            if (rs.isConfirmed)
                                                navigate("/login");
                                        });
                                    }
                                }}
                                className="py-1 px-5 bg-red-600 text-white rounded-md">
                                Rate now
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 pt-5">
                            {total?.map((el, index) => (
                                <div key={index} className="">
                                    {el?.postedBy && (
                                        <div className="flex flex-col gap-2 p-1 border ">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                                                        className="w-[30px] rounded-[50%]"
                                                        alt=""
                                                    />

                                                    <h2 className="font-bold">{`${
                                                        el?.postedBy?.name
                                                            ?.charAt(0)
                                                            .toUpperCase() +
                                                        el?.postedBy?.name?.slice(
                                                            1,
                                                        )
                                                    } `}</h2>
                                                </div>
                                                <span className="text-xs">
                                                    {moment(
                                                        el?.updatedAt,
                                                    ).fromNow()}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 text-sm flex flex-col gap-1 px-4 py-2">
                                                {el.images?.map(item => (
                                                    <img
                                                        src={item}
                                                        className="w-[100px]"
                                                        alt=""
                                                    />
                                                ))}
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">
                                                        vote:
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        {formatStar(
                                                            el?.star,
                                                        ).map((el, index) => (
                                                            <span key={index}>
                                                                <span>
                                                                    {el}
                                                                </span>
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">
                                                        Comment:
                                                    </span>

                                                    <h2 className=" text-ellipsis">
                                                        {`

                                               " ${el.comment} "`}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Tag);
