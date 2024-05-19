import React, { useEffect, useState } from "react"
import "./QRpayment.scss"
import QRCode from "react-qr-code"
import { useNavigate } from "react-router-dom"
import upload from "../../utils/upload"
import newRequest from "../../utils/newRequest"

const QRpayment = ({amount, sellerId, paymentIntent})=>{
    console.log(amount)

    const navigate = useNavigate()

    const upi = "saiketdebnath53@oksbi"
    const Sname = "SaiketDebnath"
    const data = `upi://pay?pa=${upi}&pn=${Sname}&tn=TestingGpay&am=${amount}&cu=INR`

    const [file, setFile] = useState(null)
    const [uploads, setUploads] = useState(null)
    const [message, setMessage] = useState(null)

    const handleSubmit = ()=>{
        setUploads(true);
    }
    const handleUpload = async ()=>{
        const url = await upload(file)
        try{
            var result = await newRequest.post("/sendmail", {
                sellerId: sellerId,
                url: url,
            })
            if(result.data.message=="Image send Successfully"){
                try{
                    var result = await newRequest.put("/orders/", {
                        payment_intent: paymentIntent,
                    })
                    navigate("/")
                }catch(err){
                    setMessage("Some error occured in updating the record")
                }
            }
            setMessage(result.data.message)
        }catch(err){
            setMessage("Some error occurred")
        }
    }

    console.log(file)
    return (
        <>
        <div className="qrpayment">
            <h1>QRcode payment page</h1>
            <div className="qrcode">
                <QRCode value={data} />
                <span>Pay amount: {amount && amount}</span>
            </div>
            <button onClick={handleSubmit}>Done</button>
            {uploads && (<div className="upload">
                <label htmlFor="image">Upload the payment image: </label>
                <input type="file" id="image" name="image" onChange={e=>setFile(e.target.files[0])}/>
                <button onClick={handleUpload} >Upload</button>
            </div>)}

            {message && message}
        </div>
        </>
    )
}

export default QRpayment