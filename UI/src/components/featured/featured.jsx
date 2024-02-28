import React from "react"
import "./featured.scss"

const Featured = ()=>{
    return (
        <div className="featured">
            <div className="container">
                <div className="left">
                    <h1>Choose the ideal freelance services for your company.</h1>
                    <div className="search">
                        <div className="searchInput">
                            <img src="./img/search.png" alt="" />
                            <input type="text" placeholder="Try 'building web app'" />
                        </div>
                        <button>Search</button>
                    </div>
                </div>
                <div className="right">
                    <img src="./img/man.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Featured