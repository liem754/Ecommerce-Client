import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { apiCreateOrder } from "apis";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This value is from the props in the UI
const style = { layout: "vertical" };

function createOrder({ data, actions }) {
    // replace this url with your server
    return actions.order.create({
        // purchase_units: [{ amount: { currency_code: currency } }],
    });
}
function onApprove(data) {
    // replace this url with your server
    return fetch(
        "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        },
    )
        .then(response => response.json())
        .then(orderData => {
            // Your code here after capture the order
        });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
    currency,
    showSpinner,
    amount,
    payload,
    setIsSuccess,
}) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then(orderId => orderId)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async response => {
                        if (response.status === "COMPLETED") {
                            setIsSuccess(true);
                        }
                    })
                }
            />
        </>
    );
};

export default function Paypal({ amount, payload, setIsSuccess }) {
    return (
        <div
            className="w-full"
            style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    clientId: "test",
                    components: "buttons",
                    currency: "USD",
                }}>
                <ButtonWrapper
                    payload={payload}
                    setIsSuccess={setIsSuccess}
                    currency={"USD"}
                    amount={amount}
                    showSpinner={false}
                />
            </PayPalScriptProvider>
        </div>
    );
}
