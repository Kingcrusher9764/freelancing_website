import React from "react"
import "./gig.scss"
import { Slider } from "infinite-react-carousel"
// import Slide from "../../components/Slide/slide"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { useParams } from "react-router-dom"
import Reviews from "../../components/reviews/Reviews"

const Gig = ()=>{

    const {id} = useParams()

    const {isLoading, error, data} = useQuery({
        queryKey: ['gig'],
        queryFn: ()=>newRequest.get(`/gigs/single/${id}`).then((res)=>res.data) 
    })

    const {isLoading: isLoadingUser, error: errorUser, data: dataUser} = useQuery({
        queryKey: ['user'],
        queryFn: ()=>newRequest.get(`/users/${data.userId}`).then((res)=>res.data)
    })

    return (
        <div className="gig">
            {isLoading ? "Loading" : error ? "Something went wrong!" : (<div className="container">
                <div className="left">
                    <span className="breadCrumbs">FreeLance {">"} Graphics & Design {">"} </span>
                    <h1>{data?.title}</h1>
                    {isLoadingUser ? "Loading" : errorUser ? "Something went wrong!" : (<div className="user">
                        <img className="pp" src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                        <span>{dataUser.username}</span>
                        { !isNaN(data.totalStars / data.starNumber) && (<div className="stars">
                            {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i)=>(
                                <img src="/img/star.png" alt="" key={i} />
                            ))}
                            <span>{Math.round(data.totalStars / data.starNumber)}</span>
                        </div>)}
                    </div>)}

                    <Slider  className="slider" slidesToShow={1} arrowsScroll={1}>
                        {data.images.map(img=>(
                            <img key={img} src={img} alt="" />
                        ))}    
                    </Slider>

                    <h2>About The Gig</h2>
                    <p>
                    {data.desc}
                    </p>

                    {isLoadingUser ? "Loading" : errorUser ? "Something went wrong!" : (<div className="seller">
                        <h2>About the seller</h2>
                        <div className="user">
                            <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                            <div className="info">
                                <span>{dataUser.username}</span>
                                { !isNaN(data.totalStars / data.starNumber) && (<div className="stars">
                                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i)=>(
                                        <img src="/img/star.png" alt="" key={i} />
                                    ))}
                                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                                </div>)}
                                <button>Contact Me</button>
                            </div>
                        </div>

                        <div className="box">
                            <div className="items">
                                <div className="item">
                                    <span className="title">From</span>
                                    <span className="desc">{dataUser.country}</span>
                                </div>
                                <div className="item">
                                    <span className="title">Member Since</span>
                                    <span className="desc">Aug 2022</span>
                                </div>
                                <div className="item">
                                    <span className="title">Avg. response time</span>
                                    <span className="desc">4 hours</span>
                                </div>
                                <div className="item">
                                    <span className="title">Last delivery</span>
                                    <span className="desc">1 day</span>
                                </div>
                                <div className="item">
                                    <span className="title">Languages</span>
                                    <span className="desc">English</span>
                                </div>
                            </div>

                            <hr />

                            <p>
                            {dataUser.desc}
                            </p>
                        </div>

                    </div>)}
                
                <Reviews gigId={id} />
                    
                </div>
                <div className="right">
                    <div className="price">
                        <h3>{data.shortTitle}</h3>
                        <h2>$ {data.price} </h2>
                    </div>
                    <p>
                        {data.shortDesc}
                    </p>
                    <div className="details">
                        <div className="item">
                            <img src="/img/clock.png" alt="" />
                            <span>{data.deliveryTime} days Delivery</span>
                        </div>
                        <div className="item">
                            <img src="/img/recycle.png" alt="" />
                            <span>{data.revisionTime} Revisions</span>
                        </div>
                    </div>
                    <div className="features">
                        {data.features.map(feature=>(
                            <div className="item" key={feature}>
                                <img src="/img/greencheck.png" alt="" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <button>Continue</button>
                </div>
            </div>)}
        </div>
    )
}

export default Gig