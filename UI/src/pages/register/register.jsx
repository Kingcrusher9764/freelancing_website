import React from "react"
import "./register.scss"
import upload from "../../utils/upload"
import { useState } from "react"
import newRequest from "../../utils/newRequest"
import { useNavigate } from "react-router-dom"

const Register = ()=>{
    const [file, setFile] = useState(null)
    const [user,setUser] = useState({
        username: "",
        email: "",
        password: "",
        img: "",
        country: "",
        isSeller: false,
        desc: ""
    })    
    
    const handleChange=(e)=>{
        setUser((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    const handleSeller = (e)=>{
        setUser((prev)=>{
            return {...prev, isSeller: e.target.checked}
        })
    }
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const url = await upload(file)
        try{
            await newRequest.post("/auth/register", {
                ...user,
                img: url
            })
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='register' >
            <form onSubmit={handleSubmit} className="container">
                <div className="left">
                    <h1>Create new account</h1>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={handleChange} id="username" placeholder="Enter username" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange} id="email" placeholder="Enter email" required />
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={handleChange} id="password" placeholder="Enter password" />
                    <label htmlFor="pp">Profile picture</label>
                    <input type="file" name="pp" onChange={e=>setFile(e.target.files[0])} id="pp" />
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" onChange={handleChange} id="country" placeholder="Enter Country name" />
                    <button>Register</button>
                </div>

                <div className="right">
                    <h1>I want to become a seller</h1>
                    <span>
                    <input type="checkbox" name="isSeller" onChange={handleSeller} id="isSeller" />
                    <label htmlFor="isSeller"> Activate the seller account</label>
                    </span>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="number" name="phone" onChange={handleChange} id="phone" placeholder="Enter phone number" />
                    <label htmlFor="desc">Description</label>
                    <textarea cols={30} rows={15} name="desc" onChange={handleChange} id="desc" placeholder="A short description of yourself"></textarea>
                </div>
            </form>
        </div>
    )
}

export default Register