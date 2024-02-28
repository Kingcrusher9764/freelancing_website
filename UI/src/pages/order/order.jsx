import React from "react"
import "./order.scss"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { useNavigate } from "react-router-dom"

const Orders = ()=>{

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const navigate = useNavigate()

    const {isLoading, error, data} = useQuery({
        queryKey: ['orders'],
        queryFn: ()=>newRequest.get(`/orders/`).then((res)=>res.data) 
    })

    const handleContact = async (order)=>{
        const sellerId = order.sellerId
        const buyerId = order.buyerId
        const id = sellerId + buyerId

        try{
            const res = await newRequest.get(`/conversations/single/${id}`)
            navigate(`/message/${res.data.id}`)

        }catch(err){
            if(err.response.status === 404){
                const res = await newRequest.post(`/conversations/`, {
                    to: currentUser.isSeller ? buyerId : sellerId
                })
                navigate(`/message/${res.data.id}`)
            }
        }
    }

    return (
        <div className='order' >
            {isLoading ? "Loading" : error ? "Something went wrong!" : (<div className="container">
                <div className="title">
                    <h1>Orders</h1>
                    
                </div>

                <table>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Contact</th>
                    </tr>
                    {data.map(order=>(<tr key={order._id} >
                        <td><img className="img" src={order.img} alt="" /></td>
                        <td>{order.title}</td>
                        <td>{order.price}</td>
                        <td>
                            <img className="message" src="/img/message.png" onClick={()=>handleContact(order)} alt="" />
                        </td>
                    </tr>))}
                </table>
            </div>)}
        </div>
    )
}

export default Orders