import React, { useEffect, useState } from "react"
import "./pay.scss"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest"
import {useParams} from "react-router-dom"
import CheckoutForm from "../../components/checkoutForm/checkoutForm";

import QRpayment from "../../components/QRpayment/QRpayment";

const stripePromise = loadStripe("pk_test_51OokHrSHioAVIRAYM75TN3KVrLZVEIRF5h44lqARYktr5xAuwIJGE3y0CipcXDqdxakupor9E1xnxtxAQxsM93kD00EwvzYTim");

const Pay = ()=>{
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntent, setPaymentIntent] = useState("");
    const [sellerId, setSellerId] = useState("")
    const [amount, setAmount] = useState(null);

    const {id} = useParams()

    useEffect(()=>{
        const makeRequest = async ()=>{
            try{
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
                setAmount(res.data.price)
                setPaymentIntent(res.data.paymentIntentId)
                setSellerId(res.data.sellerId)
                console.log(paymentIntent)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        makeRequest()
    }, [])

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    return (
        <div className="pay">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    {/* <CheckoutForm /> */}
                    <QRpayment amount={amount} sellerId={sellerId} paymentIntent={paymentIntent} />
                </Elements>
            )}
        </div>
    )
}

export default Pay