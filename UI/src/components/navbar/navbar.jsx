import React from "react"
import "./navbar.scss"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import newRequest from "../../utils/newRequest"

const Navbar = ()=>{
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

    const {pathname} = useLocation()

    const isActive = ()=>{
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(()=>{
        window.addEventListener("scroll", isActive)
        return ()=>{
            window.removeEventListener("scroll", isActive)
        }
    }, [])

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const navigate = useNavigate()
    const handleLogout = async ()=>{
        try{
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser", null)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    const handleJoin = ()=>{
        navigate("/register")
    }

    return (
        <div className={active || pathname!=="/"?"navbar active":"navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className="link">
                        <span className="text">
                            FreeLance
                        </span>
                    </Link>
                    <span className="dot">
                        .
                    </span>
                </div>
                <div className="links">
                    <span>Bussiness</span>
                    <span><a href="/gigs?search=">Explore</a></span>
                    {!currentUser?.isSeller && <span><a href="mailto:tilak.tycs2024@gmail.com">Complain</a></span>}
                    {!currentUser && <Link to="/login" className="link">Sign in</Link>}
                    {!currentUser && <button onClick={handleJoin}>Join</button>}
                    {currentUser && (
                        <div className="user" onClick={()=>setOpen(!open)}>
                            <img src={currentUser?.img || "/img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {currentUser?.isSeller &&
                                    (<>
                                    <Link to="/myGigs" className="link">Gigs</Link>
                                    <Link to="/add" className="link">Add New Gig</Link>
                                    </>)
                                }
                                <Link to="/orders" className="link">Orders</Link>
                                <Link to="/messages" className="link">Messages</Link>
                                <Link onClick={handleLogout} className="link">Logout</Link>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
            {(active || pathname!=="/") && (
                <>
                <hr />
                <div className="menu">
                    <Link to="/gigs?cat=design" className="link menuLink">Graphisc & Design</Link>
                    <Link to="/gigs?cat=animation" className="link">Video & Animation</Link>
                    <Link to="/gigs?cat=web" className="link">Web Development</Link>
                    <Link to="/gigs?cat=ai" className="link">AI Services</Link>
                    <Link to="/gigs?cat=media" className="link">Digital Marketing</Link>
                    <Link to="/gigs?cat=audio" className="link">Music & Audio</Link>
                    <Link to="/gigs?cat=video" className="link">Video Maker</Link>
                    <Link to="/gigs?cat=seo" className="link">Website Ranking</Link>
                </div>
                <hr />
                </>
            )}
        </div>
    );
}

export default Navbar