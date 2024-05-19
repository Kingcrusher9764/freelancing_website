import React, { useRef } from "react"
import "./gigs.scss"
import { useState } from "react"
import GigCard from "../../components/gigCard/GigCard"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

const Gigs = ()=>{
    const [sort, setSort] = useState("price")
    const [open, setOpen] = useState(false)
    const minRef = useRef()
    const maxRef = useRef()

    const {search} = useLocation()

    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ['gigs'],
        queryFn: ()=>newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res)=>res.data)
    })

    console.log(data)

    const reSort = (type)=>{
        setSort(type)
        setOpen(false)
    }

    useEffect(()=>{
        refetch()
    }, [sort]);

    const apply = () =>{
        refetch()
    }

    return (
        <div className="gigs">
            <div className="container">
                <span className="breadcrumbs">FreeLance - Graphics & Design - </span>
                <h1>AI Artist</h1>
                <p>
                    Explore the boundaries of art and technology with FreeLance's AI artists
                </p>
                <div className="menu">
                    <div className="left">
                        <span>Budget</span>
                        <input ref={minRef} type="number" placeholder="min" />
                        <input ref={maxRef} type="number" placeholder="max" />
                        <button onClick={apply}>Apply</button>
                    </div>
                    <div className="right">
                        <div className="sortBy">Sort By</div>
                        <div className="sortType">{sort==="price" ? "Best Selling" : "Newest"}</div>
                        <img src="./img/down.png" alt="" onClick={()=>setOpen(!open)} />
                        {open && (
                        <div className="rightMenu">
                            {sort==="price"?(
                            <span onClick={()=>reSort("createdAt")}>Newest</span>
                            ):(
                            <span onClick={()=>reSort("price")}>Best Selling</span>
                            )}
                        </div>)}
                    </div>
                </div>
                <div className="cards">
                    {isLoading ? "Loading" : error ? "Something went wrong!" : data.map(gig=>(
                        <GigCard key={gig._id} item={gig} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Gigs