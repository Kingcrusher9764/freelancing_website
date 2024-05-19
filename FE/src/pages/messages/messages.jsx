import React from "react"
import "./messages.scss"
import { Link } from "react-router-dom"

const Messages = ()=>{
    
    const currentUser = {
        id: 1,
        isSeller: true,
        username: "John Doe"
    }

    const message = `Last message is something Last message is something Last message is something Last message is something`

    return (
        <div className='messages' >
            <div className="container">
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
                    <tr className="active">
                        <td>John Doe</td>
                        <td><Link to="/message/123" className="link" >{message.substring(0, 100)}...</Link></td>
                        <td>Gig1</td>
                        <td>
                            <button>Mark as read</button>
                        </td>
                    </tr>
                    <tr>
                        <td>John Doe</td>
                        <td><Link to="/message/123" className="link" >{message.substring(0, 100)}...</Link></td>
                        <td>Gig1</td>
                        
                    </tr>
                    <tr>
                        <td>John Doe</td>
                        <td><Link to="/message/123" className="link" >{message.substring(0, 100)}...</Link></td>
                        <td>Gig1</td>
                        
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Messages