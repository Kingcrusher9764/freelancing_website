import React from "react"
import "./messages.scss"
import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import moment from "moment"

const Messages = ()=>{
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    const queryClient = useQueryClient()
    const {isLoading, error, data} = useQuery({
        queryKey: ['conversations'],
        queryFn: ()=>newRequest.get(`/conversations`).then((res)=>res.data) 
    })

    const mutation = useMutation({
        mutationFn: (id)=>{ return newRequest.put(`/conversations/${id}`) },
        onSuccess:()=>{ queryClient.invalidateQueries(['conversations']) }
    })

    const handleRead = (id)=>{
        mutation.mutate(id)
    }

    return (
        <div className='messages' >
            {isLoading ? "Loading" : error ? "Something went wrong" :(<div className="container">
                <div className="title">
                    <h1>Orders</h1>
                    
                </div>

                <table>
                    <tr>
                        <th>{currentUser?.isSeller ? "Buyer": "Seller"}</th>
                        <th>Last Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    {data.map(c=>(
                        <tr className={(currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) && ("active")} key={c.id}>
                        <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                        <td><Link to={`/message/${c.id}`} className="link" >{c?.lastMessage?.substring(0, 100)}...</Link></td>
                        <td>{moment(c.updatedAt).fromNow()}</td>
                        <td>
                            {
                                (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) && 
                                (<button onClick={()=>handleRead(c.id)}>Mark as read</button>)
                            }
                        </td>
                    </tr>
                    ))}                    
                </table>
            </div>)}
        </div>
    )
}

export default Messages