import React from "react"
import "./order.scss"

const Orders = ()=>{

    const currentUser = {
        id: 1,
        isSeller: true,
        username: "John Doe"
    }

    return (
        <div className='order' >
            <div className="container">
                <div className="title">
                    <h1>Orders</h1>
                    
                </div>

                <table>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>{currentUser?.isSeller ? "Buyer": "Seller"}</th>
                        <th>Contact</th>
                    </tr>
                    <tr>
                        <td><img className="img" src="https://th.bing.com/th/id/OIP.mJmOEsXOXtOBnXigyQmSSwHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="" /></td>
                        <td>Gig1</td>
                        <td>59.99</td>
                        <td>John Doe</td>
                        <td>
                            <img className="message" src="/img/message.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td><img className="img" src="https://th.bing.com/th/id/OIP.mJmOEsXOXtOBnXigyQmSSwHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="" /></td>
                        <td>Gig1</td>
                        <td>59.99</td>
                        <td>John Doe</td>
                        <td>
                            <img className="message" src="/img/message.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td><img className="img" src="https://th.bing.com/th/id/OIP.mJmOEsXOXtOBnXigyQmSSwHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="" /></td>
                        <td>Gig1</td>
                        <td>59.99</td>
                        <td>John Doe</td>
                        <td>
                            <img className="message" src="/img/message.png" alt="" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Orders