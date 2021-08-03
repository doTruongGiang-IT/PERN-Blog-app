import React, {useState, useEffect} from 'react';
import './Post.css';
import { Link } from "react-router-dom";
import cafe from '../../assets/Cafe.jpg';
import axios from 'axios';

const Post = ({post}) => {
    const [category, setCategory] = useState("");
    const image = "http://localhost:5000/images/";

    useEffect(() => {
        const getCategory = async() => {
            const res = await axios.get(`http://localhost:5000/api/category/${post.category_id}`);
            setCategory(res.data);
        };
        getCategory();
    }, [post.category_id]);
    
    return (
        <div className="post">
            {
                post.photo ? <img src={image + post.photo} alt="post" /> : <img src={cafe} alt="post" />
            }
            <div className="post-info">
                <div className="post-cats">
                    <span className="post-cat">
                        <Link className="link" to="/posts?cat=Music">
                            {post.category_id === category.id && category.name}
                        </Link>
                    </span>
                </div>
                <span className="post-title">
                    <Link to={`/post/${post.id}`} className="link">
                        {post.title}
                    </Link>
                </span>
                <hr />
                <span className="post-date">{new Date(post.created_on).toDateString()}</span>
            </div>
            <p className="post-desc">{post.description}</p>
        </div>
    )
}

export default Post;
