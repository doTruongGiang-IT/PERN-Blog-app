import React, {useState, useEffect} from 'react';
import './PostDetails.css';
import cafe from '../../assets/Cafe.jpg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = ({history}) => {
    let { id } = useParams();
    let user = null;
    if(localStorage.getItem("pern_blog_auth")) user = JSON.parse(localStorage.getItem("pern_blog_auth"));
    const [details, setDetails] = useState({});
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editMode, setEditMode] = useState(false);
    const image = "http://localhost:5000/images/";

    useEffect(() => {
        const getDetails = async() => {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
            setDetails(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
        };
        getDetails();
    }, [id]);

    useEffect(() => {
        const getAuthor = async() => {
            const res = await axios.get(`http://localhost:5000/api/user/${details.user_id}`);
            setAuthor(res.data);
        };
        getAuthor();
    }, [details.user_id]);

    let removePost = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
        res && history.push("/");
    };

    let updatePost = async (id, title, description) => {
        const res = await axios.put(`http://localhost:5000/api/posts/${details.id}`, {id, title, description});
        res.data && history.push("/");
    };

    return (
        <div className="post-details">
            {
                details.photo ? <img src={image + details.photo} alt="details" /> : <img src={cafe} alt="details" />
            }
            {
                editMode ?
                (
                    <div className="post-details-title">
                        <input
                            className="post-details-title-input"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus={true}
                        />  
                        <h1>
                            <i onClick={() => updatePost(details.id, title, description)} className="post-details-icon-edit far fa-share-square"></i>
                        </h1>
                    </div>
                ) :
                <h1 className="post-details-title">
                    {details.title}
                    {
                        author.username === user?.username && (
                        <div className="post-details-edit">
                            <i className="post-details-icon far fa-edit" onClick={() => setEditMode(true)}></i>
                            <i className="post-details-icon far fa-trash-alt" onClick={() => removePost(details.id)}></i>
                        </div>
                        )
                    }
                </h1>
            }
            <div className="post-details-info">
                <span>
                    Author:
                    <b className="post-details-author">
                    <Link className="link" to={`/?user=${author.username}`}>
                        {author.username}
                    </Link>
                    </b>
                </span>
                <span id="divider">|</span>
                <span>{new Date(details.created_on).toDateString()}</span>
            </div>
            {
                editMode ?  
                <textarea
                    className="post-details-desc-input"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                /> : <p className="post-details-desc">{details.description}</p>
            }
        </div>
    )
}

export default PostDetails;
