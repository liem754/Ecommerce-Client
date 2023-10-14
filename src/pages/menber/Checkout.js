import im from "assets/images/checkout.jpg";
import Paypal from "common/paypal";
import { useSelector } from "react-redux";
import { format } from "ultils/format";
function CheckOut() {
    const { cart } = useSelector(state => state.user);

    console.log(cart);
    return (
        <div className="w-main h-screen mx-auto flex justify-center items-center py-10">
            <div className="w-[90%] flex justify-center gap-2">
                <div className="w-[40%] flex flex-col justify-end it h-screen">
                    <img src={im} alt="" className="w-full h-[50%] mb-28" />
                </div>
                <div className="w-[60%] p-10 flex flex-col gap-8 mt-10">
                    <div className=" flex justify-center">
                        <h2 className="text-2xl font-bold">
                            CHECKOUT YOUR CART
                        </h2>
                    </div>
                    <div className="w-full">
                        <table className=" table-auto w-full">
                            <thead className="border bg-gray-400">
                                <tr>
                                    <th className="text-center p-2 text-medium border border-black">
                                        Product
                                    </th>
                                    <th className="text-center p-2 text-medium border border-black">
                                        quantity
                                    </th>

                                    <th className="text-center p-2 text-medium border border-black">
                                        price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(el => (
                                    <tr>
                                        <td className="border p-2 text-center border-black">
                                            {el.title}
                                        </td>
                                        <td className="border p-2 text-center border-black">
                                            {el.quantity}
                                        </td>

                                        <td className="border p-2 text-center border-black">
                                            {format(el.price)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <h3>Total:</h3>
                        <h3 className=" text-red-600">
                            {format(
                                cart?.reduce(
                                    (sum, item) => +item.price + sum,
                                    0,
                                ),
                            )}
                        </h3>
                    </div>
                    <div className="mt-6">
                        <Paypal
                            amount={Math.round(
                                +cart?.reduce(
                                    (sum, item) => +item.price + sum,
                                    0,
                                ) / 23500,
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
