import React, { useReducer, useState } from "react"
import "./add.scss"
import INITIAL_STATE, { gigReducer } from "../../reducers/gigReducer"
import upload from "../../utils/upload"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import {useNavigate} from "react-router-dom"

const Add = ()=>{
    const [singleFile, setSingleFile] = useState(undefined)
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

    const handleChange = (e)=>{
        dispatch({
            type:"CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.value}
        })
    }
    const handleFeature = (e)=>{
        e.preventDefault()
        dispatch({
            type:"ADD_FEATURE",
            payload: e.target[0].value,
        })
        e.target[0].value = ""
    }
    const handleUpload = async ()=>{
        setUploading(true)
        try{
            const cover = await upload(singleFile)

            const images = await Promise.all(
                [...files].map(async file=>{
                    const url = await upload(file)
                    return url
                })
            )
            setUploading(false)
            dispatch({
                type: "ADD_IMAGES", 
                payload: {cover: cover, images: images},
            })
        }catch(err){
            console.log(err)
        }
    }

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (gig)=>{return newRequest.post("/gigs", gig )},
        onSuccess:()=>{ queryClient.invalidateQueries(['myGigs']) }
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        mutation.mutate(state)
        navigate("/myGigs")
    }

    console.log(state)

    return (
        <div className='add' >
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="">Title</label>
                        <input name="title" onChange={handleChange} type="text" placeholder="e.g. I will do something I'm really good at" required />
                        <label htmlFor="">Category</label>
                        <select name="cat" id="cat" onChange={handleChange}>
                            <option value="ai">AI Artists</option>
                            <option value="design">Design</option>
                            <option value="web">Web Development</option>
                            <option value="audio">Voice over</option>
                            <option value="video">Video Explainer</option>
                            <option value="media">Social Media</option>
                            <option value="seo">SEO</option>
                            <option value="animation">Animation</option>
                        </select>
                        <div className="images">
                            <div className="imagesInput">
                                <label htmlFor="">Cover Image</label>
                                <input type="file" onChange={e=>setSingleFile(e.target.files[0])} />
                                <label htmlFor="">Upload Images</label>
                                <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
                            </div>
                            <button onClick={handleUpload}>{uploading ? "uploading" : "Upload" }</button>
                        </div>
                        <label htmlFor="">Description</label>
                        <textarea onChange={handleChange} name="desc" id="" required placeholder="Brief descriptions to introduce your service to customers" cols="30" rows="16"></textarea>
                        <button onClick={handleSubmit}>Create</button>
                    </div>

                    <div className="right">
                        <label htmlFor="">Service Title</label>
                        <input onChange={handleChange} required name="shortTitle" type="text" placeholder="e.g. One-page web design" />
                        <label htmlFor="">Short Description</label>
                        <textarea name="shortDesc" required onChange={handleChange} id="" cols="30" rows="10" placeholder="Short description of your service"></textarea>
                        <label htmlFor="">Delivery Time(e.g. 3 days)</label>
                        <input onChange={handleChange} required name="deliveryTime" type="number" min={1} />
                        <label htmlFor="">Revision Number</label>
                        <input name="revisionTime" required onChange={handleChange} type="number" min={1} />
                        <label htmlFor="">Add Features</label>
                            <form className="add" action="" onSubmit={handleFeature}>
                                <input type="text" placeholder="e.g. page design0"/>
                                <button type="submit">add</button>
                            </form>
                            <div className="addedFeatures">
                                {state?.features?.map(f=>(
                                    <div className="item" key={f} >
                                    <button onClick={()=>dispatch({type:"REMOVE_FEATURE", payload:f })} >
                                        {f}
                                        <span>X</span>
                                    </button>
                                </div>
                                ))}
                            </div>
                        <label htmlFor="">Price</label>
                        <input onChange={handleChange} required name="price" type="number" min={1}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add