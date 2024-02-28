import React from "react"
import "./myGigs.scss"
import { Link } from "react-router-dom"

const MyGigs = ()=>{
    return (
        <div className='myGigs' >
            <div className="container">
                <div className="title">
                    <h1>Gigs</h1>
                    <Link to="/add"><button>Add New Gig</button></Link>
                </div>

                <table>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Sales</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td><img className="img" src="https://th.bing.com/th/id/OIP.mJmOEsXOXtOBnXigyQmSSwHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="" /></td>
                        <td>Gig1</td>
                        <td>59.99</td>
                        <td>121</td>
                        <td>
                            <img className="delete" src="/img/delete.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td><img className="img" src="https://th.bing.com/th/id/OIP.mJmOEsXOXtOBnXigyQmSSwHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="" /></td>
                        <td>Gig1</td>
                        <td>59.99</td>
                        <td>121</td>
                        <td>
                            <img className="delete" src="/img/delete.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td><img className="img" src="https://th.bing.com/th/id/OIP.mJmOEsXOXtOBnXigyQmSSwHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="" /></td>
                        <td>Gig1</td>
                        <td>59.99</td>
                        <td>121</td>
                        <td>
                            <img className="delete" src="/img/delete.png" alt="" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default MyGigs