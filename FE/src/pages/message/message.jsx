import React from "react"
import "./message.scss"
import { Link } from "react-router-dom"

const Message = ()=>{
    return (
        <div className='message' >
            <div className="container">
                <span className="breadCrumbs">
                    <Link to="/messages" className="link" >Messages</Link> - John Doe - 
                </span>

                <div className="messages">
                    <div className="item">
                        <img src="https://th.bing.com/th/id/OIP.Ycsdifs9QdS_WpKtIzttgQHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius pariatur itaque necessitatibus sint, quasi at in, aut excepturi adipisci natus voluptatibus quisquam mollitia tenetur quibusdam. Modi perspiciatis necessitatibus cupiditate deleniti, dolorem quod doloremque libero voluptas qui corrupti fuga eum provident obcaecati iusto veniam ipsa voluptate.

                        </p>
                    </div>
                    <div className="item owner">
                        <img src="https://th.bing.com/th/id/OIP.Ycsdifs9QdS_WpKtIzttgQHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius pariatur itaque necessitatibus sint, quasi at in, aut excepturi adipisci natus voluptatibus quisquam mollitia tenetur quibusdam. Modi perspiciatis necessitatibus cupiditate deleniti, dolorem quod doloremque libero voluptas qui corrupti fuga eum provident obcaecati iusto veniam ipsa voluptate.

                        </p>
                    </div>
                    <div className="item">
                        <img src="https://th.bing.com/th/id/OIP.Ycsdifs9QdS_WpKtIzttgQHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius pariatur itaque necessitatibus sint, quasi at in, aut excepturi adipisci natus voluptatibus quisquam mollitia tenetur quibusdam. Modi perspiciatis necessitatibus cupiditate deleniti, dolorem quod doloremque libero voluptas qui corrupti fuga eum provident obcaecati iusto veniam ipsa voluptate.

                        </p>
                    </div>
                    <div className="item owner">
                        <img src="https://th.bing.com/th/id/OIP.Ycsdifs9QdS_WpKtIzttgQHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius pariatur itaque necessitatibus sint, quasi at in, aut excepturi adipisci natus voluptatibus quisquam mollitia tenetur quibusdam. Modi perspiciatis necessitatibus cupiditate deleniti, dolorem quod doloremque libero voluptas qui corrupti fuga eum provident obcaecati iusto veniam ipsa voluptate.

                        </p>
                    </div>
                </div>

                <hr />

                <div className="write">
                    <textarea name="" placeholder="write a message" id="" cols="30" rows="10"></textarea>
                    <button>Send</button>
                </div>

            </div>
        </div>
    )
}

export default Message