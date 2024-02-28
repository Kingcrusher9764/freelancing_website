import React from "react"
import "./login.scss"
import { useState } from "react"
import newRequest from "../../utils/newRequest"
import { useNavigate } from "react-router-dom"

const Login = ()=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await newRequest.post("/auth/login", {username, password})
            localStorage.setItem("currentUser", JSON.stringify(res.data))
            navigate("/")
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
        <div className='login' >
            <form onSubmit={handleSubmit} className="container">
                <h1>SIGN IN</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={e=>setUsername(e.target.value)} placeholder="Enter Username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={e=>setPassword(e.target.value)} placeholder="Enter the password" />
                <button>Login</button>
                {error && error}
            </form>
        </div>
    )
}

export default Login