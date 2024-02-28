import React from "react"
import "./myGigs.scss"
import { Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"

const MyGigs = ()=>{

    const queryClient = useQueryClient()

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ['myGigs'],
        queryFn: ()=>newRequest.get(`/gigs?userId=${currentUser.id}`).then((res)=>res.data)
    })

    const mutation = useMutation({
        mutationFn: (id)=>{ return newRequest.delete(`/gig/${id}`) },
        onSuccess:()=>{ queryClient.invalidateQueries(['myGigs']) }
    })

    const handleDelete = async (id)=>{
        mutation.mutate(id)
    }

    return (
        <div className='myGigs' >
            {isLoading ? "Loading" : error ? "Something went wrong!" : (<div className="container">
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

                    {data.map(gig=>(<tr key={gig._id}>
                        <td><img className="img" src={gig.cover} alt="" /></td>
                        <td>{gig.title}</td>
                        <td>{gig.price}</td>
                        <td>{gig.sales}</td>
                        <td>
                            <img className="delete" src="/img/delete.png" onClick={()=>handleDelete(gig._id)} alt="" />
                        </td>
                    </tr>))}
                    
                </table>
            </div>)}
        </div>
    )
}

export default MyGigs