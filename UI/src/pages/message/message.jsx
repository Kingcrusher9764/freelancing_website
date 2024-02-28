import React from "react"
import "./message.scss"
import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"

const Message = ()=>{

    const {id} = useParams()

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const queryClient = useQueryClient()

    const {isLoading, error, data} = useQuery({
        queryKey: ['messages'],
        queryFn: ()=>newRequest.get(`/messages/${id}`).then((res)=>res.data) 
    })
    const mutation = useMutation({
        mutationFn: (message)=>{ return newRequest.post(`/messages`, message) },
        onSuccess:()=>{ queryClient.invalidateQueries(['messages']) }
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        mutation.mutate({
            conversationId: id,
            desc: e.target[0].value,
        })
        e.target[0].value = ""
    }

    return (
        <div className='message' >
            <div className="container">
                <span className="breadCrumbs">
                    <Link to="/messages" className="link" >Messages</Link> - John Doe - 
                </span>

                {isLoading ? "Loading" : error ? "Something went wrong" : (<div className="messages">
                    {data?.map(m=>(<div className={m.userId === currentUser._id ? "item owner" : "item" } key={m.id} >
                        <img src="https://th.bing.com/th/id/OIP.Ycsdifs9QdS_WpKtIzttgQHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7" alt="" />
                        <p>
                            {m.desc}
                        </p>
                    </div>))}
                </div>)}

                <hr />

                <form className="write" onSubmit={handleSubmit}>
                    <textarea name="" placeholder="write a message" id="" cols="30" rows="10"></textarea>
                    <button type="submit">Send</button>
                </form>

            </div>
        </div>
    )
}

export default Message