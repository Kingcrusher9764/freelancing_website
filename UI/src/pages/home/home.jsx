import React from "react"
import "./home.scss"
import Featured from "../../components/featured/featured"
import Slide from "../../components/Slide/slide"
import CatCard from "../../components/CatCard/CatCard"
import {cards, projects} from "../../data"

const Home = ()=>{
    return (
        <div className='home' >
            <Featured />
            <Slide slidesToShow={4} arrowsScroll={3}>
                {cards.map(card=>(
                    <CatCard item={card} key={card.id} />
                ))}
            </Slide>
            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>Access to an endless pool of independent talent</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The greatest for all price ranges
                        </div>
                        <p>
                            Find high-quality services at every price point.
                        </p>
                        
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The greatest for all price ranges
                        </div>
                        <p>
                            Find high-quality services at every price point.
                        </p>
                        
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The greatest for all price ranges
                        </div>
                        <p>
                            Find high-quality services at every price point.
                        </p>
                    </div>
                    <div className="item">
                        <video src="./video/video.mp4" autoPlay controls loop={-1} ></video>
                    </div>
                </div>
            </div>
            <div className="features dark">
                <div className="container">
                    <div className="item">
                        <h1>Freelance Business</h1>
                        <h1>A business solution designed for you</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            For any job, get access to top freelancers and expert business tools.
                        </div>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Create your own branded marketplace for qualified professionals.
                        </div>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Manage your independent contractors and hire more staff with a comprehensive SaaS solution.
                        </div>
                        <a href="http://localhost:5173/gigs?search="><button>Explore Gigs</button></a>
                    </div>
                    <div className="item">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png" alt="" />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home