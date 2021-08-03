import React, {useState} from 'react';
import './CreatePostPage.css';
import axios from 'axios';

const CreatePostPage = ({history}) => {
    if(!localStorage.getItem("pern_blog_auth")) history.push("/register");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [prime] = useState(Math.random() < 0.5);

    let createPost = async (title, description, photo) => {
        const user = JSON.parse(localStorage.getItem("pern_blog_auth"));
        const data = new FormData();
        const fileName = Date.now() + photo.name;
        data.append("name", fileName);
        data.append("file", photo);
        const newPost = {
            title,
            description,
            photo: fileName,
            user_id: user.id,
            category_id: prime ? 1 : 2
        };
        await axios.post("http://localhost:5000/api/upload", data);
        const res = await axios.post("http://localhost:5000/api/posts", newPost);
        res.data && history.push("/");
    };

    return (
        <div className="create-post-page">
            {
                photo ? 
                <img
                    src={URL.createObjectURL(photo)}
                    alt=""
                />
                :
                <img
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
            }
            <form className="create-form">
                <div className="create-form-group">
                    <label htmlFor="file-input">
                        <i className="create-icon fas fa-plus"></i>
                    </label>
                    <input id="file-input" type="file" style={{ display: "none" }} onChange={e => setPhoto(e.target.files[0])} />
                    <input
                        className="create-input"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="create-form-group">
                    <textarea
                        className="create-input create-text"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button disabled={!title || !description || !photo} onClick={() => createPost(title, description, photo)} className="create-submit" type="button">Publish</button>
            </form>
        </div>
    )
}

export default CreatePostPage;
